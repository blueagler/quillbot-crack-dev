import { OPEN_DIALOG, CLOSE_DIALOG } from './action';

const defaultState = {
  open: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...action.options,
        open: true
      };

    case CLOSE_DIALOG:
      return defaultState;

    default:
      return state;
  }
};
