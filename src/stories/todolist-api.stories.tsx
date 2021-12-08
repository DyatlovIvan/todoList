import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolistsApi";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd7bfc3c8-2c2d-429a-afe3-69f3367ec679'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('Yoyo')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '41b9b96d-d010-4930-a3ad-e1e20f2df699'
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd19ffde6-f246-45b5-8d43-32268d26c631'
        const title = 'yoyoyo'
        todolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd19ffde6-f246-45b5-8d43-32268d26c631'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd19ffde6-f246-45b5-8d43-32268d26c631'
        const taskId = ''
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd19ffde6-f246-45b5-8d43-32268d26c631'
        const title = 'blabla'
        todolistsApi.createTask(todolistId,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const model = {
            title:'title',
            description: 'hey',
            status: 1,
            priority: 1,
            startDate: '01.01.21',
            deadline: '02.02.21'
        }
        const todolistId = 'd19ffde6-f246-45b5-8d43-32268d26c631'
        const taskId = ''
        todolistsApi.updateTask(todolistId,taskId,model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


