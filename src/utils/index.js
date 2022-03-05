import { store } from 'store';
import { enqueueSnackbar } from 'store/snackbar';
import { openDialog } from 'store/dialog';

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

export function dialog(options) {
  store.dispatch(
    openDialog(options)
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
export function debounce(func, wait, imme) {
  let timer
  return function (...rest) {
    if (imme && !timer) {
      func.apply(this, rest)
    }
    timer && clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, rest), wait)
  }
}