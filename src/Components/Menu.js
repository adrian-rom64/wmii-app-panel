import React from 'react'
import {withRouter} from 'react-router'
import '../Styles/Menu.css'
import {Menu} from 'primereact/menu'

const SideMenu = props => {

  const goto = path => props.history.push(path)
  const path = props.location.pathname

  const items = [
    {
      label: 'Assets',
      items: [
        {label: 'Index', command: () => goto('/ads'), disabled: path ===  '/ads'},
        {label: 'New', command: () => goto('/ads/new'), disabled: path ===  '/ads/new'}
      ]
    },
    {
      label: 'Account',
      items: [
        {label: 'Log out', command: () => {
          props.logout()
          goto('/login')
        }}
      ]
    }
  ]

  return ( 
    <div className='menu'>
      <Menu model={items} />
    </div>
   )
}

export default withRouter(SideMenu)