import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const ConfirmDialog = forwardRef(({ message, userID,profileID, onConfirm }, ref) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const openDialog = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm({ actionConfirmed: true, userID: userID,profileID: profileID });
        }
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        openDialog,
    }));

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});
