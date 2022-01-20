import {todolistsApi, TodolistType} from "../../../api/todolistsApi";
import {Dispatch} from "redux";
import {RequestStatusType, setStatus} from "../../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name:'todolists',
    initialState:initialState,
    reducers:{
        removeTodolist(state,action:PayloadAction<{todoListID: string}>){
            console.log('reducer')
            const index = state.findIndex(tl=>tl.id===action.payload.todoListID)
            if (index>-1){
                state.splice(index,1)
            }
        },
        addNewTodolist(state,action:PayloadAction<{todolist:TodolistType}>){
            state.unshift({...action.payload.todolist,filter:'all',entityStatus:'idle'})
        },
        updateTodolistTitle(state,action:PayloadAction<{todoListID: string, title: string}>){
            const index = state.findIndex(tl=>tl.id===action.payload.todoListID)
            state[index].title = action.payload.title
        },
        changeFilterTodoListAC(state,action:PayloadAction<{todoListID: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl=>tl.id===action.payload.todoListID)
            state[index].filter = action.payload.filter
        },
        setTodoLists(state,action:PayloadAction<{todoLists: Array<TodolistType>}>){
            return action.payload.todoLists.map(m => ({...m, filter: 'all',entityStatus:'idle'}))
        },
        changeTodolistEntityStatus(state,action:PayloadAction<{todoListID:string, status:RequestStatusType}>){
            const index = state.findIndex(tl=>tl.id===action.payload.todoListID)
            state[index].entityStatus = action.payload.status
        },
    }
})

export const TodoListsReducer = slice.reducer
export const {removeTodolist,addNewTodolist,updateTodolistTitle,
    changeFilterTodoListAC,setTodoLists,changeTodolistEntityStatus} = slice.actions


export type removeTodolistType = ReturnType<typeof removeTodolist>
export type AddNewTodolistType = ReturnType<typeof addNewTodolist>
export type setTodoListsType = ReturnType<typeof setTodoLists>


//thunk
export const fetchTodolists = () => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodoLists({todoLists:res.data}))
                dispatch(setStatus({status:'succeeded'}))
            })
            .catch(error=>{
                handleServerNetworkError(error,dispatch)
            })
}

export const removeTodoListTC = (todoListID:string) => (dispatch:Dispatch)=>{
    dispatch(setStatus({status:'loading'}))
    dispatch(changeTodolistEntityStatus({todoListID:todoListID,status:'loading'}))
    return todolistsApi.deleteTodolist(todoListID)
        .then(res => {
            dispatch(removeTodolist({todoListID:todoListID}))
            dispatch(setStatus({status:'succeeded'}))
        })

}

export const addNewTodolistTC = (title:string) => (dispatch:Dispatch)=>{
    dispatch(setStatus({status:'loading'}))
    return todolistsApi.createTodolist(title)
        .then(res =>{
            if(res.data.resultCode===0){
                dispatch(addNewTodolist({todolist:res.data.data.item}))

            }else{
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(error=>{
            handleServerNetworkError(error,dispatch)
        })
        .finally(()=>{
            dispatch(setStatus({status:'succeeded'}))
        })

}

export const updateTodolistTitleTC = (todolistId:string, title:string) => (dispatch:Dispatch)=>{
    dispatch(setStatus({status:'loading'}))
    return todolistsApi.updateTodolist(todolistId,title)
        .then(res =>{
            dispatch(updateTodolistTitle({todoListID:todolistId,title:title}))
            dispatch(setStatus({status:'succeeded'}))
        })
}