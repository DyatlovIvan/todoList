import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./todoList";


export type FilterValuesType = 'all' | 'completed' | 'active';
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

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListId2]:[
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
        ]
    })

    const removeTaskList = (todoListID:string)=>{
        setTodoLists(todoLists.filter(el=>el.id!==todoListID));
        delete tasks[todoListID];
        setTasks({...tasks})
    }

    function removeTask(id: string,todoListID:string) {
        tasks[todoListID] = tasks[todoListID].filter(el=>el.id !==id);
        setTasks({...tasks})
    }

    function addNewTask(title: string,todoListID:string) {
        let newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListID] = [newTask,...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType,todoListID:string) {
        setTodoLists(todoLists.map(el=>el.id===todoListID?{...el,filter: value}:el))
    }


    function changeSelectTask(id: string, isDone: boolean,todoListID:string) {
        tasks[todoListID] = tasks[todoListID].map(el=>el.id===id?{...el, isDone: isDone} : el)
        setTasks({...tasks})
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
