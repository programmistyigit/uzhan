import { createSlice } from "@reduxjs/toolkit";

const currentQuiz = createSlice({
    name:"currentQuiz",
    initialState:[],
    reducers:{
        replace(_ , actions){
            return actions.payload
        },
        remove(){
            return []
        }
    }
})
export const {replace , remove} = currentQuiz.actions
export default currentQuiz.reducer