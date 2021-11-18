import {FilterValuesType, todoListsType} from "../App";
import {v1} from "uuid";

export let todoListId1 = v1()
export let todoListId2 = v1()
const initialState:Array<todoListsType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]

export const TodoListReducer = (state:Array<todoListsType> = initialState,action:MainType):Array<todoListsType>=>{
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return  state.filter(el => el.id !== action.todoListID)
        }
        case 'ADD-TODOLIST':{
            return [{id:action.todoListID, title:action.title, filter: 'all'},...state]
        }
        case 'UPDATE-TODOLIST':{
            return  state.map(m => m.id === action.todoListID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-FILTER-TODOLIST':{

            return  state.map(m => m.id === action.todoListID ? {...m, filter: action.value} : m)
        }
        default: return state
    }
}

export type MainType = removeTodoListACType|AddNewTodoListACType|updateTodoListACType|changeFilterTodoListAC

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID:string)=>{
    return{
        type: 'REMOVE-TODOLIST',todoListID
    }as const
}

export type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export const addNewTodoListAC = (title:string)=>{
    return{
        type:'ADD-TODOLIST',title, todoListID:v1()
    }as const
}

type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todoListID:string, title:string)=>{
    return{
        type:'UPDATE-TODOLIST',todoListID,title
    }as const
}

type changeFilterTodoListAC = ReturnType<typeof changeFilterTodoListAC>
export  const changeFilterTodoListAC = (todoListID:string,value:FilterValuesType)=>{
    return{
        type:'CHANGE-FILTER-TODOLIST',todoListID,value
    }as const
}