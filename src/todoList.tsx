import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import style from './todoList.module.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


type propsType = {
    todoListID: string
    title: string
    task: Array<TaskType>
    removeTask: (todoListID: string, value: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addNewTask: (todoListID: string, value: string) => void
    changeSelectTask: (todoListID: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTaskList: (todoListID: string) => void
    updateTask: (todoListID: string, id: string, title: string) => void
    updateTodoList:(todoListID:string, title:string)=>void
}

export type TaskType = {
    id: string, title: string, isDone: boolean
}

export const TodoList = (props: propsType) => {


    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(props.todoListID, value);
    // const onAllFilterHandler = () => props.changeFilter(props.todoListID, 'all');
    // const onActiveFilterHandler = () => props.changeFilter(props.todoListID,'active' );
    // const onCompletedFilterHandler = () => props.changeFilter(props.todoListID, 'completed');

    const AddTaskHandler = (title: string) => {
        props.addNewTask(props.todoListID, title)
    }
    const onClickRemoveTask = (ID: string) => props.removeTask(props.todoListID, ID);

    const onChangeSelectHandler = (tId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeSelectTask(props.todoListID, tId, e.currentTarget.checked)
    }

    const onClickRemoveTaskList = () => {
        props.removeTaskList(props.todoListID)
    }
    const updateTask = (id: string, newTitle: string) => {
        props.updateTask(props.todoListID, id, newTitle)
    }
    const updateTodoListHandler = (newTitle:string) =>{
        props.updateTodoList(props.todoListID,newTitle)
    }

    const mappingTasks = props.task.map(t => {

        return (
            <li>
                <input type="checkbox" onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>
                <EditableSpan title={t.title} isDone={t.isDone} callBack={(newTitle) => updateTask(t.id, newTitle)}/>

                <button onClick={() => onClickRemoveTask(t.id)}>x</button>
            </li>)
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(newTitle)=>updateTodoListHandler(newTitle)}/>
                <button onClick={onClickRemoveTaskList}>x</button>

            </h3>

            <AddItemForm callBack={(title) => AddTaskHandler(title)}/>
            {/*<div>*/}
            {/*    <input value={newTaskTitle}*/}
            {/*        onChange={onChangeTitleHandler}*/}
            {/*        onKeyPress={onKeyPressTitleHandler}*/}
            {/*        className={error ? style.error : ''}*/}
            {/*    />*/}
            {/*    <button onClick={onClickTitleHandler}>+</button>*/}
            {/*    {error && <div className={style.errorMessage}>{error}</div>}*/}

            {/*  */}

            {/*</div>*/}
            <ul>

                {mappingTasks}

            </ul>
            <div>
                <button className={props.filter === 'all' ? style.activeFilter : ''}
                        onClick={() => {
                            onClickFilterHandler('all')
                        }}>all
                </button>
                <button className={props.filter === 'active' ? style.activeFilter : ''}
                        onClick={() => {
                            onClickFilterHandler('active')
                        }}>active
                </button>
                <button className={props.filter === 'completed' ? style.activeFilter : ''}
                        onClick={() => {
                            onClickFilterHandler('completed')
                        }}>completed
                </button>

            </div>
        </div>

    )
}