import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router'
import {Button} from 'primereact/button'
import '../Styles/Show.css'

const Api = require('../Api').default.getInstance()

const Show = props => {

  const [ad, setAd] = useState({})

  const getAd = async () => {
    const id = props.history.location.pathname.replace('/ads/', '')
    const res = await Api.get(`/ads/${id}`)
    if (res.code === 200) {
      setAd(res.data.ad)
    } else {
      console.log('error')
    }
  }

  useEffect(() => {
    getAd()
  }, [])

  return ( 
    <div className='show'>
      <span style={{color: 'grey', fontSize: '14px'}}>Id: {ad.id}</span>
      <h2>{ad.title}</h2>
      <p>{ad.content}</p>
      <div className='buttons'>
        <Button label='Edit' />
        <Button label='Delete' className='p-button-danger'/>
      </div>
    </div>
   )
}
 
export default withRouter(Show)