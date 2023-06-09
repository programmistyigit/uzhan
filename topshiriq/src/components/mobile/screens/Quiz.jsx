import { useSnackbar } from 'notistack'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import QuizNavbar from '../../navbars/QuizNavbar'
import QuizCard from '../components/QuizCard'
import { Chip } from '@mui/material'
import ModalQuiz from '../components/modal'

function Quiz() {
  const [show, setShow] = useState(false);
  const [rank , setRank] = useState(0)
  const currentQuiz = useSelector(e => e.currentQuiz)
  const { enqueueSnackbar } = useSnackbar()
  const [isNavigate, setNavigate] = useState(false)
  useEffect(() => {
    if (currentQuiz.length === 0) {
      enqueueSnackbar({ message: "siz quiz sahifada qolish uchun savollar royhatini tanlashingiz kerak", variant: "info" })
      setNavigate(true)
    }
  }, [])

  // const allAnsvers = currentQuiz.map(quiz=> ]))
  const quizCardList = useMemo(() => currentQuiz.map(e => {
    const allAnsvers = [{ correct: true, answer: e.correct_answer }, ...e.incorrect_answers.map(answers => ({ correct: false, answer: answers }))]
    return (
      <div key={e.question} className={`col-${window.outerWidth > 1000 ? 3 : window.outerWidth > 600 ? 6 :12} p-2`}>
        <QuizCard setRank={setRank}  ansvers={allAnsvers} question={e.question} />
      </div>
    )
  }), [currentQuiz])

  const [theEndAfterSecond, setSecond] = useState(60 * parseInt(currentQuiz.length))
  const endQuiz = () => {
    if(theEndAfterSecond < 0){ setSecond(0)}
    setShow(true)
   }

  useEffect(() => {
    if (theEndAfterSecond <= 0) return endQuiz();
    setTimeout(() => {
      setSecond(prevState => parseInt(prevState) - 1)
    }, 1000);
  }, [theEndAfterSecond])

  const endHours = Math.floor(theEndAfterSecond / 3600)
  const endMinut = Math.floor(theEndAfterSecond / 60)

  const handleDelete = () => {
    setSecond(1)
  }

  if (isNavigate) {
    return <Navigate to={"/"} />
  }
  return (
    <div className='bg-dark w-100 vh-100 overflow-hidden d-flex flex-column'>
      <QuizNavbar />

      <div className='w-100 p-3 d-flex flex-column gap-5' style={{ flex: 1 }}>
        <div className='w-100 p-4 border border-light rounded-3 bg-dark border d-flex justify-content-between'>
          <span className='text-light'>end time {endHours >= 10 ? endHours : "0" + endHours} : {endMinut >= 10 ? endMinut : "0" + endMinut} : {theEndAfterSecond % 60}s</span>
          <Chip variant="outlined" color="error" label="toxtatish" onDelete={handleDelete} />
        </div>
        <div className='w-100 row' style={{maxHeight:700 , overflow:"auto"}}>
          {quizCardList}
        </div>
      </div>
      <ModalQuiz show={show} setNavigate={setNavigate} setShow={setShow} allTest={currentQuiz.length} succesNumber={rank} />
    </div>
  )
}

export default Quiz