import {Dispatch} from "redux";
import {authAPI} from "../api/todolistsApi";
import {setIsLoggedIn} from "../features/Auth/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError} from "../utils/errorUtils";

export enum RequestStatusType {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed'
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    //true когда приложение проинициализировалось(проверили юзера, получили настройки)
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: RequestStatusType.Idle,
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const AppReducer = slice.reducer
export const {setError, setStatus, setAppInitialized} = slice.actions;


export const initializeApp = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
            } else {
                handleServerAppError(res.data,dispatch)
            }

        })
        .finally(() => {
            dispatch(setAppInitialized({isInitialized: true}))
        })

}