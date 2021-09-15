import React from 'react';
import {FilterValuesType} from "./App";

type propsType={
    title:string
    task:Array<TaskType>
    removeTask:(value:number) => void
    changeFilter: (value:FilterValuesType)=>void
}

export type TaskType = {
    id: number, title: string, isDone: boolean
}

export const TodoList = (props:propsType) =>{
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(t =>{
                    return(<li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={()=>{props.removeTask(t.id)}}>x</button></li>)
                })}


            </ul>
            <div>
                <button onClick={() =>{props.changeFilter('all') }}>all</button>
                <button onClick={() =>{props.changeFilter('active') }}>active</button>
                <button onClick={() =>{props.changeFilter('completed') }}>completed</button>
            </div>
        </div>

    )
}