import { memo } from 'preact/compat';
import { Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useSelector } from 'react-redux';
import { getSetting } from 'store/setting';

export default memo(function () {

  const setting = useSelector(getSetting);

  const styleList = useMemo(() => (
    {
      'FULL_EDITOR': {
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
  ), []);

  return (
    <Fragment>
      {
        Object.keys(styleList)
          .filter(key =>
            setting.find(item => item.id === key && !item.disabled)
          )
          .map(key => <GlobalStyles key={key} styles={styleList[key]} />)
      }
    </Fragment>
  )
})