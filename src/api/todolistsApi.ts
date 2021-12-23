import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd7bfc3c8-2c2d-429a-afe3-69f3367ec679'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses{
    New,
    InProgress,
    Complete,
    Draft
}

export enum TaskPriorities{
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    description: string
    startDate: string
    deadline: string
    addedDate: string
    order: number
    priority: TaskPriorities
    todoListId: string
}

type GetTaskResponseType = {
    items: Array<TaskType>
    error: string|null
    totalCount: number
}


export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
//api
export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string){
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`,{title:title})
    },
    deleteTask(todolistId:string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,model:UpdateTaskModelType){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    }
}