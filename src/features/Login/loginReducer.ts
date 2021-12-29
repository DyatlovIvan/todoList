import {authAPI, LoginParamsType} from "../../api/todolistsApi";
import {Dispatch} from "redux";
import {setStatus} from "../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

type InitialStateType = {}
const initialState:InitialStateType = {}

export const TodoListsReducer = (state= initialState, action: MainType) => {
    switch (action.type) {

        default:
            return state
    }
}

export type MainType = any

export const loginTC =(data:LoginParamsType)=>{
    {return (dispatch:Dispatch)=>{
        dispatch(setStatus('loading'))
        authAPI.login(data)
            .then(res=>{
                if(res.data.resultCode ===0){
                    alert('Yo')
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


