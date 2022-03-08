import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from 'message';

export const requestPremium = createAsyncThunk(
  'premium/requestPremium',
  async (_, { rejectWithValue }) => {
    try {
      const { enabled, firebase } = await (await fetch('https://nocache.blueagle.top/quillbot/token.json', { cache: "no-cache" })).json();
      if (enabled) {
        return firebase
      } else {
        throw new Error(message.hookPremiumToken.unavailable)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const premium = createSlice({
  name: "premium",
  initialState: {
    status: 'not-requested',
    error: '',
    token: []
  },
  extraReducers: {
    [requestPremium.fulfilled]: (state, { payload: token }) => {
      state.status = 'avaliable';
      state.token = token;
    },
    [requestPremium.rejected]: (state, { payload: error }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export default premium.reducer;