import { type } from 'os';
import { title } from 'process';
import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./todoList";


export type FilterValuesType = 'all' | 'completed' | 'active';

type TasksType = {[key:string]:Array<TaskType>}

type todoLists = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<todoLists>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'CSS', isDone: false}
    
        ],
        [todoListId2]:[
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ]
    })

    const removeTaskList = (todoListID:string)=>{
        setTodoLists(todoLists.filter(el=>el.id!==todoListID));
        delete tasks[todoListID];
        setTasks({...tasks})
    }

    function removeTask(todoListID:string, id: string) {
        setTasks({...tasks,[todoListID]:tasks[todoListID].filter(f=>f.id!==id)})
    }

    function addNewTask(todoListID:string, title: string) {
        setTasks({...tasks,[todoListID]:[ {id: v1(), title: title, isDone: true},...tasks[todoListID]]})
    }

    function changeSelectTask(todoListID:string, id: string, isDone: boolean) {
      setTasks({...tasks,[todoListID]:tasks[todoListID].map(m=>m.id === id? {...m,isDone:isDone}:m)})
    }

    function changeFilter(todoListID:string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el=>el.id===todoListID?{...el,filter: value}:el))
    }

    return (
        <div className="App">
            {todoLists.map(el => {

                let tasksForTodoList = tasks[el.id];
                if (el.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone == true)
                }
                if (el.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone == false)
                }
                    return (
                        <TodoList
                            key={el.id}
                            todoListID={el.id}
                            title={el.title}
                            task={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            changeSelectTask={changeSelectTask}
                            filter={el.filter}
                            removeTaskList = {removeTaskList}
                        />
                    )
                }
            )
            }


        </div>
    );
}

export default App;
