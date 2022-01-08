export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const openDialog = options => ({
  type: OPEN_DIALOG,
  options
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});