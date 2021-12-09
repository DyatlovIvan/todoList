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
    const [title, setTitle] = useState<string>('')
    const onClickHandler = () => {
        todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Create</button>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onClickHandler = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete</button>
            {JSON.stringify(state)}
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Update</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onClickHandler = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Get</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const onClickHandler = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const onClickHandler = () => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input placeholder={'taskTitle'} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}
            />
            <button onClick={onClickHandler}>Create</button>
            <div> {JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTask = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

   const onClickHandler = () =>{
        todolistsApi.updateTask(todolistId, taskId, {
            title:title,
            description:description,
            status:status,
            priority:priority,
            startDate:'',
            deadline:''
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'taskId'} value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>

                <input placeholder={'title'} value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <input placeholder={'description'} value={description}
                       onChange={(e) => setDescription(e.currentTarget.value)}/>
                <input placeholder={'status'} value={status} type={"number"}
                       onChange={(e) => setStatus(+e.currentTarget.value)}/>
                <input placeholder={'priority'} value={priority}  type={"number"}
                       onChange={(e) => setPriority(+e.currentTarget.value)}/>
                <input placeholder={'startDate'} value={startDate}
                       onChange={(e) => setStartDate(e.currentTarget.value)}/>
                <input placeholder={'deadline'} value={deadline}
                       onChange={(e) => setDeadline(e.currentTarget.value)}/>
            </div>
            <button onClick={onClickHandler}>Update</button>
            {JSON.stringify(state)}
        </div>
    )
}


