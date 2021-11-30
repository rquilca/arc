/*
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', uuid = '' } = localProfile || {}
    const registerBtn = document.getElementById('btn-register-id')
    const anonymusSuscribe = document.getElementById('<<anonymusId>>')
    const registerSuscribe = document.getElementById('<<registerId>>')
    const welcomeMsgSuscribe = document.getElementById('<<welcomeMsgId>>')
    if (uuid) {
      anonymusSuscribe.classList.remove('block')
      anonymusSuscribe.classList.add('hidden')
      registerSuscribe.classList.remove('hidden')
      registerSuscribe.classList.add('block')

      if (!firstName) {
        welcomeMsgSuscribe.innerHTML = '¡Hola!'
      } else {
        welcomeMsgSuscribe.innerHTML = `¡Hola ${firstName}! `
      }
    } else {
      registerBtn?.addEventListener('click', () => {
        window.location.href = '/signwall/?outputType=subscriptions&banner=1'
      })
    }
  })
})
*/

export const handleUserStatus = (
  contAnonymus: string,
  contRegister: string,
  welcomeMsg: string
): string =>
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},t=e.firstName,n=void 0===t?"":t,d=e.uuid,o=void 0===d?"":d,i=document.getElementById("btn-register-id"),t=document.getElementById("<<anonymusId>>"),e=document.getElementById("<<registerId>>"),d=document.getElementById("<<welcomeMsgId>>");o?(t.classList.remove("block"),t.classList.add("hidden"),e.classList.remove("hidden"),e.classList.add("block"),d.innerHTML=n?"¡Hola ".concat(n,"! "):"¡Hola!"):null!=i&&i.addEventListener("click",function(){window.location.href="/signwall/?outputType=subscriptions&banner=1"})})});`
    .replace('<<anonymusId>>', contAnonymus)
    .replace('<<registerId>>', contRegister)
    .replace('<<welcomeMsgId>>', welcomeMsg)
