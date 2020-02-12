import React, {useState, useRef, useEffect} from 'react'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import '../Styles/Edit.css'
import Api from '../Api'
import Swal from 'sweetalert2'

const Edit = props => {

  const [ad, setAd] = useState({})
  const backgroundRef = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [year, setYear] = useState({name: 'Wszystkie', code: 0})
  const [specialization, setSpecialization] = useState({name: 'Wszystkie', code: 'none'})

  const updateAd = async () => {
    const data = new FormData()
    data.set('title', title)
    data.set('content', content)
    data.set('year', year.code)
    data.set('specialization', specialization.code)
    if (backgroundRef.current.files[0])
      data.set('background', backgroundRef.current.files[0])
    const res = await Api.patch(`/ads/${ad.id}`, data)
    if (!res) return
    if (res.code === 200) {
      props.history.push('/ads')
      Swal.fire({
        title: 'Ogłoszenie zaaktualizowane',
        icon: 'success'
      })
    } else {
      Swal.fire({
        title: 'Coś poszło nie tak',
        icon: 'error'
      })
    }
  }

  const getAd = async () => {
    const id = props.history.location.pathname.replace('/ads/', '').replace('/edit', '')
    const res = await Api.get(`/ads/${id}`)
    if (!res) return
    if (res.code === 200) {
      setAd(res.data.ad)
    } else {
      Swal.fire({
        title: 'Coś poszło nie tak',
        icon: 'error'
      })
    }
  }

  const dict = {
    mat: 'Matematyka',
    inf: 'Informatyka',
    none: 'Wszystkie'
  }

  useEffect(() => {
    getAd()
  }, [])

  useEffect(() => {
    setTitle(ad.title)
    setContent(ad.content)
    setYear({name: ad.year === 0 ? 'Wszystkie' : String(ad.year), code: ad.year})
    setSpecialization({name: dict[ad.specialization], code: ad.specialization})
  }, [ad])

  const yearOptions = [
    {name: 'Wszystkie', code: 0},
    {name: '1', code: 1},
    {name: '2', code: 2},
    {name: '3', code: 3},
    {name: '4', code: 4},
    {name: '5', code: 5}
  ]

  const specializationOptions = [
    {name: 'Wszystkie', code: 'none'},
    {name: 'Informatyka', code: 'inf'},
    {name: 'Matematyka', code: 'mat'}
  ]

  return ( 
    <div className='edit'>
      <span style={{color: 'grey', fontSize: '14px'}}>Id: {ad.id}</span>
      <h2>Edytuj</h2>
      <img src={ad.background} className='image'/>
      <br /><br />
      <InputText 
        className='new-input' 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Tytuł'
      />
      <br /><br />
      <InputTextarea
        className='new-input'
        rows={5}
        cols={30}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='Treść'
      />
      <br /><br />
      <SelectButton
        optionLabel="name"
        value={year}
        options={yearOptions}
        onChange={e => setYear(e.value)}
      ></SelectButton>
      <br />
      <SelectButton
        optionLabel="name"
        value={specialization}
        options={specializationOptions}
        onChange={e => setSpecialization(e.value)}
      ></SelectButton>
      <br />
      <input type='file' ref={backgroundRef} placeholder='aaa'/>
      <br /><br />
      <Button label='Update' onClick={updateAd} />
    </div>
   )
}
 
export default Edit