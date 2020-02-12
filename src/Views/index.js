import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { unixToString } from '../Utils'
import '../Styles/IndexView.css'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router'
import Api from '../Api'

const Index = props => {

  const [ads, setAds] = useState([])

  const getAds = async () => {
    const res = await Api.get('/ads')
    if (!res) return
    if (res.code === 200)
      setAds(res.data.ads)
    else
      console.log(res)
  }

  const deleteAd = async id => {
    const res = await Api.delete(`/ads/${id}`)
    if (!res) return 'error'
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
    props.history.push(`/ads/${id}/edit`)
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
          setAds(ads => ads.filter(item => item.id !== id))
          Swal.fire({
            title: 'Usunięto',
            icon: 'success',
          })
        } else {
          Swal.fire({
            title: 'Coś poszło nie tak',
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
    let text = title
    if (title === 'edit') text = 'edytuj'
    if (title === 'delete') text = 'usuń'
    return (
      <div className='link' onClick={func} style={{ color: color }}>
        {text}
      </div>
    )
  }

  const data = ads.map(item => ({
    ...item,
    title: link(item.title, () => showHandler(item.id)),
    edit: link('edit', () => editHandler(item.id)),
    delete: link('delete', () => deleteHandler(item.id)),
    updated_at: unixToString(item.updated_at)
  }))

  return (
    <div className='index'>
      <h2>Index</h2>
      <DataTable value={data} style={{ textAlign: 'center' }} responsive>
        <Column style={{ width: '60px' }} field='id' header='Id' />
        <Column field='title' header='Tytuł' />
        <Column field='updated_at' header='Aktualizowano' />
        <Column field='edit' header='Edytuj' />
        <Column field='delete' header='Usuń' />
      </DataTable>
    </div>
  )
}

export default withRouter(Index)