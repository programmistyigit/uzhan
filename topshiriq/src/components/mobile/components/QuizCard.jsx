import React, { useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'
import QuizCardAnswer from './QuizCardAnswer'

function QuizCard({question , ansvers , setRank}) {
    const answerComponent = useMemo(()=> (<QuizCardAnswer setRank={setRank} answer={ansvers}  />) , [ansvers])
  return (
    <Card >
        <Card.Title className='bg-secondary bg-opacity-10'>{question}</Card.Title>
        <Card.Body>
            {answerComponent}
        </Card.Body>
    </Card>
  )
}

export default QuizCard