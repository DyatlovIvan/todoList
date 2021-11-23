import style from "../todoList.module.css";
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditableSpanType = {
    title: string
    isDone?: boolean
    callBack: (title: string) => void
}
export const EditableSpan = React.memo( ({title, isDone, callBack, ...props}: EditableSpanType) => {
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
            <TextField value={newTitle} onChange={onChangeHandler} className={isDone ? style.isDone : ''} onBlur={editFalse}
                    autoFocus/>:
            <span onDoubleClick={editTrue} className={isDone ? style.isDone : ''}>{title}</span>
    )
})