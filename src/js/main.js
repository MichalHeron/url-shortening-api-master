const burgerBtn = document.querySelector('.hamburger')
const navMobile = document.querySelector('.nav-elementsMobile')
const humanWorkingPic = document.querySelector('.picHumanWorkingBox')
const navAndImgBox = document.querySelector('.navAndImgBox')
const returnBtn = document.querySelector('.return')

const burgerClickHandle = () => {
	burgerBtn.classList.toggle('is-active')
	navMobile.classList.toggle('nav-elementsMobile--Active')
	humanWorkingPic.classList.toggle('picHumanWorkingBox--Active')
	navAndImgBox.classList.toggle('navAndImgBox--active')
	if (navMobile.classList.contains('nav-elementsMobile--Active')) {
		navAndImgBox.style = 'height: 31.4rem'
	} else {
		navAndImgBox.style = 'height: 100%'
	}
}

burgerBtn.addEventListener('click', burgerClickHandle)

console.log(window.scrollY)
returnBtn.addEventListener('click', () => {
	window.scrollTo(0, 0)
})

window.addEventListener('scroll', () => {
	if (window.scrollY > 100) returnBtn.classList.remove('returnDispNon')
	else returnBtn.classList.add('returnDispNon')
})

window.addEventListener('resize', () => {
	console.log(window.innerWidth)
	if (window.innerWidth > 768) {
		burgerBtn.classList.remove('is-active')
		navMobile.classList.remove('nav-elementsMobile--Active')
		humanWorkingPic.classList.add('picHumanWorkingBox--Active')
		navAndImgBox.classList.remove('navAndImgBox--active')
		navAndImgBox.style = 'height: 100%'
	}
})
