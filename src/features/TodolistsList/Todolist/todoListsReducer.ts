import {todolistsApi, TodolistType} from "../../../api/todolistsApi";
import {Dispatch} from "redux";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const TodoListsReducer = (state: Array<TodolistDomainType> = initialState, action: MainType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist,filter:"all"}, ...state]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.todoListID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(m => m.id === action.todoListID ? {...m, filter: action.value} : m)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(m => ({...m, filter: 'all'}))
        }
        default:
            return state
    }
}

export type MainType =
    | removeTodolistType
    | AddNewTodolistType
    | ReturnType<typeof updateTodolistTitle>
    | ReturnType<typeof changeFilterTodoListAC>
    | ReturnType<typeof setTodoLists>

export type removeTodolistType = ReturnType<typeof removeTodolist>
export type AddNewTodolistType = ReturnType<typeof addNewTodolist>
export type setTodoListsType = ReturnType<typeof setTodoLists>

//action
export const removeTodolist = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID}) as const

export const addNewTodolist = (todolist:TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const

export const updateTodolistTitle = (todoListID: string, title: string) => ({type: 'UPDATE-TODOLIST-TITLE', todoListID, title}) as const

export const changeFilterTodoListAC = (todoListID: string, value: FilterValuesType) => ({type: 'CHANGE-FILTER-TODOLIST', todoListID, value}) as const

export const setTodoLists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

//thunk
export const fetchTodolists = () => (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => dispatch(setTodoLists(res.data)))
}

export const removeTodoListTC = (todoListID:string) => (dispatch:Dispatch)=>{
    return todolistsApi.deleteTodolist(todoListID)
        .then(res => dispatch(removeTodolist(todoListID)))
}

export const addNewTodolistTC = (title:string) => (dispatch:Dispatch)=>{
    return todolistsApi.createTodolist(title)
        .then(res =>dispatch(addNewTodolist(res.data.data.item)))
}

export const updateTodolistTitleTC = (todolistId:string, title:string) => (dispatch:Dispatch)=>{
    return todolistsApi.updateTodolist(todolistId,title)
        .then(res =>{
            dispatch(updateTodolistTitle(todolistId,title))
        })
}