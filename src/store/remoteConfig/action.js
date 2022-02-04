export const SET_PREMIUM = 'SET_PREMIUM';
export const SET_ANNOUNCEMENTS = 'SET_ANNOUNCEMENT';

export const setPremium = premium => ({
  type: SET_PREMIUM,
  premium
});

export const setAnnouncement = announcements => ({
  type: SET_ANNOUNCEMENTS,
  announcements
});