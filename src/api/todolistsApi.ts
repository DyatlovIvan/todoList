import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd7bfc3c8-2c2d-429a-afe3-69f3367ec679'
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// type CreateTodolistResponseType = {
//
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteUpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export const todolistsApi = {
    getTodolists() {
        return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<ResponseType<{item:TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    },
    deleteTodolist(id: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
    },
    getTasks(todolistId:string) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },
}