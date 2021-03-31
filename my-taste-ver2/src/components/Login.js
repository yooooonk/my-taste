import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Input, Button } from '../elements';
import ErrorMsg from './ErrorMsg';
import Header from './Header';
import { actionCreators as userActions } from '../redux/modules/user';
import styled from 'styled-components';
const Login = (props) => {
  const dispatch = useDispatch();
  const fbAuthError = useSelector((state) => state.user.fbAuthError);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const onLogin = (e) => {
    if (!id || !pw) return;
    dispatch(userActions.loginFB(id, pw));
  };
  return (
    <LoginContainer>
      <Header>
        로그인
        <i />
      </Header>
      <Grid>
        <Text>아이디</Text>
        <Input
          value={id}
          _onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </Grid>
      <Grid>
        <Text>비밀번호</Text>
        <Input
          is_submit
          onSubmit={onLogin}
          value={pw}
          type="password"
          _onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </Grid>
      <ErrorMsg valid={fbAuthError.isError}>{fbAuthError.msg}</ErrorMsg>
      <Button _onClick={onLogin}>로그인</Button>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  ${(props) => props.theme.flex_column}
`;
export default Login;
