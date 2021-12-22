import {TasksType} from "../../../App/App";
import {AddNewTodolistType, removeTodolistType, setTodoListsType} from "./todoListsReducer";
import {TaskType, todolistsApi, UpdateTaskModelType} from "../../../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "../../../App/store";
import {setError, setStatus} from "../../../App/appReducer";

const initialState: TasksType = {}

export const TasksReducer = (state: TasksType = initialState, action: MainType): TasksType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {[action.todolist.id]: [], ...state}
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
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(m => m.id === action.id ? {...m, ...action.model} : m)
            }
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todoListID]: action.tasks}
        }
        default:
            return state
    }
}

type MainType =
    | AddNewTodolistType
    | removeTodolistType
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addNewTask>
    | ReturnType<typeof updateTask>
    | setTodoListsType
    | ReturnType<typeof setTask>

//action
export const removeTask = (todoListID: string, id: string) => ({type: 'REMOVE-TASK', todoListID, id}) as const

export const addNewTask = (task: TaskType) => ({type: 'ADD-NEW-TASK', task}) as const

export const updateTask = (todoListID: string, id: string, model: UpdateDomainTaskModelType) => ({type: 'UPDATE-TASK', todoListID, id, model}) as const

export const setTask = (tasks: Array<TaskType>, todoListID: string) => ({type: 'SET-TASKS', tasks, todoListID}) as const

//thunk
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
        todolistsApi.getTasks(todoListID)
            .then((res) => {
                dispatch(setTask(res.data.items, todoListID))
                dispatch(setStatus('succeeded'))
            })
    }

export const removeTaskTC = (todoListID: string, id: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTask(todoListID, id))
        })
}

export const addNewTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if(res.data.resultCode===0){
                dispatch(addNewTask(res.data.data.item))
                dispatch(setStatus('succeeded'))
            }else{
                if(res.data.messages.length){
                    dispatch(setError(res.data.messages[0]))
                }else{
                    dispatch(setError('Some error'))
                }
                dispatch(setStatus('failed'))
            }


        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return(dispatch: Dispatch, getState: () => AppRootState) => {

        const currentTask = getState().Tasks[todolistId].find(f => f.id === taskId);
        if (!currentTask) {
            console.warn('Task not found')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: currentTask.title,
            description: currentTask.description,
            status: currentTask.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline,
            ...domainModel
        }
        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTask(todolistId, taskId, domainModel))
            })
    }
}

