import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";



type AddItemFormType = {
    callBack: (title: string) => void
    disabled:boolean
}

export const AddItemForm = React.memo( ({callBack,disabled=false,...props}: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            callBack(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }

        callBack(newTaskTitle);
        setNewTaskTitle('');
    }
    return (
        <div>

            <TextField label={'type text'}
                       value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressTitleHandler}
                       error={!!error}
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton onClick={onClickTitleHandler} color={'primary'} disabled={disabled}>
                <ControlPoint/>
            </IconButton>
        </div>

    )
})