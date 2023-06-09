import { createSlice } from "@reduxjs/toolkit";

const allUsers = createSlice({
    name:"allUsers",
    initialState:[],
    reducers:{
        push(_ , actions){
            return actions.payload
        }
    }
})


export const { push } = allUsers.actions
export default allUsers.reducer