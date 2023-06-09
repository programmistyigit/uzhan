import { useContext, useEffect } from 'react'
import Mobile from './components/mobile/Mobile'
import { Context } from './context/context'
import { useDispatch } from 'react-redux'
import { authUsers, singOut } from './stories/auth'
import { set } from './stories/loading'

function App() {
  const distpatch = useDispatch()
  const { server } = useContext(Context)
  useEffect(() => {
    fetch(`${server}/whoami`, { credentials: "include" })
      .then(response => response.json())
      .then(({ status, user }) => {
        distpatch(set(false))
        if (status === "auth") {
          return distpatch(authUsers(user))
        }
        distpatch(singOut())
      })
  }, [server])

  return <Mobile />



}

export default App
