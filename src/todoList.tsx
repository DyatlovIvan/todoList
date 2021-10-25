import React, {ChangeEvent, FormEvent} from 'react';
import {FilterValuesType} from "./App";
import style from './todoList.module.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, createTheme, IconButton, ThemeProvider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Checkbox} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff9800'
        }
    }
})


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
    updateTodoList: (todoListID: string, title: string) => void
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
    const updateTodoListHandler = (newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle)
    }

    const mappingTasks = props.task.map(t => {

        return (
            <div>
                {/*<input type="checkbox" onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>*/}
                <Checkbox onChange={(e) => onChangeSelectHandler(t.id, e)} checked={t.isDone}/>
                <EditableSpan title={t.title} isDone={t.isDone} callBack={(newTitle) => updateTask(t.id, newTitle)}/>

                <IconButton onClick={() => onClickRemoveTask(t.id)}>
                    <Delete/>
                </IconButton>
            </div>)
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(newTitle) => updateTodoListHandler(newTitle)}/>
                <IconButton onClick={onClickRemoveTaskList}>
                    <Delete/>
                </IconButton>

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
            <div>

                {mappingTasks}

            </div>
            <div>

                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler('all')
                        }}>all
                </Button>

                <ThemeProvider theme={theme}>
                    <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                            onClick={() => {
                                onClickFilterHandler('active')
                            }}>active
                    </Button>
                </ThemeProvider>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler('completed')
                        }}>completed
                </Button>

            </div>
        </div>

    )
}
