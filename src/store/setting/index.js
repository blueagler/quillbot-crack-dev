import { createSlice } from "@reduxjs/toolkit";

export const setting = createSlice({
  name: "setting",
  initialState: {
    options: [
      {
        id: 'HOOK_PREMIUM',
        label: 'Hook Premium',
        description: 'Hook Premium',
      },
      {
        id: 'HOOK_PREMIUM_TOKEN',
        label: 'Unlock Paraphrase Modes',
        description: 'Allow you to use premium paraphrase modes (Sometimes it may not work)',
      },
      {
        id: 'FULL_EDITOR',
        label: 'Full Editor',
        description: 'Enlarge the editor view',
      },
    ],
    disabled: [],
  },
  reducers: {
    toggle: (state, { payload: id }) => {
      if (state.disabled.includes(id)) {
        state.disabled = state.disabled.filter(i => i !== id);
      } else {
        state.disabled.push(id);
      }
    },
  }
});
export const getSetting = state => state.setting.options.map(setting => ({ ...setting, disabled: state.setting.disabled.includes(setting.id) }));
export const { toggle } = setting.actions;
export default setting.reducer;