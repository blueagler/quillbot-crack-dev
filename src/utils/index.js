import store from '../store';
import { enqueueSnackbar } from '../store/snackbar/action';
import { openDialog } from '../store/dialog/action';
import { message } from '../message';

export const notify = throttle((message = '', variant = 'info') => {
  store.dispatch(
    enqueueSnackbar({
      message,
      options: {
        variant,
      },
    })
  );
}, 2000);

export function dialog({
  title = message.title,
  content = '',
  actions = [
    {
      label: 'NO',
      onClick: () => { }
    },
    {
      label: 'YES',
      onClick: () => { }
    }
  ]
}) {
  store.dispatch(
    openDialog({
      title,
      content,
      actions,
    })
  );
}
export function throttle(func, wait) {
  let lastTime
  return function (...rest) {
    if (!lastTime ||
      (new Date().getTime() - lastTime > wait)) {
      lastTime = +new Date()
      func.apply(this, rest)
    }
  }
}