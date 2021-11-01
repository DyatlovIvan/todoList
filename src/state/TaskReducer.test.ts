import {v1} from "uuid";
import {TasksType} from "../App";
import {addNewTaskAC, removeTaskAC, TaskReducer, updateTaskAC} from "./TaskReducer";
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
    const endState = TaskReducer(startState,removeTaskAC(todoListId1, '1'))
    expect(endState[todoListId1].length).toBe(5)
})

 test('add task',()=>{
     const endState = TaskReducer(startState,addNewTaskAC(todoListId1, '7', 'new task!'))
     expect(endState[todoListId1].length).toBe(7)
 })

test ('update task',()=>{
    const endState = TaskReducer(startState,updateTaskAC(todoListId1, '1', 'hey'))
    expect(endState[todoListId1][0].title).toBe('hey')
})