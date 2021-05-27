import React from 'react';
import { useSelector } from 'react-redux';
import { apiKey } from './firebase';
import styled from 'styled-components';

const Permit = (props) => {
  const { not, children } = props;
  const isLogin = useSelector((state) => state.user.isLogin);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_session_key);

  if (not) {
    if (isSession && isLogin) {
      return null;
    } else {
      return <Container>{children}</Container>;
    }
  } else {
    if (isSession && isLogin) {
      return <Container>{children}</Container>;
    } else {
      return null;
    }
  }

  return null;
};

Permit.defaultProps = {
  not: false
};

const Container = styled.div`
  width: inherit;
  height: inherit;
  display: inherit;
`;
export default Permit;
