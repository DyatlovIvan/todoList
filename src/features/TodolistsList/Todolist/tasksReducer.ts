import {TasksType} from "../../../App/App";
import {
    addNewTodolist,
    AddNewTodolistType,
    removeTodolist,
    removeTodolistType, setTodoLists,
    setTodoListsType
} from "./todoListsReducer";
import {TaskType, todolistsApi, UpdateTaskModelType} from "../../../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "../../../App/store";
import {setStatus} from "../../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";

const initialState: TasksType = {}


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todoListID: string, id: string }>) {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addNewTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTask(state, action: PayloadAction<{ todoListID: string, id: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTask(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListID: string }>) {
            state[action.payload.todoListID] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addNewTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.todoListID];
        });
        builder.addCase(setTodoLists, (state, action) => {
            action.payload.todoLists.forEach((tl:any)=>{
                state[tl.id] = []
            })
        });
    }
})

export const TasksReducer = slice.reducer
//action creators
export const {removeTask,addNewTask,updateTask,setTask} = slice.actions

// export const TasksReducer = (state: TasksType = initialState, action: MainType): TasksType => {
//     switch (action.type) {
//         case 'ADD-TODOLIST': {
//             return {[action.todolist.id]: [], ...state}
//         }
//         case 'REMOVE-TODOLIST': {
//             const newState = {...state}
//             delete newState[action.todoListID];
//             return newState
//         }
//         case 'REMOVE-TASK': {
//             return {...state, [action.todoListID]: state[action.todoListID].filter(f => f.id !== action.id)}
//         }
//         case 'ADD-NEW-TASK': {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         }
//         case 'UPDATE-TASK': {
//             return {
//                 ...state, [action.todoListID]: state[action.todoListID]
//                     .map(m => m.id === action.id ? {...m, ...action.model} : m)
//             }
//         }
//         case "SET-TODOLISTS": {
//             const copyState = {...state}
//             action.todolists.forEach(el => {
//                 copyState[el.id] = []
//             })
//             return copyState
//         }
//         case "SET-TASKS": {
//             return {...state, [action.todoListID]: action.tasks}
//         }
//         default:
//             return state
//     }
// }

// type MainType =
//     | AddNewTodolistType
//     | removeTodolistType
//     | ReturnType<typeof removeTask>
//     | ReturnType<typeof addNewTask>
//     | ReturnType<typeof updateTask>
//     | setTodoListsType
//     | ReturnType<typeof setTask>

//action
// export const removeTask = (todoListID: string, id: string) => ({type: 'REMOVE-TASK', todoListID, id}) as const
//
// export const addNewTask = (task: TaskType) => ({type: 'ADD-NEW-TASK', task}) as const
//
// export const updateTask = (todoListID: string, id: string, model: UpdateDomainTaskModelType) => ({type: 'UPDATE-TASK', todoListID, id, model}) as const
//
// export const setTask = (tasks: Array<TaskType>, todoListID: string) => ({type: 'SET-TASKS', tasks, todoListID}) as const

//thunk
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
        todolistsApi.getTasks(todoListID)
            .then((res) => {
                dispatch(setTask({tasks:res.data.items, todoListID:todoListID}))
                dispatch(setStatus({status:'succeeded'}))
            })
    }

export const removeTaskTC = (todoListID: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
    todolistsApi.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTask({todoListID, id}))
            dispatch(setStatus({status:'succeeded'}))
        })
}

export const addNewTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTask({task:res.data.data.item}))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error,dispatch)
        })
        .finally(()=>{
            dispatch(setStatus({status:'succeeded'}))
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
        dispatch(setStatus({status:'loading'}))
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
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({todoListID:todolistId, id:taskId, model:domainModel}))
                } else {
                 handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error,dispatch)
            })
            .finally(()=>{
                dispatch(setStatus({status:'succeeded'}))
            })
    }
}

