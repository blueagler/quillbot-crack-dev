import { message } from "../message";
import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useConfig } from '../config';

import { styled } from '@mui/material/styles';

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
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
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
                      <Android12Switch
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
