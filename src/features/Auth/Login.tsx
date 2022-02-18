import {useFormik} from "formik";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {useNavigate} from "react-router-dom";
import React from "react";
import {LoginParamsType} from "../../api/todolistsApi";
import {selectIsLoggedIn} from "./selectors";

export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (isLoggedIn){
        navigate('/')
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType,'captcha'>> = {};
            if (!values.email) {
                    errors.email = 'Email is required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                    errors.password = 'Password is required';
            }else if (values.password.length < 3) {
                errors.password = 'Invalid password';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div>{formik.errors.email}</div>}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div>{formik.errors.password}</div>}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox/>}
                                              {...formik.getFieldProps('rememberMe')}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>


    )
}