import {TasksType} from "../../../App/App";
import {
    addNewTodolist,
    removeTodolist,
    setTodoLists,

} from "./todoListsReducer";
import {TaskType, todolistsApi, UpdateTaskModelType} from "../../../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "../../../App/store";
import {RequestStatusType, setStatus} from "../../../App/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksType = {}

export const setTaskTC = createAsyncThunk('tasks/fetchTasks', (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: RequestStatusType.Loading}))
    todolistsApi.getTasks(todoListID)
        .then((res) => {
            thunkAPI.dispatch(setTask({tasks: res.data.items, todoListID: todoListID}))
            thunkAPI.dispatch(setStatus({status: RequestStatusType.Succeeded}))
        })
})

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
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
    }
})

export const TasksReducer = slice.reducer
//action creators
export const {removeTask, addNewTask, updateTask, setTask} = slice.actions

//thunk
export const _setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: RequestStatusType.Loading}))
    todolistsApi.getTasks(todoListID)
        .then((res) => {
            dispatch(setTask({tasks: res.data.items, todoListID: todoListID}))
            dispatch(setStatus({status: RequestStatusType.Succeeded}))
        })
}

export const removeTaskTC = (todoListID: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: RequestStatusType.Loading}))
    todolistsApi.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTask({todoListID, id}))
            dispatch(setStatus({status: RequestStatusType.Succeeded}))
        })
}

export const addNewTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: RequestStatusType.Loading}))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTask({task: res.data.data.item}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatus({status: RequestStatusType.Succeeded}))
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
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(setStatus({status: RequestStatusType.Loading}))
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
                    dispatch(updateTask({todoListID: todolistId, id: taskId, model: domainModel}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
            .finally(() => {
                dispatch(setStatus({status: RequestStatusType.Succeeded}))
            })
    }
}

