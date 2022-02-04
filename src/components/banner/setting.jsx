import { message } from "message";
import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useCallback } from 'preact/hooks';
import { memo } from "preact/compat";
import { useStorage } from 'utils/localStorage';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

export default memo(function () {
  const [open, setOpen] = useState(false);
  const [storage, setStorage] = useStorage();

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleToggleStorage = useCallback((id) => {
    const newStorage = storage.settings.map(item => {
      if (item.id === id) {
        item.enabled = !item.enabled;
      }
      return item;
    })
    setStorage({
      ...storage,
      settings: newStorage
    });
  }, [storage]);

  const [tab, setTab] = useState('setting');

  const handleChangeTab = useCallback((_, newValue) => setTab(newValue), []);

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
          {message.panel.title}
        </DialogTitle>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} variant="fullWidth">
              <Tab icon={<SettingIcon />} label={message.panel.setting.title} value="setting" />
              <Tab icon={<InfoIcon />} label={message.panel.about.title} value="about" />
            </TabList>
          </Box>
          <TabPanel value="setting" sx={{ padding: 0 }}>
            <List>
              {
                storage.settings.map(({ id, enabled, label, description }) =>
                  <ListItem>
                    <ListItemButton onClick={() => handleToggleStorage(id)}>
                      <ListItemText primary={label} secondary={description} />
                      <Switch
                        edge="end"
                        checked={enabled}
                      />
                    </ListItemButton>
                  </ListItem>

                )
              }
            </List>
          </TabPanel>
          <TabPanel value="about">

          </TabPanel>

        </TabContext>
        <DialogActions>
          <Button onClick={handleClose}>
            {message.panel.close}
          </Button>
        </DialogActions>
      </Dialog>

    </Fragment>
  )
})