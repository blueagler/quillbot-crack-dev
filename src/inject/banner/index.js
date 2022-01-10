import { h } from 'preact';
import styled from '@emotion/styled';
import Support from "./support";
import Setting from "./setting";

export default function () {

  const Wrapper = styled.div({
    position: 'absolute',
    display: 'flex',
    top: '0',
    height: '52px',
    justifyContent: 'space-between',
    alignItems: 'center',
    right: '58px'
  });


  return (
    <Wrapper>
      <Support />
      <Setting />
    </Wrapper>
  )
}