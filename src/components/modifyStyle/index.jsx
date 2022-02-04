import { Fragment } from 'preact';
import { memo } from "preact/compat";
import { useMemo } from 'preact/hooks';
import { useStorage } from 'utils/localStorage';
import GlobalStyles from '@mui/material/GlobalStyles';

export default memo(function () {

  const [storage] = useStorage();

  const styleList = useMemo(() => {
    return {
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
    }
  }, []);

  return (
    <Fragment>
      {
        Object.keys(styleList)
          .filter(key =>
            storage.settings.find(item => item.id === key && item.enabled)
          )
          .map(key => <GlobalStyles styles={styleList[key]} />)
      }
    </Fragment>
  )
})