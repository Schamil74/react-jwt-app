import { Box, Container, CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Alert from './alert'
import Loader from '../components/loader.js'
import Login from '../pages/login'
import Main from '../pages/main'
import Register from '../pages/register'
import {
    thunkUserData,
    setIsClearError,
    setIsClearRegistered,
} from '../store/actions/jwtActions'

function App() {
    const dispatch = useDispatch()
    const jwtReducer = state => state.jwtReducer
    const { isError, isFetching, isAuthorized, isRegistered } = useSelector(
        jwtReducer
    )

    const clientId = localStorage.getItem('client_id')

    const routes =
        clientId && isAuthorized ? (
            <>
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </>
        ) : (
            <>
                <Route path="/singup" component={Register} />
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </>
        )

    useEffect(() => {
        if (clientId) {
            dispatch(thunkUserData(clientId))
        }
    }, [clientId])

    return (
        <>
            <CssBaseline />
            <Box
                height="100vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <CssBaseline />

                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        {isFetching ? (
                            <Loader />
                        ) : (
                            <>
                                <Switch>{routes}</Switch>

                                <Alert
                                    alert={isError}
                                    action={setIsClearError}
                                />
                                <Alert
                                    alert={isRegistered}
                                    action={setIsClearRegistered}
                                />
                            </>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default App
