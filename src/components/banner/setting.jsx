import { memo } from 'preact/compat';
import { message } from "message";
import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useCallback } from 'preact/hooks';
import { useStorage } from 'utils/localStorage';

import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

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
      <Drawer
        anchor='right'
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
        }}>
          <Typography variant="h5">
            {message.panel.title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
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
                  <ListItem key={id}>
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
      </Drawer>
    </Fragment>
  )
})