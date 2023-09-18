import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = () => {
  return (
    <div className='text-center'>
        <Spinner 
        variant='light'
        animation="border" />
    </div>
  )
}

export default SpinnerComponent