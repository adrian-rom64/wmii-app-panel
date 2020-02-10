import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router'
import {Button} from 'primereact/button'
import '../Styles/Show.css'
import Api from '../Api'

const Show = props => {

  const [ad, setAd] = useState({})

  const getAd = async () => {
    const id = props.history.location.pathname.replace('/ads/', '')
    const res = await Api.get(`/ads/${id}`)
    console.log(res)
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
      <br />
      <img src={ad.background} className='image' />
      <h2>{ad.title}</h2>
      <p>{ad.content}</p>
      <div className='buttons'>
        <Button label='Edit' onClick={() => props.history.push(`/ads/${ad.id}/edit`)}/>
        <Button label='Delete' className='p-button-danger'/>
      </div>
    </div>
   )
}
 
export default withRouter(Show)