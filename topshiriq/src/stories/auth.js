import { createSlice } from "@reduxjs/toolkit";

const authUser = createSlice({
    name:"auth",
    initialState:{status:"no auth" , user:{}},
    reducers:{
        authUsers(state , action){
            return {status:"auth" , user:action.payload}
        },
        singOut(){
            return {status:"no auth" , user:{}}
        }
    }
})
export const {authUsers , singOut} = authUser.actions
export default authUser.reducer