import {TasksType} from "../App";

export const TaskReducer = (state: TasksType, action: MainType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK-FOR-NEW-TODOLIST': {
            return {[action.NewTaskListID]: [], ...state}
        }
        case 'REMOVE-TASK-FOR-TODOLIST': {
            return {...state}
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

type MainType = addTaskForNewTodolistACType | removeTaskForTodolistACType | removeTaskACType | addNewTaskACType |
    updateTaskACType|changeSelectTaskACType

type addTaskForNewTodolistACType = ReturnType<typeof addTaskForNewTodolistAC>
export const addTaskForNewTodolistAC = (NewTaskListID: string) => {
    return {
        type: 'ADD-TASK-FOR-NEW-TODOLIST', NewTaskListID
    } as const
}

type removeTaskForTodolistACType = ReturnType<typeof removeTaskForTodolistAC>
export const removeTaskForTodolistAC = () => {
    return {
        type: 'REMOVE-TASK-FOR-TODOLIST'
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK', todoListID, id
    } as const
}

type addNewTaskACType = ReturnType<typeof addNewTaskAC>
export const addNewTaskAC = (todoListID: string, newTaskID: string, title: string) => {
    return {
        type: 'ADD-NEW-TASK', todoListID, newTaskID, title
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