import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";


type propsType = {
    title: string
    task: Array<TaskType>
    removeTask: (value: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (value: string) => void
}

export type TaskType = {
    id: string, title: string, isDone: boolean
}

export const TodoList = (props: propsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressTitleHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.charCode ===13 && e.ctrlKey){
            props.addNewTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const onClickTitleHandler = () => {
        props.addNewTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onClickAll = () => {
        props.changeFilter('all')
    }
    const onClickActive = () => {
        props.changeFilter('active')
    }
    const onClickCompleted = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressTitleHandler}
                />
                <button onClick={onClickTitleHandler}>+
                </button>

            </div>
            <ul>
                {props.task.map(t => {
                    const onClickTask = () => {
                        props.removeTask(t.id)
                    }
                    return (<li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={onClickTask}>x
                        </button>
                    </li>)
                })}


            </ul>
            <div>
                <button onClick={onClickAll}>all</button>
                <button onClick={onClickActive}>active</button>
                <button onClick={onClickCompleted}>completed</button>
            </div>
        </div>

    )
}