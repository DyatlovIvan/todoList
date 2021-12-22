import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListsReducer} from "../features/TodolistsList/Todolist/todoListsReducer";
import {TasksReducer} from "../features/TodolistsList/Todolist/tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    TodoLists:TodoListsReducer,
    Tasks:TasksReducer
})
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk));

// @ts-ignore
window.store = store