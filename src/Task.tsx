import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./todoList";

type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (todoListID: string, value: string) => void
    changeSelectTask: (todoListID: string, id: string, isDone: boolean) => void
    updateTask: (todoListID: string, id: string, title: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onChangeSelectHandler = useCallback( (tId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeSelectTask(props.todoListID, tId, e.currentTarget.checked)
    },[ props.changeSelectTask,props.todoListID,props.task.id])
    const updateTask = (id: string, newTitle: string) => {
        props.updateTask(props.todoListID, id, newTitle)
    }
    const onClickRemoveTask = (ID: string) => props.removeTask(props.todoListID, ID);
    return (
        <div>
            <Checkbox onChange={(e) => onChangeSelectHandler(props.task.id, e)} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} isDone={props.task.isDone}
                          callBack={(newTitle) => updateTask(props.task.id, newTitle)}/>

            <IconButton onClick={() => onClickRemoveTask(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )

})