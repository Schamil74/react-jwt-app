import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@material-ui/core'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Alert = props => {
    const { alert, action } = props

    const dispatch = useDispatch()

    const [open, setOpen] = useState(alert.has)

    useEffect(() => {
        setOpen(alert.has)
    }, [alert.has])

    const handleClose = () => {
        dispatch(action())
    }
    return (
        <Dialog onClose={handleClose} open={open} keepMounted>
            <DialogTitle>
                <Typography align="center">{alert.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{alert.msg}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default Alert
