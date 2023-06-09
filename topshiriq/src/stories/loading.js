import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
    name:"loading",
    initialState:true,
    reducers:{
        set(_ , action){
            return action.payload
        }
    }
})

export const {set} = loading.actions
export default loading.reducer