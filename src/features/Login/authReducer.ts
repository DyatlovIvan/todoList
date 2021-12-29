import {authAPI, LoginParamsType} from "../../api/todolistsApi";
import {Dispatch} from "redux";
import {setStatus} from "../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

type InitialStateType = {
    isLoggedIn:boolean
}
const initialState:InitialStateType = {
    isLoggedIn:false
}

export const AuthReducer = (state= initialState, action: MainType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":{
            return{...state,isLoggedIn:action.value}
        }
        default:
            return state
    }
}

export type MainType = ReturnType<typeof setIsLoggedIn>


export const setIsLoggedIn = (value:boolean)=>
    ({type: 'login/SET-IS-LOGGED-IN',value})as const

export const loginTC =(data:LoginParamsType)=>{
    {return (dispatch:Dispatch)=>{
        dispatch(setStatus('loading'))
        authAPI.login(data)
            .then(res=>{
                if(res.data.resultCode ===0){
                    dispatch(setIsLoggedIn(true))
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error,dispatch)
            })
            .finally(()=>{
                dispatch(setStatus('succeeded'))
            })
    }}
}

export const logoutTC =()=>{
    {return (dispatch:Dispatch)=>{
        dispatch(setStatus('loading'))
        authAPI.logout()
            .then(res=>{
                if(res.data.resultCode ===0){
                    dispatch(setIsLoggedIn(false))
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error,dispatch)
            })
            .finally(()=>{
                dispatch(setStatus('succeeded'))
            })
    }}
}


