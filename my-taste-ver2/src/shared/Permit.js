import React from 'react';
import { useSelector } from 'react-redux';
import { apiKey } from './firebase';

const Permit = (props) => {
  const { not, children } = props;
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_session_key);

  if (not) {
    if (isSession && isLogin) {
      return null;
    } else {
      return <div>{children}</div>;
    }
  } else {
    if (isSession && isLogin) {
      return <div>{children}</div>;
    } else {
      return null;
    }
  }
  console.log('permit 이도저도 아님 ㅇㅅㅇ');
  return null;
};

Permit.defaultProps = {
  not: false
};

export default Permit;
