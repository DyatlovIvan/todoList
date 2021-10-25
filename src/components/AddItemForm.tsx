import style from "../todoList.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";



type AddItemFormType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callBack(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const onClickTitleHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Error')
            return
        }

        props.callBack(newTaskTitle);
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
            />
            <IconButton onClick={onClickTitleHandler} color={'primary'}>
                <ControlPoint/>
            </IconButton>
            {/*{error && <div className={style.errorMessage}>{error}</div>}*/}

        </div>

    )
}