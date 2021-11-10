import {TasksType} from "../App";
import {v1} from "uuid";
import {AddNewTodoListACType, removeTodoListACType, todoListId1, todoListId2} from "./TodoListsReducer";

const initialState:TasksType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'CSS', isDone: false}

    ],
    [todoListId2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'Beer', isDone: false},
    ]
}

export const TaskReducer = (state: TasksType = initialState, action: MainType): TasksType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {[action.todoListID]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.todoListID];
            return newState
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].filter(f => f.id !== action.id)}
        }
        case 'ADD-NEW-TASK': {
            return {...state, [action.todoListID]: [{id: action.newTaskID, title: action.title, isDone: false}, ...state[action.todoListID]]}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {...m, title: action.title} : m)}
        }
        case 'CHANGE-SELECT-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {...m, isDone: action.isDone} : m)}
        }

        default:
            return state
    }
}

type MainType = AddNewTodoListACType | removeTodoListACType | removeTaskACType | addNewTaskACType |
    updateTaskACType|changeSelectTaskACType

// type AddNewTodoListACType = ReturnType<typeof AddNewTodoListAC>
// export const AddNewTodoListAC = (title:string) => {
//     return {
//         type: 'ADD-TODOLIST',title,todoListID:v1()
//     } as const
// }

// type removeTodoListACType = ReturnType<typeof removeTodoListAC>
// export const removeTodoListAC = (todoListID:string) => {
//     return {
//         type: 'REMOVE-TODOLIST',todoListID
//     } as const
// }

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK', todoListID, id
    } as const
}

type addNewTaskACType = ReturnType<typeof addNewTaskAC>
export const addNewTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-NEW-TASK', todoListID, newTaskID:v1(), title
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListID: string, id: string, title: string) => {
    return {
        type: 'UPDATE-TASK', todoListID, id, title
    } as const
}

type changeSelectTaskACType = ReturnType<typeof changeSelectTaskAC>
export const changeSelectTaskAC = (todoListID: string, id: string, isDone: boolean)=>{
    return{
        type:'CHANGE-SELECT-TASK',todoListID,id,isDone
    }as const
}