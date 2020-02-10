import React from 'react'
import {withRouter} from 'react-router'
import '../Styles/Menu.css'
import {Menu} from 'primereact/menu'

const SideMenu = props => {

  const goto = path => props.history.push(path)

  const items = [
    {
      label: 'Assets',
      items: [
        {label: 'Index', command: () => goto('/ads')},
        {label: 'New', command: () => goto('/ads/new')}
      ]
    },
    {
      label: 'Account',
      items: [
        {label: 'Log out', command: () => goto('/logout')}
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