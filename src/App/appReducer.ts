export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

type ActionType =
    | ReturnType<typeof setError>
    | ReturnType<typeof setStatus>

export const setError = (error:string|null)=>({type:'APP/SET-ERROR',error})as const
export const setStatus = (status:RequestStatusType)=>({type:'APP/SET-STATUS',status})as const