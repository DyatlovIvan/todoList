import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../../state/tasksReducer";
import {TodoListsReducer} from "../../state/todoListsReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
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

type AppRootState = ReturnType<typeof rootReducer>

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}