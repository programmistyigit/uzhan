import { createSlice } from "@reduxjs/toolkit";

const quizCategory = createSlice({
    name:"category",
    initialState:[],
    reducers:{
        pushCategory(_ , action){
            return action.payload
        }
    }
})

export const {pushCategory} = quizCategory.actions
export default quizCategory.reducer