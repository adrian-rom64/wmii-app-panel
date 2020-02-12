import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Spinner.css'

const Spinner = props => {

  const spinner = (
    <div className='spinner-background'>
      <div className='spinner-wrapper'>
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  )

  return props.visible ? spinner : null
}

export default state => {
    ReactDOM.render(<Spinner visible={state} />, document.getElementById('spinner'))
}