import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SingIn from '../auth/SingIn'
import SingUp from '../auth/SingUp'
import SingInOrSingUp from '../auth/SingInOrSingUp'

function Auth() {
  return (
    <div className='w-100 d-flex overflow-hidden justify-content-center bg-dark'>

      <div className='w-100 vh-100 d-flex justify-content-center align-items-center' style={{ maxWidth: 450 }}>
        <Routes>
          <Route path='/singin' element={<SingIn />} />
          <Route path='/singup' element={<SingUp />} />
          <Route path='*' element={<SingInOrSingUp />} />
        </Routes>
      </div>
    </div>
  )
}

export default Auth