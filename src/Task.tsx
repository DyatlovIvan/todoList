import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeSelectTask, removeTask, updateTask} from "./state/tasksReducer";
import {TaskStatuses, TaskType} from "./api/todolistsApi";

type TaskPropsType = {
    task: TaskType
    todoListID: string
}
export const Task = React.memo(({task, todoListID}: TaskPropsType) => {
    const dispatch = useDispatch();
    const onChangeSelectHandler = useCallback((id: string, e: ChangeEvent<HTMLInputElement>) => {
        debugger
        const isDone = e.currentTarget.checked;
        dispatch(changeSelectTask(todoListID, id, isDone?TaskStatuses.Complete:TaskStatuses.New))
    }, [dispatch])

    const updateTaskHandler = useCallback((id: string, newTitle: string) => {
        dispatch(updateTask(todoListID, id, newTitle))
    }, [dispatch])

    const onClickRemoveTask = useCallback((id: string) => {
        dispatch(removeTask(todoListID, id));
    }, [dispatch]);
    return (
        <div>
            <Checkbox
                onChange={(e) => onChangeSelectHandler(task.id, e)}
                checked={task.status === TaskStatuses.Complete}
            />
            <EditableSpan title={task.title} status={task.status}
                          callBack={(newTitle) => updateTaskHandler(task.id, newTitle)}/>

            <IconButton onClick={() => onClickRemoveTask(task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )

})