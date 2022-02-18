import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {TaskType} from "../api/todolistsApi";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp, RequestStatusType} from "./appReducer";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Auth/Login";
import {logoutTC} from "../features/Auth/authReducer";
import {URLS} from "../shared/urls";
import {selectInitialized, selectStatus} from "./selectors";
import {authSelectors} from "../features/Auth";

export type TasksType = { [key: string]: Array<TaskType> }
type PropsType = {
    demo?: boolean
}


export const App = ({demo = false}: PropsType) => {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

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
        <HashRouter>
            <div className="App">

                <AppBar position="static">
                    <ErrorSnackbars/>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === RequestStatusType.Loading && <LinearProgress/>}
                </AppBar>
                <Container>
                    <Routes>
                        <Route path={URLS.BASE} element={<TodolistsList demo={demo}/>}/>
                        <Route path={URLS.LOGIN} element={<Login/>}/>
                    </Routes>
                </Container>

            </div>
        </HashRouter>
    );
}
export default App;