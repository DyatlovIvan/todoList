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

type CreateTodolistResponseType = {

    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type DeleteTodolistResponseType = {

}
export const todolistsApi = {
    getTodolists() {
        return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    },
    deleteTodolist(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
    }
}