import { memo } from "preact/compat";
import { useEffect, useCallback } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { setPremium, setAnnouncement } from 'store/remoteConfig/action';
import { useStorage } from 'utils/localStorage';
import { useSnackbar } from 'notistack';
import { message } from 'message';
import { get, post, all } from 'axios';
import useInterval from './useInterval';

export default memo(function () {

  const dispatch = useDispatch();
  const [storage] = useStorage();
  const { enqueueSnackbar } = useSnackbar();

  const loadRemoteConfig = useCallback(async () => {

    async function getAnnouncement() {
      const { data } = await get('https://nocache.blueagle.top/quillbot/announcement.json', { headers: { 'Cache-Control': 'no-cache' } });
      return data;
    }

    async function getPremium() {
      const { data: premiumConfig } = await get('https://nocache.blueagle.top/quillbot/premium.json', { headers: { 'Cache-Control': 'no-cache' } });
      if (premiumConfig.enabled && premiumConfig.token.refreshToken) {
        const { data: firebase } = await post('https://securetoken.googleapis.com/v1/token',
          {
            grant_type: 'refresh_token',
            refresh_token: premiumConfig.token.refreshToken
          }, {
          params: {
            key: premiumConfig.key
          }
        });
        if (firebase.access_token) {
          return {
            ...premiumConfig,
            firebase
          }
        } else {
          enqueueSnackbar(message.hookPremiumToken.unavailable, 'error');
          return {
            ...premiumConfig,
            enabled: false,
            firebase
          }
        }
      } else {
        if (storage.settings.find(item => item.id === 'hook-premium-token' && item.enabled)) {
          enqueueSnackbar(message.hookPremiumToken.unavailable, 'error');
        }
      }
      return premiumConfig;
    }

    const [announcement, premium] = await all([getAnnouncement(), getPremium()]);

    dispatch(setAnnouncement(announcement));
    dispatch(setPremium(premium));

  }, []);

  useEffect(() => {
    loadRemoteConfig();
  }, []);

  useInterval(() => {
    loadRemoteConfig();
  }, 500000);

  return null
})