import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from 'message';
import { get, post } from 'axios';

export const requestPremium = createAsyncThunk(
  'premium/requestPremium',
  async () => {
    const { data: { enabled, token: { refreshToken: refresh_token }, key } } = await get('https://nocache.blueagle.top/quillbot/premium.json', { headers: { 'Cache-Control': 'no-cache' } });
    if (enabled && refresh_token) {
      const { data: firebase } = await post('https://securetoken.googleapis.com/v1/token',
        {
          grant_type: 'refresh_token',
          refresh_token
        }, {
        params: {
          key
        }
      });
      if (firebase.access_token) {
        return firebase
      } else {
        throw new Error(message.hookPremiumToken.unavailable);
      }
    } else {
      throw new Error(message.hookPremiumToken.unavailable);
    }
  }
);

export const premium = createSlice({
  name: "premium",
  initialState: {
    status: 'not-requested',
    error: '',
    firebase: {
      access_token: '',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_token: '',
      id_token: '',
      user_id: '',
      project_id: 0
    }
  },
  extraReducers: {
    [requestPremium.fulfilled]: (state, { payload: firebase }) => {
      state.status = 'avaliable';
      state.firebase = firebase;
    },
    [requestPremium.rejected]: (state, { payload: error }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getReloadInterval = state => state.premium.firebase.expires_in * 1000;
export default premium.reducer;