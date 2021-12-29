import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolistsApi";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializeApp, RequestStatusType} from "./appReducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/authReducer";

export type TasksType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}
export const App = ({demo = false}: PropsType) => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootState, RequestStatusType>(state => state.App.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.App.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.Login.isLoggedIn)

    useEffect(()=>{dispatch(initializeApp())},[])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%',textAlign:'center',width:'100%'}}>
                <CircularProgress/>
            </div>
        )}
    const logoutHandler = () =>{
        dispatch(logoutTC())
    }
    return (
        <BrowserRouter>
            <div className="App">

                <AppBar position="static">
                    <ErrorSnackbars/>
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
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
}
export default App;