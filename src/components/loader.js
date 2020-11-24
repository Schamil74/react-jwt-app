import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 99,
    },
}))

const Loader = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CircularProgress color="primary" size={100} />
        </div>
    )
}

export default Loader
