import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../../state/tasksReducer";
import {TodoListsReducer} from "../../state/todoListsReducer";
import {v1} from "uuid";
import {AppRootState} from "../../store";

const rootReducer = combineReducers({
    Tasks: TasksReducer,
    TodoLists: TodoListsReducer
})

const initialGlobalState: AppRootState = {
    TodoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    Tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};


export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}