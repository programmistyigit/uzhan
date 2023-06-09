import React, { useContext, useState } from 'react'
import {AiOutlineUser} from "react-icons/ai"
import {RiLockPasswordFill} from "react-icons/ri"
import { Context } from '../../../context/context'
import {useSnackbar } from "notistack"
import { useDispatch } from 'react-redux'
import { authUsers } from '../../../stories/auth'
function SingUp() {
    const { server } = useContext(Context)
    const distpatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [userData , setUserData] = useState({})
    const setData = ( target , value ) => setUserData(prevState => ({...prevState , [target]:value}))
    const [validateErrorPath , setPath] = useState([])
    
    const notification = (message , variant) => enqueueSnackbar({message , variant})
    const createAccount = async () => {
        const response = await fetch(`${server}/auth/singup` , {
            method:"POST",
            body:JSON.stringify(userData),
            credentials:"include",
            headers:{"Content-type":"application/json"}
        })
        const data = await response.json()
        notification(data.message , data.status ==="validateError"  || data.status === "serverError" ? "warning" : data.status)
        console.log(data);
        if(data.status === "success"){
            distpatch(authUsers(data.user))
        }
        if(data.status === "validateError"){
            setPath(data.target)
        }
    }
  
    return (
        <div className='w-100 px-3 d-flex flex-column gap-3'>
            <div className={`p-2 px-3 bg-light rounded-3 d-flex align-items-center ${validateErrorPath.includes("login") ? "border border-danger border-3" :""}`}>
                <AiOutlineUser size={30} color={validateErrorPath.includes("login") ? "red" :"blueviolet"} />
                <input
                    onInput={({target}) => setData("login" , target.value)}
                    placeholder='login...'
                    type="text" 
                    style={{flex:1 , outline:"none"}} 
                    className={`p-2 bg-transparent text-center placeholder border-0 text-dark fs-4 `} 
                    />
            </div>
            <div className={`p-2 px-3 bg-light rounded-3 d-flex align-items-center ${validateErrorPath.includes("password") && "border border-danger border-3"}`}>
                <RiLockPasswordFill size={30} color={validateErrorPath.includes("password") ? "red" :"blueviolet"} />
                <input 
                    onInput={({target}) => setData("password" , target.value)}
                    type="text"
                    placeholder='password...'
                    style={{flex:1 , outline:"none"}} 
                    className='p-2 bg-transparent border-0 text-center placeholder text-dark fs-4' 
                />
            </div>
            <div className={`p-2 px-3 bg-light rounded-3 d-flex align-items-center ${validateErrorPath.includes("confirmPassword") && "border border-danger border-3"}`}>
                <RiLockPasswordFill size={30} color={validateErrorPath.includes("confirmPassword") ? "red" :"blueviolet"} />
                <input 
                    onInput={({target}) => setData("confirmPassword" , target.value)}
                    type="text"
                    placeholder='confirm password'
                    style={{flex:1 , outline:"none"}} 
                    className='p-2 bg-transparent border-0 text-center placeholder text-dark fs-4' 
                    />
            </div>
            <div className='btn btn-danger p-3 text-center fs-5' onClick={createAccount}>create account</div>
        </div>
  )
}

export default SingUp