import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskTC} from "../tasksReducer";
import {TaskStatuses, TaskType} from "../../../../api/todolistsApi";

type TaskPropsType = {
    task: TaskType
    todoListID: string
}
export const Task = React.memo(({task, todoListID}: TaskPropsType) => {
    const dispatch = useDispatch();
    const onChangeTaskStatusHandler = useCallback((id: string, e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked;
        dispatch(updateTaskTC(todoListID, id, {status: isDone ? TaskStatuses.Complete : TaskStatuses.New}))
    }, [dispatch])

    const updateTaskHandler = useCallback((id: string, newTitle: string) => {
        dispatch(updateTaskTC(todoListID, id, {title: newTitle}))
    }, [dispatch])

    const onClickRemoveTask = useCallback((id: string) => {
        dispatch(removeTaskTC(todoListID, id))
    }, [dispatch]);
    return (
        <div>
            <Checkbox
                onChange={(e) => onChangeTaskStatusHandler(task.id, e)}
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