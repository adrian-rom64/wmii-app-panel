import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { unixToString } from '../Utils'
import '../Styles/IndexView.css'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router'

const Api = require('../Api').default.getInstance()

const Index = props => {

  const [ads, setAds] = useState([])

  const getAds = async () => {
    const res = await Api.get('/ads')
    if (res.code === 200)
      setAds(res.data.ads)
    else
      console.log(res)
  }

  const deleteAd = async id => {
    const res = await Api.delete(`/ads/${id}`)
    if (res.code === 200) return true
    return false
  }

  useEffect(() => {
    getAds()
  }, [])

  const showHandler = id => {
    props.history.push(`/ads/${id}`)
  }

  const editHandler = id => {
    console.log('edit', id)
  }

  const deleteHandler = id => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then( async result => {
      if (result.value) {
        if (await deleteAd(id)) {
          setAds(ads => ads.filter(item => item.id !== id))
          Swal.fire({
            title: 'Deleted',
            icon: 'success',
          })
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error'
          })
        }
  
      }
    })
  }

  const link = (title, func) => {
    let color = 'black'
    if (title === 'edit') color = '#0074D9'
    if (title === 'delete') color = '#FF4136'
    return (
      <div className='link' onClick={func} style={{ color: color }}>
        {title}
      </div>
    )
  }

  const data = ads.map(item => {
    item.title = link(item.title, () => showHandler(item.id))
    item.edit = link('edit', () => editHandler(item.id))
    item.delete = link('delete', () => deleteHandler(item.id))
    item.updated_at = unixToString(item.updated_at)
    return item
  })

  return (
    <div className='index'>
      <h2>Index</h2>
      <DataTable value={data} style={{ textAlign: 'center' }}>
        <Column style={{ width: '60px' }} field='id' header='Id' />
        <Column field='title' header='Title' />
        <Column field='updated_at' header='Updated' />
        <Column field='edit' header='Edit' />
        <Column field='delete' header='Delete' />
      </DataTable>
    </div>
  )
}

export default withRouter(Index)