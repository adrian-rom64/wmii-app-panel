import React, {useEffect} from 'react'

const Delete = () => {

  useEffect(() => {
    const id = props.history.location.pathname.replace('/ads/', '').replace('/edit', '')
    
  }, []) // eslint-disable-line

  return null
}
 
export default Delete;