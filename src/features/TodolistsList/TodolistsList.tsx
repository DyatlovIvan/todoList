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

export const TodolistsList = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.TodoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.Tasks)

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

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
    return (
        <>
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
        </>
    )
}