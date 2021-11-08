import {combineReducers, createStore} from "redux";
import {TodoListReducer} from "./state/TodoListsReducer";
import {TaskReducer} from "./state/TaskReducer";

const rootReducer = combineReducers({
    TodoLists:TodoListReducer,
    Tasks:TaskReducer
})
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store