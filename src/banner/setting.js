import { message } from "../message";
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useConfig } from '../config';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import SettingIcon from '@mui/icons-material/Settings';

export default function () {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useConfig();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (id) => {
    const newConfig = config.map(item => {
      if (item.id === id) {
        item.enabled = !item.enabled;
      }
      return item;
    })
    setConfig(newConfig);
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
          <List>
            {
              config.map(({ id, enabled, label, description }) =>
                <ListItem>
                  <ListItemText primary={label} secondary={description} />
                  <Switch
                    edge="end"
                    onChange={() => handleToggle(id)}
                    checked={enabled}
                  />
                </ListItem>
              )
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {message.setting.close}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
