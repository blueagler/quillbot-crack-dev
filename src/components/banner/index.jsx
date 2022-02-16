import { memo } from 'preact/compat';
import { styled } from '@mui/material/styles';
import Support from "./support";
import Setting from "./setting";
import Announcement from './announcement';
import Server from './server';

export default memo(function () {

  const Wrapper = styled('div')({
    position: 'absolute',
    display: 'flex',
    top: '0',
    height: '52px',
    justifyContent: 'space-between',
    alignItems: 'center',
    right: '60px'
  });

  return (
    <Wrapper className='mui-fixed'>
      <Support />
      <Server />
      <Setting />
      <Announcement />
    </Wrapper>
  )
})