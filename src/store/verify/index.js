import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requestVerify = createAsyncThunk(
  'verify/requestVerify',
  async (_, { rejectWithValue }) => {
    try {
      const verify = await (await fetch('https://nocache.blueagle.top/quillbot/verify.json', { cache: "no-cache" })).json();
      return verify
    } catch (error) {
      rejectWithValue(error)
    }
  }
);

export const verify = createSlice({
  name: "verify",
  initialState: {
    status: 'not-requested',
    error: '',
    server: {
      enabled: false,
      slider: false,
      guide: '',
      code: ''
    },
    expiredAt: 0,
  },
  reducers: {
    setExpiredTime: (state, { payload: time }) => {
      state.expiredAt = time;
    }
  },
  extraReducers: {
    [requestVerify.fulfilled]: (state, { payload: server }) => {
      state.status = 'avaliable';
      state.server = { ...state.server, ...server };
    },
    [requestVerify.rejected]: (state, { error: { message: error } }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getShowModel = state => state.verify.expiredAt < new Date().getTime() && state.verify.server.enabled;
export const getCode = state => state.verify.server.code;
export const getShowSlider = state => state.verify.server.slider;
export const getGuide = state => state.verify.server.guide;
export const { setExpiredTime } = verify.actions;
export default verify.reducer;