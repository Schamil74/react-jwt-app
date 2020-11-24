import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClearState } from '../store/actions/jwtActions.js'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
    },
}))

const Main = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const jwtReducer = state => state.jwtReducer
    const { isAuthorized } = useSelector(jwtReducer)

    const onClick = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('client_id')

        dispatch(setClearState())
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar src={isAuthorized.avatar}></Avatar>}
                title={isAuthorized.name}
                subheader={isAuthorized.surname}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {'ID: ' + isAuthorized.client_id}
                    <br />
                    {'Email: ' + isAuthorized.email}
                    <br />
                    {'Phone: ' + isAuthorized.phone && isAuthorized.phone}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <Button
                    onClick={onClick}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Выйти
                </Button>
            </CardActions>
        </Card>
    )
}

export default Main
