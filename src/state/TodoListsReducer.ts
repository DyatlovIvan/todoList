import {FilterValuesType, todoListsType} from "../App";


export const TodoListReducer = (state:Array<todoListsType>,action:MainType):Array<todoListsType>=>{
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return  state.filter(el => el.id !== action.todoListID)
        }
        case 'ADD-TODOLIST':{
            return [{id:action.NewTaskListID, title:action.title, filter: 'all'},...state]
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

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID:string)=>{
    return{
        type: 'REMOVE-TODOLIST',todoListID
    }as const
}

type AddNewTodoListACType = ReturnType<typeof AddNewTodoListAC>
export const AddNewTodoListAC = (NewTaskListID:string, title:string)=>{
    return{
        type:'ADD-TODOLIST',NewTaskListID, title
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