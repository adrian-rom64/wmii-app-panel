import React, {useState, useRef} from 'react'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import '../Styles/New.css'

const Api = require('../Api').default.getInstance()

const New = () => {

  const backgroundRef = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [year, setYear] = useState({name: 'Wszystkie', code: 'none'})
  const [specialization, setSpecialization] = useState({name: 'Wszystkie', code: 'none'})

  const postAd = async () => {
    const data = new FormData()
    data.set('title', title)
    data.set('content', content)
    data.set('year', year)
    data.set('specialization', specialization)
    data.set('background', backgroundRef.current.files[0])
    const res = await Api.post('/ads', data)
    console.log(res)
  }

  const yearOptions = [
    {name: 'Wszystkie', code: 'none'},
    {name: '1', code: '1'},
    {name: '2', code: '2'},
    {name: '3', code: '3'},
    {name: '4', code: '4'}
  ]

  const specializationOptions = [
    {name: 'Wszystkie', code: 'none'},
    {name: 'Informatyka', code: 'inf'},
    {name: 'Matematyka', code: 'mat'}
  ]

  return ( 
    <div className='new'>
      <h2>Add new Event</h2>
      <InputText 
        className='new-input' 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title'
      />
      <br /><br />
      <InputTextarea
        className='new-input'
        rows={5}
        cols={30}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='Content'
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
      <input type='file' ref={backgroundRef} />
      <br /><br />
      <Button label='Submit' onClick={postAd} />
    </div>
   )
}
 
export default New