import { SET_PREMIUM, SET_ANNOUNCEMENTS } from './action';

const defaultState = {
  announcements: [],
  premium: {
    enabled: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_PREMIUM:
      return {
        ...state,
        premium: action.premium
      };

    case SET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.announcements
      };

    default:
      return state;
  }
};
