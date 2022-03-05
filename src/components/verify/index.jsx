import { memo, Fragment } from 'preact/compat';
import { useCallback, useState, useEffect } from 'preact/hooks';
import { useSnackbar } from 'notistack';
import { message } from 'message';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux';
import { setExpiredTime, getCode, getShowModel, getShowSlider, getGuide } from 'store/verify';

export default memo(function () {

  const dispatch = useDispatch();

  const showModel = useSelector(getShowModel ?? false);
  const showSlider = useSelector(getShowSlider ?? false);
  const guide = useSelector(getGuide ?? '');

  const code = useSelector(getCode ?? 'code');

  const { enqueueSnackbar } = useSnackbar();

  const [sliderAnswer, setSliderAnswer] = useState(100);

  const [sliderInput, setSliderInput] = useState(0);
  const [codeInput, setCodeInput] = useState("");

  const randomSliderAnswer = useCallback(() => Math.floor(Math.random() * (Math.floor(80) - Math.ceil(20))) + Math.ceil(20), []);

  const pass = useCallback((time) => {
    setCodeInput("");
    dispatch(setExpiredTime(new Date().getTime() + time));
    enqueueSnackbar(message.verify.pass, { variant: 'success' });
  }, []);

  const handleSliderChange = useCallback((_, value) => {
    setSliderInput(value);
  }, []);

  const handleSliderChangeCommitted = useCallback((_, value) => {
    if (value === sliderAnswer) {
      pass(2 * 60 * 60 * 1000)
    } else {
      setSliderInput(0)
    }
  }, [sliderAnswer]);

  const handleInputChange = useCallback((event) => {
    if (event.target.value === code) {
      pass(7 * 24 * 60 * 60 * 1000)
    }
    setCodeInput(event.target.value);
  }, [code]);

  useEffect(() => {
    if (showModel) {
      setSliderAnswer(randomSliderAnswer())
    }
  }, [showModel]);
  return (
    <Dialog
      open={showModel}
    >
      <DialogTitle>
        {message.verify.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{ __html: guide }} />
        <TextField label={message.verify.input} variant="outlined" color="success" size="large" fullWidth onChange={handleInputChange} value={codeInput} />
        {
          showSlider &&
          <Fragment>
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
          </Fragment>
        }

      </DialogContent>
      <DialogActions>
        <Button fullWidth component="a" target="_blank" variant="contained" size="large" color="success" href="https://t.me/QuillBot_Premium_Crack">{message.verify.telegramBtn}</Button>
      </DialogActions>
    </Dialog>
  )
})