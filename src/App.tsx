import React, {useCallback} from 'react';
import './App.css';
import { TodoList} from "./todoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addNewTodoListAC,
    changeFilterTodoListAC, FilterValuesType,
    removeTodoListAC, TodolistDomainType,
    updateTodoListAC
} from "./state/todoListsReducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addNewTask} from "./state/tasksReducer";
import {TaskType} from "./api/todolistsApi";


export type TasksType = { [key: string]: Array<TaskType> }


export const App = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.TodoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.Tasks)


    const AddNewTaskHandler = useCallback((title: string) => {
        dispatch(addNewTodoListAC(title))
    }, [dispatch])

    const removeTaskList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])

    const updateTodoList = useCallback((todoListID: string, title: string) => {
        dispatch(updateTodoListAC(todoListID, title))
    }, [dispatch])

    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeFilterTodoListAC(todoListID, value))
    }, [dispatch])

    const addNewTaskHandler = useCallback((todoListID: string, title: string) => {
        dispatch(addNewTask(todoListID, title))
    }, [dispatch])

    // const removeTask = useCallback((todoListID: string, id: string) => {
    //     dispatch(removeTaskAC(todoListID, id))
    // }, [dispatch])

    // const updateTask = useCallback((todoListID: string, id: string, title: string) => {
    //     dispatch(updateTaskAC(todoListID, id, title))
    // }, [dispatch])

    // const changeSelectTask = useCallback((todoListID: string, id: string, isDone: boolean) => {
    //     dispatch(changeSelectTaskAC(todoListID, id, isDone))
    // }, [dispatch])

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid style={{padding: '20px'}}>
                    <AddItemForm callBack={AddNewTaskHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(el => {

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={el.id}
                                            todoListID={el.id}
                                            title={el.title}
                                            task={tasks[el.id]}
                                            changeFilter={changeFilter}
                                            addNewTask={addNewTaskHandler}
                                            filter={el.filter}
                                            removeTaskList={removeTaskList}
                                            updateTodoList={updateTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }
                    )
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
