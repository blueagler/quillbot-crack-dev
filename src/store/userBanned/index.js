import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requestUserBanned = createAsyncThunk(
  'userBanned/requestUserBanned',
  async (_, { rejectWithValue }) => {
    try {
      const list = await (await fetch('https://nocache.blueagle.top/quillbot/userBanned.json', { cache: "no-cache" })).json();
      return list
    } catch (error) {
      rejectWithValue(error)
    }
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
    [requestUserBanned.fulfilled]: (state, { payload: users }) => {
      state.status = 'avaliable';
      state.users = users;
    },
    [requestUserBanned.rejected]: (state, { error: { message: error } }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getUserBanned = state => state.userBanned.users;
export default userBanned.reducer;