import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, createTheme, IconButton, ThemeProvider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

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
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addNewTask: (todoListID: string, value: string) => void
    filter: FilterValuesType
    removeTaskList: (todoListID: string) => void
    updateTodoList: (todoListID: string, title: string) => void
}

export type TaskType = {
    id: string, title: string, isDone: boolean
}

export const TodoList = React.memo((props: propsType) => {
    console.log('todolist')

    const onClickFilterHandler = useCallback((value: FilterValuesType) => props.changeFilter(props.todoListID, value), [props.changeFilter, props.todoListID]);
    // const onAllFilterHandler = () => props.changeFilter(props.todoListID, 'all');
    // const onActiveFilterHandler = () => props.changeFilter(props.todoListID,'active' );
    // const onCompletedFilterHandler = () => props.changeFilter(props.todoListID, 'completed');

    const AddTaskHandler = useCallback((title: string) => {
        props.addNewTask(props.todoListID, title)
    }, [props.addNewTask, props.todoListID])


    const onClickRemoveTaskList = () => {
        props.removeTaskList(props.todoListID)
    }

    const updateTodoListHandler = useCallback((newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle)
    }, [props.updateTodoList, props.todoListID])

    let tasksForTodoList = props.task
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }

    const mappingTasks = tasksForTodoList.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  todoListID={props.todoListID}
            />
        )
    })

    return (
        <div>

            <h3>
                <EditableSpan title={props.title} callBack={updateTodoListHandler}/>
                <IconButton onClick={onClickRemoveTaskList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm callBack={AddTaskHandler}/>

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
})

