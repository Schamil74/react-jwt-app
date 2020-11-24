import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const emailPattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
        },
    },
    link: {
        color: '#3f51b5',
    },
}))

const Auth = props => {
    const classes = useStyles()

    const { title, btnText, onSubmit, redirectText, redirectLink } = props
    const {
        handleSubmit,
        errors,
        control,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            name: '',
            password: '',
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful])

    return (
        <>
            <Typography align="center" variant="h6" component="h1" gutterBottom>
                {title}
            </Typography>
            <Box mb={5}>
                <form
                    autoComplete="off"
                    className={classes.root}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        as={TextField}
                        name="email"
                        control={control}
                        defaultValue=""
                        label="Email"
                        fullWidth
                        rules={{
                            required: true,
                            pattern: emailPattern,
                        }}
                        helperText={
                            errors.email?.type === 'required'
                                ? 'Email не должен быть пустым'
                                : errors.email?.type === 'pattern'
                                ? 'Email должен быть валидным'
                                : ''
                        }
                        error={!!errors.email}
                    />

                    <Controller
                        as={TextField}
                        name="password"
                        control={control}
                        defaultValue=""
                        label="Пароль"
                        fullWidth
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        helperText={
                            errors.password?.type === 'required'
                                ? 'Пароль не может быть пустым'
                                : errors.password?.type === 'minLength'
                                ? 'Пароль должен быть не менее 6 символов'
                                : ''
                        }
                        error={!!errors.password}
                    ></Controller>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                    >
                        {btnText}
                    </Button>
                </form>
            </Box>

            <Typography align="center">
                <Link className={classes.link} to={redirectLink}>
                    {redirectText}
                </Link>
            </Typography>
        </>
    )
}

export default Auth
