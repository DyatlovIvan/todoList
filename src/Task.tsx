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
export const Task = React.memo(({task,todoListID,removeTask,changeSelectTask,updateTask}: TaskPropsType) => {
    const onChangeSelectHandler = useCallback( (tId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeSelectTask(todoListID, tId, e.currentTarget.checked)
    },[ changeSelectTask,todoListID,task.id])
    const updateTaskHandler = useCallback((id: string, newTitle: string) => {
        updateTask(todoListID, id, newTitle)
    },[])
    const onClickRemoveTask = useCallback((ID: string) => removeTask(todoListID, ID),[]);
    return (
        <div>
            <Checkbox onChange={(e) => onChangeSelectHandler(task.id, e)} checked={task.isDone}/>
            <EditableSpan title={task.title} isDone={task.isDone}
                          callBack={(newTitle) => updateTaskHandler(task.id, newTitle)}/>

            <IconButton onClick={() => onClickRemoveTask(task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )

})