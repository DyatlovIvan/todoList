import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolistsApi";
import {Dispatch} from "redux";

export let todoListId1 = v1()
export let todoListId2 = v1()
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
            // return [{id: action.todoListID, title: action.title, filter: 'all', addedDate: '', order: 1}, ...state]
            return [{...action.todolist,filter:"all"}, ...state]
        }
        case 'UPDATE-TODOLIST': {
            return state.map(m => m.id === action.todoListID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-FILTER-TODOLIST': {

            return state.map(m => m.id === action.todoListID ? {...m, filter: action.value} : m)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(m => {
                return {...m, filter: 'all'}
            })
        }
        default:
            return state
    }
}

export type MainType = removeTodolistType | AddNewTodolistType
    | updateTodoListACType
    | changeFilterTodoListAC
    | setTodoListsType

export type removeTodolistType = ReturnType<typeof removeTodolist>
export const removeTodolist = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST', todoListID
    } as const
}

export type AddNewTodolistType = ReturnType<typeof addNewTodolist>
export const addNewTodolist = (todolist:TodolistType) => {
    return {
        type: 'ADD-TODOLIST', todolist
    } as const
}


type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todoListID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST', todoListID, title
    } as const
}

type changeFilterTodoListAC = ReturnType<typeof changeFilterTodoListAC>
export const changeFilterTodoListAC = (todoListID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST', todoListID, value
    } as const
}

export type setTodoListsType = ReturnType<typeof setTodoLists>
export const setTodoLists = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS', todolists
    } as const
}

export const fetchTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => dispatch(setTodoLists(res.data)))
    }
}

export const removeTodoListTC = (todoListID:string) => (dispatch:Dispatch)=>{
    return todolistsApi.deleteTodolist(todoListID)
        .then(res =>{
            dispatch(removeTodolist(todoListID))
        })
}

export const addNewTodolistTC = (title:string) => (dispatch:Dispatch)=>{
    return todolistsApi.createTodolist(title)
        .then(res =>{
            dispatch(addNewTodolist(res.data.data.item))
        })
}