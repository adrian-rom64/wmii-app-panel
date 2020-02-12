import Axios from 'axios'
import Swal from 'sweetalert2'

// const apiUrl = 'https://wmii-app-backend.herokuapp.com/'
const apiUrl = 'http://localhost:3000'

export default class Api {

  static axios = () => {
    return Axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      }
    })
  }

  static request = async (method, url, payload) => {
    let response = null
    const setResponse = _response => {response = _response}
    try {
      await Api.axios()[method](url, payload).then(res => {
        if (res.status === 401) Api.unauthorizedHandler()
        setResponse(res)
      }).catch(err => {
        setResponse({status: err.response.status, data: null})
      })
      return {code: response.status, data: response.data}
    }
    catch {
      Api.noConnectionHandler()
      return {code: 0, data: null}
    }
  }

  static unauthorizedHandler = () => {
    console.error('Not authorized')
    Swal.fire({
      title: 'Brak dostępu',
      icon: 'error'
    })
    localStorage.removeItem('token')
    window.location.reload()
  }

  static noConnectionHandler = () => {
    console.error('Error while connecting to server')
    Swal.fire({
      title: 'Błąd połączenia z serwerem',
      icon: 'error'
    })
  }

  static get = async (url, payload) => this.request('get', url, payload)
  static post = async (url, payload) => this.request('post', url, payload)
  static delete = async (url, payload) => this.request('delete', url, payload)
  static patch = async (url, payload) => this.request('patch', url, payload)

  static login = async (email, password) => {
    const data = {
      email: email,
      password: password
    }
    const res = await Api.post('/login', data)
    console.log(res.code)
    if (res.code !== 200) return false
    else {
      localStorage.setItem('token', res.data.token)
      return true
    }
  }

  static logout = () => {
    localStorage.removeItem('token')
  }

}