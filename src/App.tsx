import React, {useCallback, useEffect} from 'react';
import './App.css';
import { TodoList} from "./todoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addNewTodolistTC,
    changeFilterTodoListAC, fetchTodolists, FilterValuesType, removeTodoListTC,
    TodolistDomainType, updateTodolistTitleTC
} from "./state/todoListsReducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addNewTaskTC} from "./state/tasksReducer";
import {TaskType} from "./api/todolistsApi";

export type TasksType = { [key: string]: Array<TaskType> }

export const App = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.TodoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.Tasks)

    useEffect(()=>{
     dispatch(fetchTodolists())
    },[])

    const addNewTodolistHandler = useCallback((title: string) => {
        dispatch(addNewTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListTC(todolistId))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterTodoListAC(todolistId, value))
    }, [dispatch])

    const addNewTaskHandler = useCallback((todolistId: string, title: string) => {
        dispatch(addNewTaskTC(todolistId, title))
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
                    <AddItemForm callBack={addNewTodolistHandler}/>
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
                                            removeTodolist={removeTodolist}
                                            updateTodolistTitle={updateTodolistTitle}
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
