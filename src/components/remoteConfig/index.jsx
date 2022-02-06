import { memo } from 'preact/compat';
import { useEffect, useCallback, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { setPremium, setAnnouncement } from 'store/remoteConfig/action';
import { useStorage } from 'utils/localStorage';
import { useSnackbar } from 'notistack';
import { message } from 'message';
import { get, post } from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import useInterval from './useInterval';

function randomSliderAnswer() {
  return Math.floor(Math.random() * (Math.floor(80) - Math.ceil(20))) + Math.ceil(20)
}
export default memo(function () {

  const dispatch = useDispatch();
  const [storage, setStorage] = useStorage();
  const { enqueueSnackbar } = useSnackbar();

  const [showVerify, setShowVerify] = useState(false);
  const [code, setCode] = useState("code");
  const [sliderAnswer, setSliderAnswer] = useState(100);

  const [sliderInput, setSliderInput] = useState(0);
  const [codeInput, setCodeInput] = useState("");

  const [loadInterval, setLoadInterval] = useState(3600 * 1000);

  const pass = useCallback((time) => {
    setShowVerify(false);
    setSliderAnswer(100);
    setSliderInput(0);
    setCodeInput("");
    setStorage({
      ...storage,
      verify: {
        ...storage.verify,
        expiredAt: new Date().getTime() + time
      }
    });
    enqueueSnackbar(message.verify.pass, { variant: 'success' });
  }, [storage]);

  const handleSliderChange = useCallback((_, value) => {
    setSliderInput(value);
  }, []);

  const handleSliderChangeCommitted = useCallback((_, value) => {
    if (value === sliderAnswer) {
      pass(2 * 60 * 60 * 1000)
    }
  }, [sliderAnswer]);

  const handleInputChange = useCallback((event) => {
    if (event.target.value === code) {
      pass(7 * 24 * 60 * 60 * 1000)
    }
    setCodeInput(event.target.value);
  }, [code]);

  const loadRemoteConfig = useCallback(async () => {

    async function getAnnouncement() {
      try {
        const { data } = await get('https://nocache.blueagle.top/quillbot/announcement.json', { headers: { 'Cache-Control': 'no-cache' } });
        return data;
      } catch (error) {
        enqueueSnackbar(message.request.error + error, { variant: 'error' });
      }
    }

    async function getPremium() {
      try {
        const { data: premiumConfig } = await get('https://nocache.blueagle.top/quillbot/premium.json', { headers: { 'Cache-Control': 'no-cache' } });
        if (premiumConfig.verify.enabled && storage.verify.expiredAt < new Date().getTime()) {
          setSliderAnswer(randomSliderAnswer());
          setCode(premiumConfig.verify.code);
          setShowVerify(true);
        }
        if (premiumConfig.enabled && premiumConfig.token.refreshToken) {
          try {
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
              setLoadInterval(Number(firebase.expires_in) * 1000);
              enqueueSnackbar(message.hookPremiumToken.loaded, { variant: 'success' });
              return {
                ...premiumConfig,
                firebase
              }
            }
          } catch (_) {
            enqueueSnackbar(message.hookPremiumToken.unavailable, { variant: 'error' });
            return {
              ...premiumConfig,
              enabled: false
            }
          }
        } else {
          if (storage.settings.find(item => item.id === 'hook-premium-token' && item.enabled)) {
            enqueueSnackbar(message.hookPremiumToken.unavailable, { variant: 'error' });
          }
        }
      } catch (error) {
        enqueueSnackbar(message.request.error + error, { variant: 'error' });
      }
    }

    const [announcement, premium] = await Promise.allSettled([getAnnouncement(), getPremium()]);

    if (announcement.status === 'fulfilled') {
      dispatch(setAnnouncement(announcement.value));
    }
    if (premium.status === 'fulfilled') {
      dispatch(setPremium(premium.value));
    }

  }, [storage]);

  useEffect(() => {
    loadRemoteConfig();
  }, []);

  useInterval(() => {
    loadRemoteConfig();
  }, loadInterval);

  return (
    <Dialog
      open={showVerify}
    >
      <DialogTitle>
        {message.verify.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{ __html: message.verify.guide }} />
        <TextField label={message.verify.input} variant="outlined" color="success" size="large" fullWidth onChange={handleInputChange} value={codeInput} />
        <Slider
          disableSwap
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          value={sliderInput}
          min={0}
          max={100}
          valueLabelDisplay="on"
          sx={{
            margin: '50px 10px 0'
          }}
        />
        <Typography>{message.verify.sliderTo + sliderAnswer.toString()}</Typography>

      </DialogContent>
      <DialogActions>
        <Button fullWidth component="a" target="_blank" variant="contained" size="large" color="success" href="https://t.me/QuillBot_Premium_Crack">{message.verify.telegramBtn}</Button>
      </DialogActions>
    </Dialog>
  )
})