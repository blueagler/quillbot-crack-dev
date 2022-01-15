import { message } from "../message";
import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useConfig } from '../config';

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

export default function () {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useConfig();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleConfig = (id) => {
    const newConfig = config.map(item => {
      if (item.id === id) {
        item.enabled = !item.enabled;
      }
      return item;
    })
    setConfig(newConfig);
  };

  const [tab, setTab] = useState('setting');
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
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
                config.map(({ id, enabled, label, description }) =>
                  <ListItem>
                    <ListItemButton onClick={() => handleToggleConfig(id)}>
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
}
