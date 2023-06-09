import  { Navigate, Route, Routes }    from 'react-router-dom'      // Route, Routes
import  Dashboard                      from './screens/Dashboard'   // Dashboard
import  Quiz                           from './screens/Quiz'        // Quiz
import  { useSelector }                from 'react-redux'           //  useDispatch, useSelector
import  Auth                           from './screens/Auth'        // Auth
import  Loading                        from './screens/Loading'     // Loading
import { SnackbarProvider } from 'notistack'

function Mobile() {
  const loading = useSelector(e => e.loading)
  const auth = useSelector(e => e.auth)


  if (loading) return <Loading />
  if (auth.status === "no auth") {
    return <Auth />
  }

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  )
}

export default ()=> (<SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{horizontal:"left" , vertical:"top"}}><Mobile/></SnackbarProvider>)