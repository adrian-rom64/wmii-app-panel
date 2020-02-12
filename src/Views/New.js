import React, {useState, useRef} from 'react'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import '../Styles/New.css'
import Api from '../Api'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router'

const New = props => {

  const backgroundRef = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [year, setYear] = useState({name: 'Wszystkie', code: 0})
  const [specialization, setSpecialization] = useState({name: 'Wszystkie', code: 'none'})

  const postAd = async () => {
    const data = new FormData()
    data.set('title', title)
    data.set('content', content)
    data.set('year', year.code)
    data.set('specialization', specialization.code)
    if (backgroundRef.current.files[0])
      data.set('background', backgroundRef.current.files[0])
    const res = await Api.post('/ads', data)
    if (res.code === 200) {
      Swal.fire({
        title: 'Ogłoszenie dodane',
        icon: 'success'
      })
      props.history.push('/ads')
    } else {
      Swal.fire({
        title: 'Coś poszło nie tak',
        icon: 'error'
      })
    } 
  }

  const yearOptions = [
    {name: 'Wszystkie', code: 0},
    {name: '1', code: '1'},
    {name: '2', code: '2'},
    {name: '3', code: '3'},
    {name: '4', code: '4'},
    {name: '5', code: '5'}
  ]

  const specializationOptions = [
    {name: 'Wszystkie', code: 'none'},
    {name: 'Informatyka', code: 'inf'},
    {name: 'Matematyka', code: 'mat'}
  ]

  return ( 
    <div className='new'>
      <h2>Dodaj nowe ogłoszenie</h2>
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
      <Button label='Dodaj' onClick={postAd} />
    </div>
   )
}
 
export default withRouter(New)