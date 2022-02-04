import { useSelector } from 'react-redux';
import { useMemo, useState, useCallback } from 'preact/hooks';
import { memo } from "preact/compat";
import { Fragment } from 'preact';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import AnnouncementIcon from '@mui/icons-material/Announcement';

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

  const [open, setOpen] = useState(false);

  const [storage, setStorage] = useStorage();

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

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
    announcementList.length > 0
      ?
      <Fragment>
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={announcementList.length} color='error'>
            <AnnouncementIcon />
          </Badge>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            {message.announcement.title}
          </DialogTitle>
          <DialogContent>
            {
              announcementList.map(({ id, title, content, link = false }) =>
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {message.announcement.close}
            </Button>
          </DialogActions>
        </Dialog>

      </Fragment>
      :
      null

  )
})