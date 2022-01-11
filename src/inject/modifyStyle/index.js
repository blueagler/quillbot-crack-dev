import { h, Fragment } from 'preact';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function () {

  const FullEditor = <GlobalStyles styles={
    {
      '.mid-container': {
        maxWidth: '95% !important'
      },
      '.SplitPane': {
        minHeight: 'calc(80vh)'
      },
      '#grammar-checker': {
        minHeight: 'calc(75vh)'
      },
      '#inputGridContainerRef': {
        minHeight: 'calc(75vh)'
      },
      '#cgr-container': {
        minHeight: 'calc(85vh)'
      }
    }
  } />;

  return (
    <Fragment>
      {FullEditor}
    </Fragment>
  )
}