import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksReducer} from "../../features/TodolistsList/Todolist/tasksReducer";
import {TodoListsReducer} from "../../features/TodolistsList/Todolist/todoListsReducer";
import {v1} from "uuid";
import {AppRootState} from "../../App/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsApi";
import {AppReducer} from "../../App/appReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    Tasks: TasksReducer,
    TodoLists: TodoListsReducer,
    App: AppReducer
})

const initialGlobalState: AppRootState = {
    TodoLists: [
        {id: "todolistId1", title:"What to learn", filter: 'all',entityStatus:'idle',addedDate:'',order:1},
        {id: "todolistId2", title:"What to buy", filter: 'all',entityStatus:'idle',addedDate:'',order:1}

    ] ,
    Tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                description:'',startDate:'',deadline:'',addedDate:'',order:0,
                priority:TaskPriorities.Low,todoListId:"todolistId1"},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                description:'',startDate:'',deadline:'',addedDate:'',order:0,
                priority:TaskPriorities.Low,todoListId:"todolistId1"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New,
                description:'',startDate:'',deadline:'',addedDate:'',order:0,
                priority:TaskPriorities.Low,todoListId:"todolistId2"},
            {id: v1(), title: "React Book", status: TaskStatuses.New,
                description:'',startDate:'',deadline:'',addedDate:'',order:0,
                priority:TaskPriorities.Low,todoListId:"todolistId2"}
        ]
    },
    App:{
        error:null,
        status:'idle'
    }
};


export const storyBookStore = createStore(rootReducer, initialGlobalState,applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}