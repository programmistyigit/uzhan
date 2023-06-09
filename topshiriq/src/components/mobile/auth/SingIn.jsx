import { useSnackbar } from 'notistack'
import React, { useContext, useState } from 'react'
import { AiOutlineUser } from "react-icons/ai"
import { RiLockPasswordFill } from "react-icons/ri"
import { Context } from '../../../context/context'
import { useDispatch } from 'react-redux'
import { authUsers } from '../../../stories/auth'

function SingIn() {
    const [findUserOptions , setOptions] = useState({})
    const { server } = useContext(Context)
    const {enqueueSnackbar} = useSnackbar()
    const distpach = useDispatch()
    const findAccound = async () => {
        const response = await fetch(`${server}/auth/singin` , {
            method:"POST",
            body:JSON.stringify(findUserOptions),
            credentials:"include",
            headers:{"Content-type":"application/json"}
        })

        const data = await response.json()
        enqueueSnackbar({message:data.message , variant:data.status === "validateError" || data.status === "serverError" ?"warning":data.status})
        if(data.status === "success"){
            distpach(authUsers(data.user))
        }
    }
    const setUserOptions = (target , value) => setOptions(prevState=> ({...prevState , [target]:value}))
    return (
        <div className='w-100 px-3 d-flex flex-column gap-3'>
            <div className={`p-2 px-3 bg-light rounded-3 d-flex align-items-center `}>
                <AiOutlineUser size={30} color="blueviolet" />
                <input
                    onInput={({ target }) => setUserOptions("login", target.value)}
                    placeholder='login...'
                    type="text"
                    style={{ flex: 1, outline: "none" }}
                    className={`p-2 bg-transparent text-center placeholder border-0 text-dark fs-4 `}
                />
            </div>
            <div className={`p-2 px-3 bg-light rounded-3 d-flex align-items-center `}>
                <RiLockPasswordFill size={30} color="blueviolet" />
                <input
                    onInput={({ target }) => setUserOptions("password", target.value)}
                    type="text"
                    placeholder='password...'
                    style={{ flex: 1, outline: "none" }}
                    className='p-2 bg-transparent border-0 text-center placeholder text-dark fs-4'
                />
            </div>

            <div className='btn btn-danger p-3 text-center fs-5' onClick={findAccound}>Find account</div>
        </div>
    )
}

export default SingIn