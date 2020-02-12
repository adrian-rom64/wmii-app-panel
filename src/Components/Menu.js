import React from 'react'
import {withRouter} from 'react-router'
import '../Styles/Menu.css'
import {Menu} from 'primereact/menu'

const SideMenu = props => {

  const goto = path => props.history.push(path)
  const path = props.location.pathname

  const items = [
    {
      label: 'Ogłoszenia',
      items: [
        {label: 'Lista', command: () => goto('/ads'), disabled: path ===  '/ads'},
        {label: 'Nowe', command: () => goto('/ads/new'), disabled: path ===  '/ads/new'}
      ]
    },
    {
      label: 'Konto',
      items: [
        {label: 'Wyloguj', command: () => {
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