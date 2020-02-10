import React from 'react'
import '../Styles/Navbar.css'
import {Button} from 'primereact/button'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

const Navbar = props => {

	const logoutHandler = () => {
		props.logout()
		props.history.push('/login')
	}

	const disabledLoginButton = <Button disabled label='Login' className='p-button-secondary'/>
	const logoButton = <span onClick={() => props.history.push('/')}>Wmii app panel</span>
	const logoutButton = <Button onClick={logoutHandler} label='Log out' className='p-button-secondary'/>
	const loginButton = <Button onClick={() => props.history.push('/login')} label='Log in' />

	let authButton = loginButton
	if (!props.loggedIn && props.history.location.pathname === '/login')
		authButton = disabledLoginButton
	else if (props.loggedIn)
		authButton = logoutButton

	return (
		<React.Fragment>
			<div className='navbar'>
				<div className='navbar-left'>
					<div className='navbar-logo'>{logoButton}</div>
				</div>
				<div className='navbar-right'>
					<div className='navbar-buttons'>
						{authButton}
					</div>
				</div>
			</div>
			<div style={{width: '100%', height: '50px'}}></div>
		</React.Fragment>

	)
}

Navbar.propTypes = {
	loggedIn: PropTypes.bool,
	logout: PropTypes.func
}

export default withRouter(Navbar)