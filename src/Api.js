import Axios from 'axios'

class Api {
  constructor () {

    this.apiUrl = 'https://parkcash.itelab.pl/v1'
    this.token = null

    this.axios = Axios.create({
      baseURL: this.apiUurl,
      timeout: 10000,
      headers: {Authorization: `Bearer ${this.token}`, 'Content-type': 'application/json'}
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
      const baseURL = this.apiUrl
      const data = {
        email: email,
        password: password
      }
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      const res = await fetch(baseURL + '/sessions', settings)
      console.log(res)
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


