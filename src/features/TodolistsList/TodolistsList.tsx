import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../App/store";
import {
    addNewTodolistTC,
    changeFilterTodoListAC,
    fetchTodolists,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./Todolist/todoListsReducer";
import React, {useCallback, useEffect} from "react";
import {addNewTaskTC} from "./Todolist/tasksReducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/todoList";
import {TasksType} from "../../App/App";
import {useNavigate} from "react-router-dom";
import {URLS} from "../../shared/urls";

type PropsType = {
    demo?:boolean
}
export const TodolistsList = ({demo = false}:PropsType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.TodoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.Tasks)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.Login.isLoggedIn)

    if (!isLoggedIn){
        navigate(URLS.LOGIN)
    }

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTodolists())
    }, [demo,dispatch])

    const addNewTodolistHandler = useCallback((title: string) => {
        dispatch(addNewTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListTC(todolistId))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeFilterTodoListAC({todoListID:todolistId,filter: filter}))
    }, [dispatch])

    const addNewTaskHandler = useCallback((todolistId: string, title: string) => {
        dispatch(addNewTaskTC(todolistId, title))
    }, [dispatch])

    return (
        <>
            <Grid style={{padding: '20px'}}>
                <AddItemForm callBack={addNewTodolistHandler}
                             disabled = {false}
                />
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(el => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={el.id}
                                        todoList = {el}
                                        task={tasks[el.id]}
                                        changeFilter={changeFilter}
                                        addNewTask={addNewTaskHandler}
                                        removeTodolist={removeTodolist}
                                        updateTodolistTitle={updateTodolistTitle}
                                        demo = {demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    }
                )
                }
            </Grid>
        </>
    )
}