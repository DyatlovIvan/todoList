import {TasksType} from "../App";
import {v1} from "uuid";
import {AddNewTodoListACType, removeTodoListACType, setTodoListsType} from "./todoListsReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolistsApi";
import {Dispatch} from "redux";

const initialState: TasksType = {}

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
            debugger
            return {...state,[action.task.todoListId]:[action.task]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {
                    ...m,
                    title: action.title
                } : m)
            }
        }
        case 'CHANGE-SELECT-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {
                    ...m,
                    status: action.status
                } : m)
            }
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "SET-TYPE": {
            return {...state, [action.todoListID]: action.tasks}
        }
        default:
            return state
    }
}

type MainType = AddNewTodoListACType | removeTodoListACType
    | removeTaskType
    | addNewTaskType
    | updateTaskType
    | changeSelectTaskType
    | setTodoListsType
    | SetTaskType


type removeTaskType = ReturnType<typeof removeTask>
export const removeTask = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK', todoListID, id
    } as const
}

type addNewTaskType = ReturnType<typeof addNewTask>
export const addNewTask = (task: TaskType) => {
    return {
        type: 'ADD-NEW-TASK', task
    } as const
}

type updateTaskType = ReturnType<typeof updateTask>
export const updateTask = (todoListID: string, id: string, title: string) => {
    return {
        type: 'UPDATE-TASK', todoListID, id, title
    } as const
}

type changeSelectTaskType = ReturnType<typeof changeSelectTask>
export const changeSelectTask = (todoListID: string, id: string, status: number) => {
    return {
        type: 'CHANGE-SELECT-TASK', todoListID, id, status
    } as const
}

type SetTaskType = ReturnType<typeof setTask>
export const setTask = (tasks: Array<TaskType>, todoListID: string) => {
    return {
        type: 'SET-TYPE', tasks, todoListID
    } as const
}

export const setTaskTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(todoListID)
            .then((res) => {
                dispatch(setTask(res.data.items, todoListID))
            })
    }
}

export const removeTaskTC = (todoListID: string, id: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTask(todoListID, id))
        })
}

export const addNewTaskTC = (todoListID:string, title:string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todoListID,title)
        .then(res=>{
            dispatch(addNewTask(res.data.data.item))
        })
}