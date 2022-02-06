import { useSelector } from 'react-redux';
import { useMemo, useState, useCallback } from 'preact/hooks';
import { memo } from 'preact/compat';
import { Fragment } from 'preact';

import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import Popover from '@mui/material/Popover';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useStorage } from 'utils/localStorage';
import { message } from 'message';

export default memo(function () {

  const [popover, setPopover] = useState(null);

  const open = useMemo(() => !!popover, [popover]);

  const [storage, setStorage] = useStorage();

  const handleOpen = useCallback(event => setPopover(event.currentTarget), []);

  const handleClose = useCallback(() => setPopover(null), []);

  const announcementData = useSelector(store => store.remoteConfig.announcements || {});

  const [list, ignoredList] = useMemo(() => {
    if (announcementData.length > 0) {
      const list = announcementData.filter(({ id, ignorable }) => !ignorable || !storage.announcement.ignores.includes(id));
      const ignoredList = announcementData.filter(({ id }) => storage.announcement.ignores.includes(id));
      return [list, ignoredList];
    } else {
      return [[], []];
    }
  }, [announcementData, storage.announcement.ignores]);

  const ignore = useCallback(id => setStorage({
    ...storage,
    announcement: {
      ...storage.announcement,
      ignores: [...storage.announcement.ignores, id]
    }
  }), [storage]);

  const [tab, setTab] = useState('list');

  const handleChangeTab = useCallback((_, newValue) => setTab(newValue), []);

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={list.length} color='error'>
          <NotificationsIcon />
        </Badge>
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
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} variant="fullWidth">
              <Tab icon={<NotificationsActiveIcon />} label={message.announcement.list.title} value="list" />
              <Tab icon={<NotificationsPausedIcon />} label={message.announcement.ignoredList.title} value="ignoredList" />
            </TabList>
          </Box>
          <TabPanel value="list" sx={{ padding: 0 }}>
            {
              list.length > 0 && list.map(({ id, title, content, ignorable, links }) =>
                <Accordion key={id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography dangerouslySetInnerHTML={{ __html: title }} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card elevation={0}>
                      <CardContent>
                        <Typography dangerouslySetInnerHTML={{ __html: content }} />
                      </CardContent>
                      <CardActions>
                        {
                          links.length > 0 && links.map(({ href, text }) => <Button href={href}>{text}</Button>)
                        }
                        {
                          ignorable && <Button onClick={() => ignore(id)}>{message.announcement.ignore}</Button>
                        }
                      </CardActions>
                    </Card>
                  </AccordionDetails>
                </Accordion>
              )
            }
          </TabPanel>
          <TabPanel value="ignoredList" sx={{ padding: 0 }}>
            {
              ignoredList.length > 0 && ignoredList.map(({ id, title, content, links }) =>
                <Accordion key={id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography dangerouslySetInnerHTML={{ __html: title }} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card elevation={0}>
                      <CardContent>
                        <Typography dangerouslySetInnerHTML={{ __html: content }} />
                      </CardContent>
                      <CardActions>
                        {
                          links.length > 0 && links.map(({ href, text }) => <Button href={href}>{text}</Button>)
                        }
                      </CardActions>
                    </Card>
                  </AccordionDetails>
                </Accordion>
              )
            }
          </TabPanel>

        </TabContext>
      </Popover>

    </Fragment>
  )
})