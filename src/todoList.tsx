import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import style from './todoList.module.css'


type propsType = {
    title: string
    task: Array<TaskType>
    removeTask: (value: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (value: string) => void
    changeSelectTask: (id: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addNewTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }
        props.addNewTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onClickHandler = (value: FilterValuesType) => props.changeFilter(value);
    const onClickTask = (ID: string) => props.removeTask(ID);




    function onChangeSelectHandler(tid: any, e: ChangeEvent<HTMLInputElement>) {
        props.changeSelectTask(tid, e.currentTarget.checked)
    }

    // if call handler with arg (arg, arg no event), {() => handler(arg)}
    // if call handler without arg ( empty ), ={handler}

    return (
        <div>
            <h3>{props.title}</h3>
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
                        <li className={t.isDone === true?style.isDone:''}>
                            <input type="checkbox" onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                onClickTask(t.id)
                            }}>x
                            </button>
                        </li>)
                })}


            </ul>
            <div>
                <button className={props.filter === 'all'?style.activeFilter:''} onClick={() => {
                    onClickHandler('all')
                }}>all
                </button>
                <button className={props.filter === 'active'?style.activeFilter:''} onClick={() => {
                    onClickHandler('active')
                }}>active
                </button>
                <button className={props.filter === 'completed'?style.activeFilter:''} onClick={() => {
                    onClickHandler('completed')
                }}>completed
                </button>
            </div>
        </div>

    )
}