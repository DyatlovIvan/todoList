import {
    addNewTodoListAC,
    changeFilterTodoListAC, FilterValuesType,
    removeTodoListAC, TodolistDomainType,
    TodoListsReducer,
    updateTodoListAC
} from './todoListsReducer';
import {v1} from 'uuid';


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate:'', order:1, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate:'', order:1, filter: "all"}
    ]

    const endState = TodoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId = v1();
    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all"},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all"}
    ]

   // const endState = TodoListReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle,todolistId:todolistId})
    const endState = TodoListsReducer(startState, addNewTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all"},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all"}
    ]

    const endState = TodoListsReducer(startState, updateTodoListAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",addedDate:'', order:1, filter: "all"},
        {id: todolistId2, title: "What to buy",addedDate:'', order:1, filter: "all"}
    ]

    const endState = TodoListsReducer(startState, changeFilterTodoListAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



