import { useSelector } from 'react-redux';
import { useMemo, useState, useCallback } from 'preact/hooks';
import { memo } from 'preact/compat';
import { Fragment } from 'preact';

import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Popover from '@mui/material/Popover';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { useStorage } from 'utils/localStorage';
import { message } from 'message';

export default memo(function () {

  const [popover, setPopover] = useState(null);

  const open = useMemo(() => !!popover, [popover]);

  const [storage, setStorage] = useStorage();

  const handleOpen = useCallback(event => setPopover(event.currentTarget), []);

  const handleClose = useCallback(() => setPopover(null), []);

  const announcementData = useSelector(store => store.remoteConfig.announcements || {});

  const announcementList = useMemo(() => {
    return announcementData.filter(({ id }) => !storage.announcement.ignores.includes(id));
  }, [announcementData, storage.announcement.ignores]);

  const ignore = useCallback(id => setStorage({
    ...storage,
    announcement: {
      ...storage.announcement,
      ignores: [...storage.announcement.ignores, id]
    }
  }), [storage]);

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={announcementList.length} color='error'>
          <AnnouncementIcon />
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
        {
          announcementList.map(({ id, title, content, link = false }) =>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card elevation={0}>
                  <CardContent>
                    <Typography>
                      {content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {
                      link && <Button href={link.href}>{link.text}</Button>
                    }
                    <Button onClick={() => ignore(id)}>{message.announcement.ignore}</Button>
                  </CardActions>
                </Card>
              </AccordionDetails>
            </Accordion>
          )
        }
      </Popover>

    </Fragment>
  )
})