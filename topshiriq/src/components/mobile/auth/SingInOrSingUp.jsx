import React from 'react'
import { Link } from 'react-router-dom'

function SingInOrSingUp() {
  return (
    <div className='w-100 px-3 d-flex flex-column gap-3'>
        <Link to={"/singUp"} className='text-decoration-none'>
            <div className='bg-dark card border-light p-3 text-center rounded-3'>
                <span className='text-light fs-5'>create Account</span>
            </div>
        </Link>
        
        <Link to={"singin"} className='text-decoration-none'>
            <div className='bg-light p-3 text-center rounded-3'>
                <span className='fs-5' style={{color:"blueviolet"}}>find Account</span>
            </div>
        </Link>
    </div>
  )
}

export default SingInOrSingUp