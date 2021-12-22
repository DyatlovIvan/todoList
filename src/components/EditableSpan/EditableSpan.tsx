import style from "../../features/TodolistsList/Todolist/todoList.module.css";
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import {TaskStatuses} from "../../api/todolistsApi";


type EditableSpanType = {
    title: string
    status?: number
    callBack: (title: string) => void
}
export const EditableSpan = React.memo( ({title, status, callBack, ...props}: EditableSpanType) => {
    console.log('EditableSpan')
    const [edit, setEdit] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const editTrue = () => setEdit(true)
    const editFalse = () => {
        setEdit(false)
        callBack(newTitle.trim())
    }
    return (
        edit ?
            <TextField value={newTitle} onChange={onChangeHandler} className={status===TaskStatuses.Complete ? style.isDone : ''} onBlur={editFalse}
                    autoFocus/>:
            <span onDoubleClick={editTrue} className={status===TaskStatuses.Complete ? style.isDone : ''}>{title}</span>
    )
})