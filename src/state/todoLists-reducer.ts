import {todoListsType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}


export  const todoListsReducer = (state:Array<todoListsType>, action:ActionType) =>{
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return state.filter(el => el.id !== action.todoListID);
        }
        case 'ADD-TODOLIST':{
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(m => m.id === action.todoListID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(el => el.id === action.todoListID ? {...el, filter: action.value} : el)
        }
        default: return state
    }
}


export const RemoveTodolistAC = (todolistId:string) => {
    return { type: 'REMOVE-TODOLIST', todoListID: todolistId}
}
export const AddTodolistAC = (title: string,todolistId: string) => {
    return { type: 'ADD-TODOLIST', title: title ,todolistId:todolistId}
}

