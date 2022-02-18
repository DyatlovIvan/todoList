import {authAPI, LoginParamsType} from "../../api/todolistsApi";
import {Dispatch} from "redux";
import {RequestStatusType, setStatus} from "../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn:false
}

const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedIn(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value
        }
    }
})

export const AuthReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

export const loginTC =(data:LoginParamsType)=>{
    return (dispatch:Dispatch)=>{
        dispatch(setStatus({status:RequestStatusType.Loading}))
        authAPI.login(data)
            .then(res=>{
                if(res.data.resultCode ===0){
                    dispatch(setIsLoggedIn({value:true}))
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error,dispatch)
            })
            .finally(()=>{
                dispatch(setStatus({status:RequestStatusType.Succeeded}))
            })
    }
}

export const logoutTC =()=>{
    return (dispatch:Dispatch)=>{
        dispatch(setStatus({status:RequestStatusType.Loading}))
        authAPI.logout()
            .then(res=>{
                if(res.data.resultCode ===0){
                    dispatch(setIsLoggedIn({value:false}))
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error,dispatch)
            })
            .finally(()=>{
                dispatch(setStatus({status:RequestStatusType.Succeeded}))
            })
    }
}


