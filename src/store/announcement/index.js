import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from 'axios';

export const requestAnnouncement = createAsyncThunk(
  'announcement/requestAnnouncement',
  async () => {
    const { data: list } = await get('https://nocache.blueagle.top/quillbot/announcement.json', { headers: { 'Cache-Control': 'no-cache' } });
    return list
  }
)
  ;
export const announcement = createSlice({
  name: "announcement",
  initialState: {
    status: 'not-requested',
    error: '',
    list: [],
    ignores: []
  },
  reducers: {
    addIgnore: (state, { payload: id }) => {
      state.ignores.push(id);
    },
    setList: (state, { payload: list }) => {
      state.list = list;
    }
  },
  extraReducers: {
    [requestAnnouncement.fulfilled]: (state, { payload: list }) => {
      state.status = 'avaliable';
      state.list = list;
    },
    [requestAnnouncement.rejected]: (state, { payload: error }) => {
      state.status = 'unavaliable';
      state.error = error;
    }
  }
});

export const getList = state => state.announcement.list.filter(({ id, ignorable }) => !ignorable || !state.announcement.ignores.includes(id));
export const getIgnoredList = state => state.announcement.list.filter(({ id }) => state.announcement.ignores.includes(id));

export const { addIgnore, setList } = announcement.actions;
export default announcement.reducer;