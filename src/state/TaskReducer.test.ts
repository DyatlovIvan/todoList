import {v1} from "uuid";
import {TasksType} from "../App";
import {
    addNewTask,
    changeSelectTask,
    removeTask,
    TaskReducer,
    updateTask
} from "./TaskReducer";
const todoListId1 = 'todoListId1';
const todoListId2 =  'todoListId2';
let startState: TasksType
beforeEach(() => {
    startState = {
        [todoListId1]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'Angular', isDone: false},
            {id: '6', title: 'CSS', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Bread', isDone: false},
            {id: '3', title: 'Beer', isDone: false},
        ]
    }
})


test('remove task',()=>{
    const endState = TaskReducer(startState,removeTask(todoListId1, '1'))
    expect(endState[todoListId1].length).toBe(5)
})

 test('add task',()=>{
     const endState = TaskReducer(startState,addNewTask(todoListId1,'new task!'))
     expect(endState[todoListId1].length).toBe(7);
     expect(endState[todoListId2].length).toBe(3);
     expect(endState[todoListId1][0].id).toBeDefined();
     expect(endState[todoListId1][0].title).toBe('new task!');
     expect(endState[todoListId1][0].isDone).toBe(false);
 })

test ('update task',()=>{
    const endState = TaskReducer(startState,updateTask(todoListId1, '1', 'hey'))
    expect(endState[todoListId1][0].title).toBe('hey')
})

test ('change is done',()=>{
    const endState = TaskReducer(startState,changeSelectTask(todoListId1, '1', false))
    expect(endState[todoListId1][0].isDone).toBe(false)
    expect(endState[todoListId2][0].isDone).toBe(false)
})
