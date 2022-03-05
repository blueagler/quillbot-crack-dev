import { memo } from 'preact/compat';
import { message } from "message";
import { Fragment } from 'preact';
import { styled } from '@mui/material/styles';

export default memo(function () {

  const SupportText = styled('span')({
    fontSize: 'large',
    marginRight: '12px'
  });

  const GitHubBtn = styled('iframe')({
    border: 'none',
    overflow: 'hidden',
    width: '140px',
    height: '30px'
  });

  return (
    <Fragment>
      <SupportText>{message.star}</SupportText>
      <GitHubBtn
        src="https://ghbtns.com/github-btn.html?user=blueagler&repo=QuillBot-Premium-Crack&type=star&count=true&size=large" />
    </Fragment>
  )
})