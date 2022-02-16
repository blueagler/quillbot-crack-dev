import { useCallback, useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'hooks/useInterval';
import { requestPremium, getReloadInterval as getReloadPremiumInterval } from 'store/premium';
import { requestAnnouncement } from 'store/announcement';
import { requestVerify } from 'store/verify';
import { enqueueSnackbar } from 'store/snackbar';
import { message } from 'message';

export default function () {
  const dispatch = useDispatch();

  const loadPremiumInterval = useSelector(getReloadPremiumInterval);

  const [loadVerifyInterval] = useState(600000);
  const [loadAnnouncementInterval] = useState(600000);
  const initialLoad = useCallback(async () => {
    dispatch(requestPremium());
    dispatch(requestVerify());
    dispatch(requestAnnouncement());
  }, []);
  useEffect(() => {
    initialLoad()
  }, []);
  useInterval(async () => {
    dispatch(requestPremium())
  }, loadPremiumInterval);

  useInterval(async () => {
    dispatch(requestVerify())
  }, loadVerifyInterval);

  useInterval(async () => {
    dispatch(requestAnnouncement())
  }, loadAnnouncementInterval);

  const status = useSelector(state => ({
    premium: {
      status: state.premium.status,
      error: state.premium.error,
    },
    announcement: {
      status: state.announcement.status,
      error: state.announcement.error,
    },
    verify: {
      status: state.verify.status,
      error: state.verify.error,
    },
  }));

  useEffect(() => {
    if (status.premium.status !== 'not-requested') {
      dispatch(enqueueSnackbar({
        message: status.premium.status === 'avaliable' ? message.hookPremiumToken.loaded : message.hookPremiumToken.unavailable,
        options: {
          variant: status.premium.status === 'avaliable' ? 'success' : 'error',
        },
      }))
    }
  }, [status.premium.status]);

  useEffect(() => {
    if (status.announcement.status === 'unavaliable') {
      dispatch(enqueueSnackbar({
        message: message.announcement.loadFail,
        options: {
          variant: 'error',
        },
      }))
    }
  }, [status.announcement.status]);

  useEffect(() => {
    if (status.verify.status === 'unavaliable') {
      dispatch(enqueueSnackbar({
        message: message.verify.loadFail,
        options: {
          variant: 'error',
        },
      }))
    }
  }, [status.verify.status]);

  return status;
}