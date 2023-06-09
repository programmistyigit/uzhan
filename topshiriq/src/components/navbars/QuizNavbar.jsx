import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { HiBars3 } from 'react-icons/hi2'

function QuizNavbar() {
  return (
    <Navbar bg="dark" style={{ boxShadow: "0 0 10px black" }} className="mb-3" expand={false}>
    <Container fluid>
      <Navbar.Brand className='text-light'>Quiz page</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default QuizNavbar