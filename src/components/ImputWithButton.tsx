import style from "../todoList.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type ImputWithButtonType = {
    addNewTask: (todoListID:string, title: string)=>void
    todoListID:string
}

export const ImputWithButton = (props:ImputWithButtonType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addNewTask(props.todoListID, newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }
        props.addNewTask(props.todoListID, newTaskTitle);
        setNewTaskTitle('');
    }

    return (

        <div>
            <input value={newTaskTitle}
                   onChange={onChangeTitleHandler}
                   onKeyPress={onKeyPressTitleHandler}
                   className={error ? style.error : ''}
            />
            <button onClick={onClickTitleHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
}