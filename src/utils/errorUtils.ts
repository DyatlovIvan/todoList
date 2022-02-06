import {RequestStatusType, setError, setStatus} from "../App/appReducer";
import {ResponseType} from "../api/todolistsApi";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data:ResponseType<D>, dispatch: Dispatch)=>{
    if (data.messages.length) {
        dispatch(setError({error:data.messages[0]}))
    } else {
        dispatch(setError({error:'Some error'}))
    }
    dispatch(setStatus({status:RequestStatusType.Failed}))
}

export const handleServerNetworkError = ( error: {message:string},dispatch: Dispatch) =>{
    dispatch(setError(error.message ? {error:error.message}:{error:'Some error'}))
    dispatch(setStatus({status:RequestStatusType.Failed}))
}