import { memo } from "preact/compat";
import { useEffect, useMemo, useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from 'store/snackbar/action';

export default memo(function () {

  let displayed = useMemo(() => [], []);

  const dispatch = useDispatch();
  const notifications = useSelector(store => store.snackbar.notifications || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = useCallback((id) => {
    displayed = [...displayed, id];
  }, [displayed]);

  const removeDisplayed = useCallback((id) => {
    displayed = [...displayed.filter(key => id !== key)];
  }, [displayed]);

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }
      if (displayed.includes(key)) return;
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
  return null;
})