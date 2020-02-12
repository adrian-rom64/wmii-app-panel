import Axios from 'axios'
import Swal from 'sweetalert2'
import setLoading from './Components/Spinner'

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

  static makeRequest = async (method, url, payload) => {
    setLoading(true)
    let response = null
    const setResponse = _response => {response = _response}
    try {
      await Api.axios()[method](url, payload).then(res => {
        setResponse(res)
      }).catch(err => {
        setResponse({status: err.response.status, data: null})
      })
      setLoading(false)
      return {code: response.status, data: response.data}
    }
    catch {
      setLoading(false)
      return {code: 0, data: null}
    }
  }

  static request = async (method, url, payload) => {
    const res = await Api.makeRequest(method, url, payload)
    if (res.code === 401) {
      Api.unauthorizedHandler()
      return false
    }
    if (res.code === 0) {
      Api.noConnectionHandler()
      return false
    }
    return res
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
    if (!res) return false
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