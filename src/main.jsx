import { useEffect } from 'preact/hooks';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import store from 'store';
import Banner from 'components/banner';
import Dialog from 'components/dialog';
import Snackbar from 'components/snackbar';
import ModifyStyle from 'components/modifyStyle';
import RemoteConfig from 'components/remoteConfig';


import { proxy, unproxy } from "./proxy";
import check from 'utils/check';
import { init as initAnalytics } from 'analytic';

export default function () {
  useEffect(() => {

    check();
    proxy();
    initAnalytics();

    return () => {
      unproxy();
    }
  }, []);

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={1}>
        <ModifyStyle />
        <Snackbar />
        <RemoteConfig />
        <Dialog />
        <Banner />
      </SnackbarProvider>
    </Provider>
  )
}