'use strict'

function LinkInput(props) {
	return (
		<div className='shortenBox'>
			<input
				className={
					props.isActive ? 'shortenBox__input shortenBox__input' : 'shortenBox__input shortenBox__input--noLink'
				}
				type='text'
				placeholder='Shorten a link here...'
				value={props.inputValue}
				onChange={props.onChangeValue}
			/>
			<p className={props.isActive ? 'shortenBox__LinkText' : 'shortenBox__LinkText shortenBox__noLinkText'}>
				Please add a link...
			</p>
			<button className='shortenBox__btn btn' onClick={props.onChangeClick}>
				Shorten It!
			</button>
		</div>
	)
}

function LinkShortened(props) {
	return (
		<div className='shortenedLink'>
			<p className='shortenedLink__before'>{props.linkFull}</p>
			<a href={props.linkShort} className='shortenedLink__after'>
				{props.linkShort}
			</a>
			<button className='shortenedLink__btn shortenedLink__btn--copied btn '>Copy</button>
		</div>
	)
}

class LinkShortenedBoxes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: this.props.linkShotringBtn,
		}
	}

	render() {
		let list = []
		if (localStorage.getItem('longLink1') && localStorage.getItem('shortLink1')) {
			let i = 1
			do {
				list = list.concat([[localStorage.getItem('longLink' + i), localStorage.getItem('shortLink' + i)]])
				i++
			} while (localStorage.getItem('longLink' + i) && localStorage.getItem('shortLink' + i))

			let listReverse = list.reverse()
			let key = -1
			const Links = listReverse.map(i => {
				let linkFull = i[0]
				let linkShort = i[1]
				key++
				return <LinkShortened key={key + ' ' + i[1]} linkFull={linkFull} linkShort={linkShort} />
			})
			if (this.state.inputValue) {
				console.log('dodano link')
				this.setState({ inputValue: false })

				return Links
			} else {
				return Links
			}
		}
	}
}

class LinkShortenedApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value: '', isActive: true, numberLinkLocal: 1 }
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	handleClick(i) {
		if (this.state.value == '') {
			this.setState({ isActive: false })
		} else {
			if (localStorage.getItem('longLink1') && localStorage.getItem('shortLink1')) {
				let linksNumber = 1
				do {
					linksNumber++
				} while (localStorage.getItem('longLink' + linksNumber) && localStorage.getItem('shortLink' + linksNumber))
				console.log(linksNumber)
				this.setState({ numberLinkLocal: linksNumber })
			}
			let link
			const API_URL = 'https://api.shrtco.de/v2/shorten?url=' + this.state.value
			fetch(API_URL)
				.then(res => res.json())
				.then(shortLinkRes => {
					if (shortLinkRes.ok) {
						link = shortLinkRes.result.full_short_link3
						localStorage.setItem('shortLink' + this.state.numberLinkLocal, link)
						localStorage.setItem('longLink' + this.state.numberLinkLocal, this.state.value)
						this.setState({ isActive: true })
					} else {
						return this.setState({ isActive: false })
					}
				})
		}
	}

	render() {
		return (
			<div>
				<LinkInput
					isActive={this.state.isActive}
					inputValue={this.state.value}
					onChangeValue={this.handleChange}
					onChangeClick={i => this.handleClick(i)}
				/>

				<LinkShortenedBoxes linkShotringBtn={this.state.linkShotringBtn} />
				
			</div>
		)
	}
}

const linkAppContainer = ReactDOM.createRoot(document.getElementById('linkAppContainer'))
linkAppContainer.render(<LinkShortenedApp />)
