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
        label: 'Unlock Paraphrase Modes (Testing)',
        description: 'Allow you to use premium paraphrase modes',
      },
      {
        id: 'FULL_EDITOR',
        label: 'Full Editor',
        description: 'Full Editor',
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