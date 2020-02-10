import React, {useState} from 'react'
import './Styles/App.css'
import {Switch, Route} from 'react-router'
import routesData from './Data/Routes'

import Navbar from './Components/Navbar'
import Menu from './Components/Menu'
import Login from './Views/Login'
import Api from './Api'

const App = () => {

  const checkifLoggedIn = () => {
    return !!localStorage.getItem('token')
  }

  const [loggedIn, setLoggedIn] = useState(checkifLoggedIn)

  const logout = () => {
    setLoggedIn(false)
    Api.logout()
  }


  const routes = routesData.map(route => (
    <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
  ))

  const loggedInLayout = (
    <React.Fragment>
      <Menu logout={logout} />
      <div className='view-container'>
        <Switch>{routes}</Switch>
      </div>
    </React.Fragment>
  )
  
  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} logout={logout}/>
      {loggedIn ? loggedInLayout : <Login setLoggedIn={setLoggedIn}/>}
    </div>
  )
}

export default App