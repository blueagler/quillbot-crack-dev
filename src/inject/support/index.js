import { message } from "message";
import React from 'react';
import styled from '@emotion/styled';

export default function () {

  const Wrapper = styled.div({
    position: 'absolute',
    display: 'flex',
    top: '12px',
    right: '58px'
  });

  const SupportText = styled.span({
    fontSize: 'large',
    marginRight: '12px'
  });

  const GitHubBtn = styled.iframe({
    border: 'none',
    overflow: 'hidden',
    width: '130px',
    height: '30px'
  });

  return (
    <Wrapper>
      <SupportText>{message.star}</SupportText>
      <GitHubBtn
        src="https://ghbtns.com/github-btn.html?user=blueagler&repo=QuillBot-Premium-Crack&type=star&count=true&size=large" />
    </Wrapper>
  )
}