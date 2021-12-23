import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, createTheme, IconButton, ThemeProvider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from '../../../api/todolistsApi';
import {FilterValuesType, TodolistDomainType} from "./todoListsReducer";
import {useDispatch} from "react-redux";
import {setTaskTC} from "./tasksReducer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff9800'
        }
    }
})

type propsType = {
    todoList: TodolistDomainType
    task: Array<TaskType>
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addNewTask: (todoListID: string, value: string) => void
    removeTodolist: (todoListID: string) => void
    updateTodolistTitle: (todoListID: string, title: string) => void
    demo?: boolean
}


export const TodoList = React.memo(({demo = false, ...props}: propsType) => {
    console.log('todolist')
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(setTaskTC(props.todoList.id))

    }, [])

    const onClickFilterHandler = useCallback((value: FilterValuesType) => props.changeFilter(props.todoList.id, value), [props.changeFilter, props.todoList.id]);
    // const onAllFilterHandler = () => props.changeFilter(props.todoListID, 'all');
    // const onActiveFilterHandler = () => props.changeFilter(props.todoListID,'active' );
    // const onCompletedFilterHandler = () => props.changeFilter(props.todoListID, 'completed');

    const AddTaskHandler = useCallback((title: string) => {
        props.addNewTask(props.todoList.id, title)
    }, [props.addNewTask, props.todoList.id])


    const onClickRemoveTaskList = () => {
        props.removeTodolist(props.todoList.id)
    }

    const updateTodolistHandler = useCallback((newTitle: string) => {
        props.updateTodolistTitle(props.todoList.title, newTitle)
    }, [props.updateTodolistTitle, props.todoList.id])

    let tasksForTodoList = props.task
    if (props.todoList.filter === 'active') {
        tasksForTodoList = props.task.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todoList.filter === 'completed') {
        tasksForTodoList = props.task.filter(t => t.status === TaskStatuses.Complete)
    }

    const mappingTasks = tasksForTodoList.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  todoListID={props.todoList.id}
            />
        )
    })

    return (
        <div>

            <h3>
                <EditableSpan title={props.todoList.title} callBack={updateTodolistHandler}/>
                <IconButton onClick={onClickRemoveTaskList} disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm callBack={AddTaskHandler}
                         disabled={props.todoList.entityStatus === 'loading'}
            />

            <div>
                {mappingTasks}
            </div>
            <div>

                <Button variant={props.todoList.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler('all')
                        }}>all
                </Button>

                <ThemeProvider theme={theme}>
                    <Button color={'primary'} variant={props.todoList.filter === 'active' ? 'contained' : 'text'}
                            onClick={() => {
                                onClickFilterHandler('active')
                            }}>active
                    </Button>
                </ThemeProvider>
                <Button color={"secondary"} variant={props.todoList.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler('completed')
                        }}>completed
                </Button>
            </div>
        </div>
    )
})

