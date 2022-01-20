import {combineReducers} from "redux";
import {TodoListsReducer} from "../features/TodolistsList/Todolist/todoListsReducer";
import {TasksReducer} from "../features/TodolistsList/Todolist/tasksReducer";
import {AppReducer} from "./appReducer";
import {AuthReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    TodoLists: TodoListsReducer,
    Tasks: TasksReducer,
    App: AppReducer,
    Login: AuthReducer
})
export type AppRootState = ReturnType<typeof rootReducer>

//export const store = createStore(rootReducer,applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store