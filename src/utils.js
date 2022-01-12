import store from './store';
import { enqueueSnackbar } from './store/snackbar/action';
import { openDialog } from './store/dialog/action';
import { message } from './message';

export function notify(
  message = '',
  variant = 'info'
) {
  store.dispatch(
    enqueueSnackbar({
      message,
      options: {
        variant,
      },
    })
  );
}

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
