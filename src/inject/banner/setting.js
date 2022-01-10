import { message } from "message";
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingIcon from '@mui/icons-material/Settings';

export default function () {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const saveChanges = () => {

  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <SettingIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {message.setting.title}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {message.setting.cancel}
          </Button>
          <Button onClick={() => { saveChanges(); handleClose() }}>
            {message.setting.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
