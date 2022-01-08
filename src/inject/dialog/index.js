import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { closeDialog } from 'store/dialog/action';

export default function () {
  const dispatch = useDispatch();

  const dialog = useSelector(store => store.dialog || {});

  const handleClose = () => dispatch(closeDialog());

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
    >
      <DialogTitle>
        {dialog.title || ''}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialog.content || ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          dialog.actions && dialog.actions.map(action =>
            <Button
              onClick={() => { action.onClick(); handleClose() }}
              key={action.label}
            >
              {action.label}
            </Button>
          )
        }
      </DialogActions>
    </Dialog>

  )
}