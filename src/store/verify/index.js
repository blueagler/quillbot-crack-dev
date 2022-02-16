import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from 'axios';

export const requestVerify = createAsyncThunk(
  'verify/requestVerify',
  async () => {
    const { data: verify } = await get('https://nocache.blueagle.top/quillbot/verify.json', { headers: { 'Cache-Control': 'no-cache' } });
    return verify
  }
);

export const verify = createSlice({
  name: "verify",
  initialState: {
    status: 'not-requested',
    error: '',
    server: {
      code: '',
      enabled: false,
    },
    expiredAt: 0,
  },
  reducers: {
    setVerify: (state, { payload: verify }) => {
      state.verify = {
        ...state.verify,
        ...verify
      };
    },
    setExpiredTime: (state, { payload: time }) => {
      state.expiredAt = time;
    }
  },
  extraReducers: {
    [requestVerify.fulfilled]: (state, { payload: verify }) => {
      state.status = 'avaliable';
      state.server = {
        ...state.server,
        ...verify
      };
    },
    [requestVerify.rejected]: (state, { payload: error }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getShowModel = state => state.verify.expiredAt < new Date().getTime() && state.verify.server.enabled;
export const getCode = state => state.verify.server.code;
export const { setVerify, setExpiredTime } = verify.actions;
export default verify.reducer;