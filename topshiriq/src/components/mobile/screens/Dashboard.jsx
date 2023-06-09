import React, { useContext, useEffect } from 'react'
import NavbarComponent from '../../navbars/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {  useSnackbar } from 'notistack';
import { Context } from '../../../context/context';
import { push } from '../../../stories/allusers';
import AccessibleTable from '../../table';
import { pushCategory } from '../../../stories/quizCategory';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const distpatch = useDispatch()
  const currentQuiz = useSelector(e=>e.currentQuiz)
  const user = useSelector(e => e.auth.user)
  const { server } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    fetch(`${server}/dashboard/`, { credentials: "include" })
      .then(response => response.json())
      .then(data => {
        if (data.status === "serverError") {
          return enqueueSnackbar({ message: "serverda hatolik yuz berdi", variant: "error" })
        }
        distpatch(push(data.afterUser))
      })
      
      fetch("https://opentdb.com/api_category.php")
      .catch(()=> enqueueSnackbar({message:"serverga bog'lanib bolmadi " , variant:"warning"}))
      .then(response => response.json())
      .then(({trivia_categories})=> distpatch(pushCategory(trivia_categories)))
    })
    
    
    if(currentQuiz.length > 0){
      return <Navigate to={"/quiz"} />
    }
  const progressRank = Math.floor((360/ parseInt( user.quizAllTests)) * parseInt(user.quizAllRank))
  const progressNotRank =360 - progressRank

  return (
    <div className='w-100 vh-100 overflow-hidden bg-dark d-flex flex-column'>
      <NavbarComponent />
      <div
        style={{ flex: 1 }}
        className='d-flex flex-column gap-4'
      >
        <div className='px-2 d-flex flex-column gap-3'>
          <span className='text-light'>
            Your statistic
          </span>
          <div className='card bg-dark'>
            <div className='row'>
              <div className={`col-4 p-3 text-center d-flex flex-column align-items-center gap-3`}>
                <span className='text-light'>
                  yig'ilgan ball : {user.quizAllRank}
                </span>
                <div className='rounded-circle p-5 ' style={{background:`conic-gradient(green ${progressRank ? progressRank :0}deg , black 0deg)` , width:100}}></div>
              </div>
              <div className={`col-4 p-3 text-center d-flex flex-column align-items-center gap-3`}>
                <span className='text-light'>
                  xato javoblar : {parseInt(user.quizAllTests) - parseInt(user.quizAllRank)}
                </span>
                <div className='rounded-circle p-5 ' style={{background:`conic-gradient(green ${progressNotRank ?progressNotRank :0}deg , black 0deg)` , width:100}}></div>

              </div>
              <div className={`col-4  p-3 text-center d-flex flex-column align-items-center gap-3`} >
                <span className='text-light'>
                  korilgan savollar  
                </span>
                <div className='bg-success rounded-circle text-light fs-4 d-flex align-items-center justify-content-center' style={{width:100 , height:100}}>
                  {user.quizAllTests}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='px-2 vh-100 d-flex flex-column gap-4'>
            <span className='text-light'>
              all Users
            </span>
            <div className='h-50 overflow-auto '>
              <AccessibleTable />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard