import {v1} from "uuid";
import {TodolistType} from "../api/todolistsApi";

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
            return [{id: action.todoListID, title: action.title, filter: 'all',addedDate:'',order:1}, ...state]
        }
        case 'UPDATE-TODOLIST': {
            return state.map(m => m.id === action.todoListID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-FILTER-TODOLIST': {

            return state.map(m => m.id === action.todoListID ? {...m, filter: action.value} : m)
        }
        default:
            return state
    }
}

export type MainType = removeTodoListACType | AddNewTodoListACType | updateTodoListACType | changeFilterTodoListAC

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST', todoListID
    } as const
}

export type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export const addNewTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST', title, todoListID: v1()
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