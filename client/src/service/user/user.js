import axios from 'axios'

export class UserService {

  getAllUsers(url) {
    const headers = { "Content-Type": "application/json" };
    let data = axios.get(url, { headers }).then((response) => {
      return response
    }).catch((error) => {
      throw error
    })
    return data
  }

  subscribeNewsletter(url, id) {
    const headers = { "Content-Type": "application/json" };
    let data = axios.put(url + "/" + id, { headers }).then((response) => {
      return response
    }).catch((error) => {
      throw error
    })
    return data
  }

  bulkMail(url) {
    const headers = { "Content-Type": "application/json" };
    let data = axios.post(url, { headers }).then((response) => {
      return response
    }).catch((error) => {
      throw error
    })
    return data
  }
}