import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addNewTodoListAC,
    changeFilterTodoListAC,
    removeTodoListAC,
    updateTodoListAC
} from "./state/TodoListsReducer";
import {
    addNewTaskAC,
    changeSelectTaskAC,
    removeTaskAC,
    updateTaskAC
} from "./state/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";


export type FilterValuesType = 'all' | 'completed' | 'active';

export type TasksType = { [key: string]: Array<TaskType> }

export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState,Array<todoListsType>>(state=>state.TodoLists)
    const tasks = useSelector<AppRootState,TasksType>(state=>state.Tasks)


    const AddNewTaskHandler = (title: string) => {
        dispatch(addNewTodoListAC(title))
    }

    const removeTaskList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }

    const updateTodoList = (todoListID: string, title: string) => {
        dispatch(updateTodoListAC(todoListID, title))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatch(changeFilterTodoListAC(todoListID, value))
    }

    function removeTask(todoListID: string, id: string) {
        dispatch(removeTaskAC(todoListID, id))
    }

    function addNewTask(todoListID: string, title: string) {
        dispatch(addNewTaskAC(todoListID, title))
    }

    const updateTask = (todoListID: string, id: string, title: string) => {
        dispatch(updateTaskAC(todoListID, id, title))
    }

    function changeSelectTask(todoListID: string, id: string, isDone: boolean) {
        dispatch(changeSelectTaskAC(todoListID, id, isDone))
    }

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
                    <AddItemForm callBack={(title) => AddNewTaskHandler(title)}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(el => {

                            let tasksForTodoList = tasks[el.id];
                            if (el.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (el.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={el.id}
                                            todoListID={el.id}
                                            title={el.title}
                                            task={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addNewTask={addNewTask}
                                            changeSelectTask={changeSelectTask}
                                            filter={el.filter}
                                            removeTaskList={removeTaskList}
                                            updateTask={updateTask}
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
