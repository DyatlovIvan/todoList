import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import style from './todoList.module.css'


type propsType = {
    todoListID: string
    title: string
    task: Array<TaskType>
    removeTask: (todoListID:string, value: string) => void
    changeFilter: (todoListID:string, value: FilterValuesType) => void
    addNewTask: (todoListID:string, value: string) => void
    changeSelectTask: (todoListID:string, id: string, isDone: boolean) => void
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
            props.addNewTask(props.todoListID, newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }
        props.addNewTask(props.todoListID, newTaskTitle);
        setNewTaskTitle('');
    }

    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(props.todoListID, value);
    const onClickRemoveTask = (ID: string) => props.removeTask(props.todoListID, ID);

    const onChangeSelectHandler = (tId: string, e: ChangeEvent<HTMLInputElement>)=> {
        props.changeSelectTask(props.todoListID, tId, e.currentTarget.checked)
    }

    const onClickRemoveTaskList = () =>{
        props.removeTaskList(props.todoListID)
    }
   
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
                        <li>
                            <input type="checkbox" onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>
                            <span className={t.isDone === true ? style.isDone : ''}>{t.title}</span>
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