import { Fragment } from 'preact';
import { useConfig } from '../config';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function () {

  const [config] = useConfig();

  const styleList = {
    'full-editor': {
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
  };

  return (
    <Fragment>
      {
        Object.keys(styleList)
          .filter(key =>
            config.find(item => item.id === key && item.enabled)
          )
          .map(key => <GlobalStyles styles={styleList[key]} />)
      }
    </Fragment>
  )
}