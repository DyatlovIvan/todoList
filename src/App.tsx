import React, {useState} from 'react';
import {v1} from 'uuid';
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
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ]);
    console.log(tasks);
    let [filter, setFilter] = useState<FilterValuesType>('all')


    function removeTask(id: string) {
        let filterTask = tasks.filter(t => t.id !== id);
        setTasks(filterTask);
    }

    function addNewTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }



    function changeSelectTask(id: string, isDone: boolean) {
        setTasks(tasks.map(el=>el.id===id?{...el,isDone:isDone}:el))
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
                      addNewTask={addNewTask}
                      changeSelectTask={changeSelectTask}
                      filter = {filter}
            />

        </div>
    );
}

export default App;
