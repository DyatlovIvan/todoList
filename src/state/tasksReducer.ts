import {TasksType} from "../App";
import {v1} from "uuid";
import {AddNewTodoListACType, removeTodoListACType} from "./todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistsApi";

const initialState:TasksType = {

}

export const TasksReducer = (state: TasksType = initialState, action: MainType): TasksType => {
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
            return {...state, [action.todoListID]: [{id: action.newTaskID, title: action.title, status: TaskStatuses.New,
                    description:'',startDate:'',deadline:'',addedDate:'',order:0,
                priority:TaskPriorities.Low,todoListId:action.todoListID}, ...state[action.todoListID]]}
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

type MainType = AddNewTodoListACType | removeTodoListACType | removeTaskType | addNewTaskType |
    updateTaskType|changeSelectTaskType

type removeTaskType = ReturnType<typeof removeTask>
export const removeTask = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK', todoListID, id
    } as const
}

type addNewTaskType = ReturnType<typeof addNewTask>
export const addNewTask = (todoListID: string, title: string) => {
    return {
        type: 'ADD-NEW-TASK', todoListID, newTaskID:v1(), title
    } as const
}

type updateTaskType = ReturnType<typeof updateTask>
export const updateTask = (todoListID: string, id: string, title: string) => {
    return {
        type: 'UPDATE-TASK', todoListID, id, title
    } as const
}

type changeSelectTaskType = ReturnType<typeof changeSelectTask>
export const changeSelectTask = (todoListID: string, id: string, isDone: boolean)=>{
    return{
        type:'CHANGE-SELECT-TASK',todoListID,id,isDone
    }as const
}