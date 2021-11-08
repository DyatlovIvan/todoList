import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./todoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddNewTodoListAC,
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

export function AppWithRedux() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState,Array<todoListsType>>(state=>state.TodoLists)
    const tasks = useSelector<AppRootState,TasksType>(state=>state.Tasks)

    // let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
    //     {id: todoListId1, title: 'What to learn', filter: 'all'},
    //     {id: todoListId2, title: 'What to buy', filter: 'all'}
    // ])

    // let [tasks, setTasks] = useState<TasksType>({
    //     [todoListId1]: [
    //         {id: v1(), title: 'HTML', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false},
    //         {id: v1(), title: 'Angular', isDone: false},
    //         {id: v1(), title: 'CSS', isDone: false}
    //
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: 'Milk', isDone: false},
    //         {id: v1(), title: 'Bread', isDone: false},
    //         {id: v1(), title: 'Beer', isDone: false},
    //     ]
    // })



    const AddNewTaskHandler = (title: string) => {

        //const newTaskListID = v1()
        dispatch(AddNewTodoListAC(title))
        //dispatch(AddNewTodoListAC(newTaskListID))
        // setTodoLists([{id: NewTaskListID, title: title, filter: 'all'}, ...todoLists])
        //setTasks({[NewTaskListID]: [], ...tasks})

    }

    const removeTaskList = (todoListID: string) => {
        // setTodoLists(todoLists.filter(el => el.id !== todoListID));
        // delete tasks[todoListID];
        // setTasks({...tasks})

        dispatch(removeTodoListAC(todoListID))
    }

    const updateTodoList = (todoListID: string, title: string) => {
        // setTodoLists(todoLists.map(m => m.id === todoListID ? {...m, title: title} : m))
        dispatch(updateTodoListAC(todoListID, title))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        // setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
        dispatch(changeFilterTodoListAC(todoListID, value))
    }

    function removeTask(todoListID: string, id: string) {
        //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(f => f.id !== id)})
        dispatch(removeTaskAC(todoListID, id))
    }

    function addNewTask(todoListID: string, title: string) {
        //setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
        //const newTaskID = v1()
        dispatch(addNewTaskAC(todoListID, title))
    }

    const updateTask = (todoListID: string, id: string, title: string) => {
        //setTasks({...tasks, [todoListID]: tasks[todoListID].map(m => m.id === id ? {...m, title: title} : m)})
        dispatch(updateTaskAC(todoListID, id, title))
    }

    function changeSelectTask(todoListID: string, id: string, isDone: boolean) {
        //setTasks({...tasks, [todoListID]: tasks[todoListID].map(m => m.id === id ? {...m, isDone: isDone} : m)})
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

export default AppWithRedux;
