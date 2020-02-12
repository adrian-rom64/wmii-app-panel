import React, { useState, useEffect } from 'react'
import '../Styles/Login.css'
import {InputText} from 'primereact/inputtext'
import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import {withRouter} from 'react-router'
import Api from '../Api'

const Login = props => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    props.history.push('/login')
  }, []) // eslint-disable-line

  const loginHandler = async () => {
    const result = await Api.login(username, password)
    props.setLoggedIn(result)
    props.history.push('/ads')
  }

  const keyHandler = event => {
    if (event.key === 'Enter') loginHandler()
  }

  return ( 
    <div className='login'>
      <div className='login-box'>
        <Card onKeyPress={keyHandler}>
          <InputText 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={keyHandler}
          />
          <InputText 
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={keyHandler}
          />
          <Button label='Log in' onClick={loginHandler}/>
        </Card>
      </div>
    </div>
   )
}
 
export default withRouter(Login)