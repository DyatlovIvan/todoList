import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListsReducer} from "./state/todoListsReducer";
import {TasksReducer} from "./state/tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    TodoLists:TodoListsReducer,
    Tasks:TasksReducer
})
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk));

// @ts-ignore
window.store = store