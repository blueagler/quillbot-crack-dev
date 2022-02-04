import { memo } from "preact/compat";
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { closeDialog } from 'store/dialog/action';

export default memo(function () {
  const dispatch = useDispatch();

  const dialog = useSelector(store => store.dialog || {});

  const handleClose = useCallback(() => dispatch(closeDialog()), []);

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
})