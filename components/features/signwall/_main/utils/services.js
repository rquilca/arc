/* eslint-disable class-methods-use-this */
import getDevice from './get-device'
import Domains from './domains'

export default class Services {
  reloginEcoID(username, password, action, site, window) {
    const details = {
      email: username, // -> email
      password, // -> pass
      method: 'formulario',
      device: getDevice(window), // -> desktop mobile tablet
      domain: window.location.hostname, // -> elcomercio.pe
      referer: window.location.href, // -> url actual
      action,
      site,
    }

    let formBody = []
    // eslint-disable-next-line no-restricted-syntax
    for (const property in details) {
      if (Object.prototype.hasOwnProperty.call(details, property)) {
        const encodedKey = encodeURIComponent(property)
        const encodedValue = encodeURIComponent(details[property])
        formBody.push(`${encodedKey}=${encodedValue}`)
      }
    }
    formBody = formBody.join('&')
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlECOID()}/api/v2/verify_credentials`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  loginFBeco(URL, username, accessToken, type) {
    const response = new Promise(resolve => {
      fetch(`${URL}/identity/public/v1/auth/token`, {
        method: 'POST',
        body: JSON.stringify({
          userName: username,
          credentials: accessToken,
          grantType: type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  getUbigeo(item) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getUrlECOID()}/get_ubigeo/${item}?v=${new Date().getTime()}`
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getEntitlement(jwt, site) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getOriginAPI(site)}/sales/public/v1/entitlements`, {
        method: 'GET',
        headers: {
          Authorization: jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  getIpEco() {
    const response = new Promise(resolve => {
      fetch(`https://geoapi.eclabs.io/location`, {
        method: 'GET',
      }).then(res => resolve(res.json()))
    })
    return response
  }
}
