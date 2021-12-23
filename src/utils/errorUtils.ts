import {setError, setStatus} from "../App/appReducer";
import {ResponseType} from "../api/todolistsApi";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data:ResponseType<D>, dispatch: Dispatch)=>{
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error'))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = ( error: {message:string},dispatch: Dispatch) =>{
    dispatch(setError(error.message ? error.message:'Some error'))
    dispatch(setStatus('failed'))
}