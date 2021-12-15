import {TasksType} from "../App";
import {AddNewTodolistType, removeTodolistType, setTodoListsType} from "./todoListsReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "../store";

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
                ...state,
                [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {
                    ...m,
                    ...action.model
                } : m)
            }
        }
        // case 'CHANGE-SELECT-TASK': {
        //     return {
        //         ...state,
        //         [action.todoListID]: state[action.todoListID].map(m => m.id === action.id ? {
        //             ...m,
        //             status: action.status
        //         } : m)
        //     }
        // }
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

type MainType = AddNewTodolistType | removeTodolistType
    | removeTaskType
    | addNewTaskType
    | updateTaskType
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
export const updateTask = (todoListID: string, id: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK', todoListID, id, model
    } as const
}

// type UpdateTaskType = ReturnType<typeof UpdateTask>
// export const UpdateTask = (todoListID: string, id: string, status: number) => {
//     return {
//         type: 'CHANGE-SELECT-TASK', todoListID, id, status
//     } as const
// }

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

export const addNewTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addNewTask(res.data.data.item))
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

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootState) => {

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

