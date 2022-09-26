import axios from 'axios'

export class LoginService {

  userSignup(url, payload) {
    const headers = { "Content-Type": "application/json" };
    let data = axios.post(url, payload, { headers }).then((response) => {
      return response
    }).catch((error) => {
      throw error
    })
    return data
  }

  userSignin(url, payload) {
    const headers = { "Content-Type": "application/json" };
    let data = axios.post(url, payload, { headers }).then((response) => {
      return response
    }).catch((error) => {
      throw error
    })
    return data
  }
}