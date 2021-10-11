import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import style from './todoList.module.css'


type propsType = {
    todoListID: string
    title: string
    task: Array<TaskType>
    removeTask: (value: string,todoListID:string) => void
    changeFilter: (value: FilterValuesType,todoListID:string) => void
    addNewTask: (value: string,todoListID:string) => void
    changeSelectTask: (id: string, isDone: boolean,todoListID:string) => void
    filter: FilterValuesType
    removeTaskList:(todoListID:string) => void
}

export type TaskType = {
    id: string, title: string, isDone: boolean
}

export const TodoList = (props: propsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addNewTask(newTaskTitle,props.todoListID);
            setNewTaskTitle('');
        }
    }
    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }
        props.addNewTask(newTaskTitle,props.todoListID);
        setNewTaskTitle('');
    }

    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value,props.todoListID);
    const onClickRemoveTask = (ID: string) => props.removeTask(ID,props.todoListID);

    const onChangeSelectHandler = (tId: string, e: ChangeEvent<HTMLInputElement>)=> {
        props.changeSelectTask(tId, e.currentTarget.checked,props.todoListID)
    }

    const onClickRemoveTaskList = () =>{
        props.removeTaskList(props.todoListID)
    }
    // if call handler with arg (arg, arg no event), {() => handler(arg)}
    // if call handler without arg ( empty ), ={handler}

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTaskList}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressTitleHandler}
                       className={error ? style.error : ''}
                />
                <button onClick={onClickTitleHandler}>+</button>
                {error && <div className={style.errorMessage}>{error}</div>}

            </div>
            <ul>
                {props.task.map(t => {

                    return (
                        <li className={t.isDone === true ? style.isDone : ''}>
                            <input type="checkbox" onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                onClickRemoveTask(t.id)
                            }}>x
                            </button>
                        </li>)
                })}


            </ul>
            <div>
                <button className={props.filter === 'all' ? style.activeFilter : ''}
                        onClick={() => {onClickFilterHandler('all')}}>all
                </button>
                <button className={props.filter === 'active' ? style.activeFilter : ''}
                        onClick={() => {onClickFilterHandler('active')}}>active
                </button>
                <button className={props.filter === 'completed' ? style.activeFilter : ''}
                        onClick={() => {onClickFilterHandler('completed')}}>completed
                </button>
            </div>
        </div>

    )
}