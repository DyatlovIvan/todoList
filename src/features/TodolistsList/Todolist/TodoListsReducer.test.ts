import {
    addNewTodolist,
    changeFilterTodoListAC, FilterValuesType,
    removeTodolist, setTodoLists, TodolistDomainType,
    TodoListsReducer,
    updateTodolistTitle
} from './todoListsReducer';
import {v1} from 'uuid';


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate:'', order:1, filter: "all",entityStatus:'idle'},
        {id: todolistId2, title: "What to buy", addedDate:'', order:1, filter: "all",entityStatus:'idle'}
    ]

    const endState = TodoListsReducer(startState, removeTodolist({todoListID:todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId = v1();
    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all",entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all",entityStatus:'idle'}
    ]

   // const endState = TodoListReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle,todolistId:todolistId})
    const endState = TodoListsReducer(startState, addNewTodolist({todolist:{id:todolistId,title:'new todolist',addedDate:'', order:1}}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('new todolist');
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all",entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all",entityStatus:'idle'}
    ]

    const endState = TodoListsReducer(startState, updateTodolistTitle({todoListID:todolistId2, title:newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all",entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all",entityStatus:'idle'}
    ]

    const endState = TodoListsReducer(startState, changeFilterTodoListAC({todoListID:todolistId2,filter:newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('set todolists',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    const state: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all",entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all",entityStatus:'idle'}
    ]
    const endState = TodoListsReducer([],setTodoLists({todoLists:state}))
    expect(endState.length).toBe(2)

})



