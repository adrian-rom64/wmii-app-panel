import Axios from 'axios'

class Api {
  constructor () {

    // const apiUrl = 'https://wmii-app-backend.herokuapp.com/'
    const apiUrl = 'http://localhost:3000'
    this.token = null

    this.axios = Axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      }
    })

    this.request = async (method, url, payload) => {
      let response = null
			const setResponse = _response => {response = _response}
			try {
				await this.axios[method](url, payload).then(res => {
					setResponse(res)
				}).catch(err => {
					setResponse({status: err.response.status, data: null})
				})
				return {code: response.status, data: response.data}
			}
			catch {
				console.error('Error while connecting to server')
				return {code: 0, data: null}
			}
    }

    const availableMethods = ['get', 'post', 'delete', 'patch']
    availableMethods.forEach(method => {
      this[method] = async (url, payload) => this.request(method, url, payload)
    })

    this.login = async (email, password) => {
      const data = {
        email: email,
        password: password
      }
      const res = await this.post('/login', data)
      console.log(res.code)
      if (res.code !== 200) return false
      else {
        localStorage.setItem('token', res.data.token)
        this.token = res.data.token
        return true
      }
    }

    this.logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userToken')
    }
  }
}

export default (() =>  {
  let instance = null
  const createInstance = () => {
    return new Api()
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()


