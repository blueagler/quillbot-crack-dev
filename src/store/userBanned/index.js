import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from 'axios';

export const requestUserBanned = createAsyncThunk(
  'userBanned/requestUserBanned',
  async () => {
    const { data: list } = await get('https://nocache.blueagle.top/quillbot/userBanned.json', { headers: { 'Cache-Control': 'no-cache' } });
    return list
  }
);

export const userBanned = createSlice({
  name: "userBanned",
  initialState: {
    status: 'not-requested',
    error: '',
    users: [],
  },
  extraReducers: {
    [requestUserBanned.fulfilled]: (state, { payload: list }) => {
      state.status = 'avaliable';
      state.users = list
    },
    [requestUserBanned.rejected]: (state, { payload: error }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getUserBanned = state => state.userBanned.users;
export default userBanned.reducer;