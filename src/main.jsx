import { memo } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { SnackbarProvider } from 'notistack';

import { store, persistor } from 'store';
import Banner from 'components/banner';
import Dialog from 'components/dialog';
import Snackbar from 'components/snackbar';
import ModifyStyle from 'components/modifyStyle';
import Verify from 'components/verify';


import { proxy, unproxy } from "./proxy";
import check from 'utils/check';
import { init as initAnalytics } from 'analytic';

export default memo(function () {

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
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={1}>
          <ModifyStyle />
          <Snackbar />
          <Verify />
          <Dialog />
          <Banner />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  )
})