import { Avatar, Chip } from '@mui/material';
import React, { useContext, useState } from 'react'
import {MdOutlineDone} from "react-icons/md"
import { Context } from '../../../context/context';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { authUsers } from '../../../stories/auth';

function QuizCardAnswer({answer , rank, setRank}) {
    const {enqueueSnackbar} = useSnackbar()
    const {server} = useContext(Context)
    const distpatch = useDispatch()
    const answerList = answer.sort(function(a,b){
        // here a , b is whole object, you can access its property
        //convert both to lowercase
           let x = a.answer.toLowerCase();
           let y = b.answer.toLowerCase();
     
        //compare the word which is comes first
           if(x>y){return 1;} 
           if(x<y){return -1;}
           return 0;
         })
         console.log(answerList);
         const variant = ["A" , "B" , "C" , "D"]
         const [chipOptions , setChipOption] = useState(Array(answerList.length).fill(0).map(()=>({disabled:false , status:undefined})))
         const handleClik = (index) => {
            setChipOption(prevState=>{
                return prevState.map((e , i)=>{
                    if(i === index) return {disabled:false , status:"success"}
                    return {...e , disabled:true}
                })
            })
            fetch(`${server}/usercontroll` , {
                method:"POST",
                body:JSON.stringify({quizAllRank:answerList[index].correct ? "update":"not"}),
                credentials:"include",
                headers:{"Content-type":"application/json"}
            })
            .catch(()=>{
                enqueueSnackbar({message:"failed connect network" , variant:"warning"})
            })
            .then(response => response.json())
            .then(data=> {
                if(data.status === "warning" || data.status === "serverError"){
                    return enqueueSnackbar({message:"qandaydir hatolik sahifaniu qayta yuklan aks holda sizning ballaringiz yozilme qolishi mumkun" , variant:"warning"})
                }
                if(data.user){
                    distpatch(authUsers(data.user))
                }
            })

            if(answerList[index].correct){
                setRank(prevState => prevState+1)
            }

         } 
  return (
    <div className=''>
        {answerList.map((ans , i)=>{
            return(
                <Chip key={variant[i]} onDelete={()=> handleClik(i)} deleteIcon={<MdOutlineDone />} disabled={chipOptions[i].disabled} color={chipOptions[i].status} className='text-start m-2' size={"medium"} label={ans.answer} avatar={<Avatar>{variant[i]}</Avatar>} />
            )
        })}
    </div>
  )
}

export default QuizCardAnswer