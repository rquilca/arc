// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(
//       window.navigator.userAgent
//     )
//     const buttonTop = document.getElementById('btn-arrow-top')
//     const buttonCall = document.getElementById('btn-help-call')
//     const btnSignwall = document.getElementById('btn-signwall')
//     const allinput = document.querySelectorAll('.tab')
//     const allPictures = document.querySelectorAll('.picture')
//     const divBeneficios = document.getElementById('beneficios')
//     const videoPlayer = document.getElementById('video')

//     const checkSession = () => {
//       if (typeof window !== 'undefined') {
//         const profileStorage =
//           window.localStorage.getItem('ArcId.USER_PROFILE') ||
//           window.sessionStorage.getItem('ArcId.USER_PROFILE')

//         const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
//         if (profileStorage) {
//           return !(profileStorage === 'null' || sesionStorage === '{}') || false
//         }
//       }
//       return false
//     }

//     const cleanUserName = (firstName, lastName) => {
//       let fullName = 'Bienvenido Usuario'
//       const badName = /undefined|null/
//       if (
//         firstName &&
//         !firstName.match(badName) &&
//         lastName &&
//         !lastName.match(badName)
//       ) {
//         fullName = `${firstName} ${lastName}`
//       }
//       if (
//         firstName &&
//         !firstName.match(badName) &&
//         (!lastName || lastName.match(badName))
//       ) {
//         fullName = firstName
//       }
//       if (
//         lastName &&
//         !lastName.match(badName) &&
//         (!firstName || firstName.match(badName))
//       ) {
//         fullName = lastName
//       }
//       return fullName.length <= 20 ? fullName : `${fullName.slice(0, 17)}...`
//     }

//     function updateBtnSignwall() {
//       if (checkSession()) {
//         const userInfo =
//           window.JSON.parse(
//             window.localStorage.getItem('ArcId.USER_PROFILE')
//           ) || {}

//         const { firstName, lastName } = userInfo || {}
//         btnSignwall.innerHTML = cleanUserName(firstName, lastName)
//       }
//     }

//     function activeButtonScroll() {
//       const scrollCurrent =
//         document.body.scrollTop || document.documentElement.scrollTop

//       if (scrollCurrent > 150) {
//         if (buttonTop) buttonTop.classList.add('active')
//         if (buttonCall) buttonCall.classList.add('active')
//         if (buttonCall && buttonCall.classList.contains('ges')) {
//           buttonCall.classList.remove('ges')
//         }
//       } else {
//         if (buttonTop) buttonTop.classList.remove('active')
//         if (buttonCall) buttonCall.classList.remove('active')
//         if (buttonCall && window.location.href.match(/gestion/)) {
//           buttonCall.classList.add('ges')
//         }
//       }
//     }

//     function activeHeader() {
//       const minScroll = isMobile ? 10 : 60
//       const scrollDevice =
//         document.body.scrollTop || document.documentElement.scrollTop
//       if (scrollDevice > minScroll) {
//         document.getElementById('header').classList.add('active')
//       } else {
//         document.getElementById('header').classList.remove('active')
//       }
//     }

//     function callback(entries, observer) {
//       if (entries[0].isIntersecting) {
//         for (let i = 0; i < allinput.length; i++) {
//           const tabCurrent = allinput[i].getAttribute('id')
//           if (allinput[i].checked) {
//             document
//               .getElementById(`picture--${tabCurrent}`)
//               .classList.add('move')
//           }
//         }
//       } else {
//         for (let j = 0; j < allinput.length; j++) {
//           const tabCurrent = allinput[j].getAttribute('id')
//           if (allinput[j].checked) {
//             document
//               .getElementById(`picture--${tabCurrent}`)
//               .classList.remove('move')
//           }
//         }
//       }
//     }

//     function callbackVideo(entries, observerVideo) {
//       if (entries[0].isIntersecting) {
//         videoPlayer.play()
//       } else {
//         videoPlayer.pause()
//       }
//     }

//     window.onscroll = () => {
//       activeHeader()
//       activeButtonScroll()
//     }

//     window.onload = () => {
//       updateBtnSignwall()

//       if (buttonTop) {
//         buttonTop.addEventListener('click', () => {
//           document.body.scrollTop = 0 // For Safari
//           document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
//         })
//       }

//       if (videoPlayer) {
//         const optionsVideo = {
//           rootMargin: '0px 0px 0px 0px',
//           threshold: 0.5,
//         }
//         const observerVideo = new window.IntersectionObserver(
//           callbackVideo,
//           optionsVideo
//         )
//         observerVideo.observe(videoPlayer)
//       }

//       if (divBeneficios) {
//         const options = {
//           rootMargin: '0px 0px 0px 0px',
//           threshold: 0.5,
//         }
//         const observer = new window.IntersectionObserver(callback, options)
//         observer.observe(divBeneficios)
//       }

//       for (let i = 0; i < allinput.length; i++) {
//         allinput[i].addEventListener('change', e => {
//           const tabCurrent = e.target.getAttribute('id')
//           for (let j = 0; j < allPictures.length; j++) {
//             allPictures[j].classList.remove('move')
//           }
//           document
//             .getElementById(`picture--${tabCurrent}`)
//             .classList.add('move')
//         })
//       }
//     }
//   }, 0)
// })

const scriptsLanding =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e=/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),t=document.getElementById("btn-arrow-top"),n=document.getElementById("btn-help-call"),s=document.getElementById("btn-signwall"),i=document.querySelectorAll(".tab"),o=document.querySelectorAll(".picture"),c=document.getElementById("beneficios"),d=document.getElementById("video");function r(){var e,t,n,o,c,d,i;!function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"),t=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===t)||!1}return!1}()||(t=(e=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}||{}).firstName,n=e.lastName,s.innerHTML=(c=n,d="Bienvenido Usuario",i=/undefined|null/,(o=t)&&!o.match(i)&&c&&!c.match(i)&&(d="".concat(o," ").concat(c)),!o||o.match(i)||c&&!c.match(i)||(d=o),!c||c.match(i)||o&&!o.match(i)||(d=c),d.length<=20?d:"".concat(d.slice(0,17),"...")))}function a(e,t){if(e[0].isIntersecting)for(var n=0;n<i.length;n++){var o=i[n].getAttribute("id");i[n].checked&&document.getElementById("picture--".concat(o)).classList.add("move")}else for(var c=0;c<i.length;c++){var d=i[c].getAttribute("id");i[c].checked&&document.getElementById("picture--".concat(d)).classList.remove("move")}}function l(e,t){e[0].isIntersecting?d.play():d.pause()}window.onscroll=function(){(e?10:60)<(document.body.scrollTop||document.documentElement.scrollTop)?document.getElementById("header").classList.add("active"):document.getElementById("header").classList.remove("active"),150<(document.body.scrollTop||document.documentElement.scrollTop)?(t&&t.classList.add("active"),n&&n.classList.add("active"),n&&n.classList.contains("ges")&&n.classList.remove("ges")):(t&&t.classList.remove("active"),n&&n.classList.remove("active"),n&&window.location.href.match(/gestion/)&&n.classList.add("ges"))},window.onload=function(){r(),t&&t.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),d&&new window.IntersectionObserver(l,{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(d),c&&new window.IntersectionObserver(a,{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(c);for(var e=0;e<i.length;e++)i[e].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),n=0;n<o.length;n++)o[n].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})}},0)});'
export default scriptsLanding
