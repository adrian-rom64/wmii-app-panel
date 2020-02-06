import React from 'react'
import '../Styles/Navbar.css'
import {Button} from 'primereact/button'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

const Navbar = props => {

	const logoButton = <span onClick={() => props.history.push('/')}>{global.tr('app-name')}</span>
	const logoutButton = <Button onClick={() => props.history.push('/logout')} label={global.tr('logout')} className='p-button-secondary'/>
	const loginButton = <Button onClick={() => props.history.push('/login')} label={global.tr('login')} />

	return (
		<React.Fragment>
			<div className='navbar'>
				<div className='navbar-left'>
					<div className='navbar-logo'>{logoButton}</div>
				</div>
				<div className='navbar-right'>
					<div className='navbar-buttons'>
						{props.loggedIn ? logoutButton : loginButton}
					</div>
				</div>
			</div>
			<div style={{width: '100%', height: '50px'}}></div>
		</React.Fragment>

	)
}

Navbar.propTypes = {
	loggedIn: PropTypes.bool
}

export default withRouter(Navbar)