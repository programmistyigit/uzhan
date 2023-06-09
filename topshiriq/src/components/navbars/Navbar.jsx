import { useContext, useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiBars3 } from "react-icons/hi2"
import { Context } from '../../context/context';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { singOut } from '../../stories/auth';
import { replace } from '../../stories/currentQuiz';

function NavbarComponent() {
  const quizCategory = useSelector(e => e.quizCategory)
  const distpatch = useDispatch()
  const { server } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()
  const singOut1 = async () => {
    try {

      const response = await fetch(`${server}/singout`, { credentials: "include" })
      const data = await response.json()
      enqueueSnackbar({ message: data.message, variant: data.status === "serverError" ? "danger" : data.status })
      distpatch(singOut())
    } catch (error) {
      enqueueSnackbar({ message: error.toString(), variant: "warning" })
    }
  }

  const [quizLength, setLength] = useState({})
  const [quizOptions, setOptions] = useState({})
  const [degree, setDargee] = useState("total_question_count")
  const setOptionsFuntion = (property, value) => setOptions(prevState => ({ ...prevState, [property]: value === "null" ? undefined : value }))

  const quizCategoryList = useMemo(() => quizCategory.map(quiz => (<option className='text-light' key={quiz.id} value={quiz.id}>{quiz.name}</option>)), [quizCategory])
  console.log(quizOptions);
  useEffect(() => {
    if (!quizOptions.category) return;

    fetch(`https://opentdb.com/api_count.php?category=${quizOptions.category}`)
      .then(response => response.json())
      .then(({ category_question_count }) => {
        setLength(category_question_count)
      })
  }, [quizOptions])

  const startQuiz = async () => {
    const url = new URL("https://opentdb.com/api.php")
    url.search = new URLSearchParams()
    Object.entries(quizOptions).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    try {


      const response = await fetch(url)
      const data = await response.json()
      console.table(data.results);
      if (data.results.length === 0) {
        return enqueueSnackbar({ message: "topilgan natijalar 0ga teng qayta tanlang", variant: "warning" })
      }

      distpatch(replace(data.results))
      enqueueSnackbar({ message: "savollar tayorlandi javob berishingiz mumkun", variant: "success" })


    } catch (error) {
      enqueueSnackbar({ message: "failed connect network", variant: "warning" })
    }
  }

  return (
    <Navbar bg="dark" style={{ boxShadow: "0 0 10px black" }} className="mb-3" expand={false}>
      <Container fluid>
        <Navbar.Brand className='text-light'>Quiz upgrade IQ</Navbar.Brand>
        <Navbar.Toggle className='border-0  text-light' style={{ outline: "none" }}>
          <HiBars3 size={30} />
        </Navbar.Toggle >
        <Navbar.Offcanvas
          className="bg-dark"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='text-light' >
              menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column'>
            <div className='p-2' style={{ flex: 1 }}>
              <div className='text-light'>new quiz</div>
              <div className='w-100  mt-3 '>
                <select defaultValue={"null"} onChange={({ target }) => setOptionsFuntion("category", target.value)} className='p-3 rounded-3 bg-dark text-light'>
                  <option value="null">select category</option>
                  {quizCategoryList}
                </select>
              </div>

              {quizOptions.category && (
                <>
                  <div className='row mt-4'>
                    <div className='col-6 px-3'>
                      <select onChange={({ target }) => setOptionsFuntion("amount", target.value)} className='w-100 p-2 rounded-3 bg-dark text-light'>
                        {Array(quizLength[degree]).fill(0).map((_, i) => (<option key={i} >{i}</option>))}
                      </select>
                    </div>
                    <div className='col-6 px-3'>
                      <select
                        defaultValue={"total_question_count"}
                        onChange={({ target }) => {
                          setOptionsFuntion("difficulty", target.value.split("_")[1] === "question" ? undefined : target.value.split("_")[1])
                          setDargee(target.value)
                        }}
                        className='w-100 p-2 rounded-3 bg-dark text-light'
                      >
                        <option value="total_question_count">any</option>
                        <option value="total_easy_question_count">easy</option>
                        <option value="total_medium_question_count">medium</option>
                        <option value="total_hard_question_count">hard</option>
                      </select>
                    </div>
                  </div>
                  <div className='w-100'>
                    <select
                      onChange={({ target }) => setOptionsFuntion("type", target.value === "any" ? undefined : target.value)}
                      className='bg-dark text-light p-2 rounded-3 mt-4 w-100'
                    >
                      <option value="any">any type</option>
                      <option value="multiple">multiple</option>
                      <option value="boolean">boolean </option>
                    </select>
                  </div>

                  <div className={`w-100 btn btn-outline-success mt-4 ${!quizOptions.amount || quizOptions.amount === '0' ? "disabled" : ""}`} onClick={startQuiz}>start quiz</div>
                </>
              )}


            </div>
            <div className='btn btn-danger' onClick={singOut1}>SingOut</div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;