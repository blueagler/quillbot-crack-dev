import { useMemo, useState, useCallback, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';
import { Fragment } from 'preact';

import IconButton from '@mui/material/IconButton';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { message } from 'message';

import useLoadServer from './useLoadServer';

export default memo(function () {

  const [popover, setPopover] = useState(null);

  const open = useMemo(() => !!popover, [popover]);

  const handleOpen = useCallback(event => setPopover(event.currentTarget), []);

  const handleClose = useCallback(() => setPopover(null), []);

  const status = useLoadServer();


  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <CloudSyncIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={popover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List
          subheader={<ListSubheader>{message.server.title}</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              {status.premium.status === 'avaliable' ? <DoneIcon color='success' /> : <CloseIcon color='error' />}
            </ListItemIcon>
            <ListItemText primary={message.server.premium} secondary={status.premium.status === 'unavaliable' ? `${status.premium.error}` : status.premium.status} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {status.announcement.status === 'avaliable' ? <DoneIcon color='success' /> : <CloseIcon color='error' />}
            </ListItemIcon>
            <ListItemText primary={message.server.announcement} secondary={status.announcement.status === 'unavaliable' ? `${status.announcement.error}` : status.announcement.status} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {status.verify.status === 'avaliable' ? <DoneIcon color='success' /> : <CloseIcon color='error' />}
            </ListItemIcon>
            <ListItemText primary={message.server.verify} secondary={status.verify.status === 'unavaliable' ? `Error: ${status.verify.error}` : status.verify.status} />
          </ListItem>
        </List>
      </Popover>

    </Fragment>
  )
})