import Domains from './domains'

/* eslint-disable class-methods-use-this */
class Services {
  checkStudents(email, date, grade, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlStudents()}/validate_user_academic/`, {
        method: 'POST',
        body: JSON.stringify({
          correo: email,
          date_birth: date,
          degree: grade,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  checkCodeStudents(hash, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlStudents()}/activate_promotion/`, {
        method: 'POST',
        body: JSON.stringify({
          hash_user: hash,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }
}

export default new Services()
