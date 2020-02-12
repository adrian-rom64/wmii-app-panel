import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router'
import {Button} from 'primereact/button'
import '../Styles/Show.css'
import Api from '../Api'
import Swal from 'sweetalert2'

const Show = props => {

  const [ad, setAd] = useState({})

  const getAd = async () => {
    const id = props.history.location.pathname.replace('/ads/', '')
    const res = await Api.get(`/ads/${id}`)
    if (!res) return
    if (res.code === 200) {
      setAd(res.data.ad)
    } else {
      console.log('error')
    }
  }

  const deleteAd = async id => {
    const res = await Api.delete(`/ads/${id}`)
    if (!res) return 'error'
    if (res.code === 200) return true
    return false
  }

  const deleteHandler = id => {
    Swal.fire({
      title: 'Czy jesteś pewien?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Usuń',
      cancelButtonText: 'Anuluj',
      reverseButtons: true
    }).then( async result => {
      if (result.value) {
        const res = await deleteAd(id)
        if (res === 'error') return
        else if (res) {
          Swal.fire({
            title: 'Usunięto',
            icon: 'success',
          })
          props.history.push('/ads')
        } else {
          Swal.fire({
            title: 'Coś poszło nie tak',
            icon: 'error'
          })
        }
  
      }
    })
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
        <Button label='Delete' onClick={() => deleteHandler(ad.id)} className='p-button-danger'/>
      </div>
    </div>
   )
}
 
export default withRouter(Show)