import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList";

export type FilterValuesType = 'all' | 'completed' | 'active';

// export function Counter(){
//     let arr = useState(5);
//     let state = arr[0];
//     let setState = arr[1];
//
//     return <div onClick={() =>{setState(state+1)}}>{state}</div>
//
// }
export function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')


    function removeTask(id: number) {
        let filterTask = tasks.filter(t => t.id !== id);
        setTasks(filterTask);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone == true)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone == false)
    }
    return (
        <div className="App">

            <TodoList title={`What to learn 1`}
                      task={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
