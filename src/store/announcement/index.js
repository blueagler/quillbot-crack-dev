import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requestAnnouncement = createAsyncThunk(
  'announcement/requestAnnouncement',
  async (_, { rejectWithValue }) => {
    try {
      const list = await (await fetch('https://nocache.blueagle.top/quillbot/announcement.json', { cache: "no-cache" })).json();
      return list
    } catch (error) {
      return rejectWithValue(error)
    }
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

export const { addIgnore } = announcement.actions;
export default announcement.reducer;