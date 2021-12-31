import {Dispatch} from "redux";
import {authAPI} from "../api/todolistsApi";
import {setIsLoggedIn} from "../features/Login/authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    //true когда приложение проинициализировалось(проверили юзера, получили настройки)
    isInitialized:boolean
}
export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "APP/SET-IS-INITIALIZED":{
            return {...state,isInitialized:action.value}
        }
        default:
            return {...state}
    }
}

type ActionType =
    | ReturnType<typeof setError>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setAppInitialized>

export const setError = (error:string|null)=>({type:'APP/SET-ERROR',error})as const
export const setStatus = (status:RequestStatusType)=>({type:'APP/SET-STATUS',status})as const
export const setAppInitialized = (value:boolean)=>({type:'APP/SET-IS-INITIALIZED',value})as const

export const initializeApp = ()=>(dispatch:Dispatch)=>{
    authAPI.me()
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedIn(true))
            }else{
            }

        })
        .finally(()=>{
            dispatch(setAppInitialized(true))
        })

}