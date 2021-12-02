import {combineReducers, createStore} from "redux";
import {TodoListsReducer} from "./state/todoListsReducer";
import {TasksReducer} from "./state/tasksReducer";

const rootReducer = combineReducers({
    TodoLists:TodoListsReducer,
    Tasks:TasksReducer
})
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store