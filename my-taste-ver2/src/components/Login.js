import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Input, Button } from '../elements';
import ErrorMsg from './ErrorMsg';
import Header from './Header';
import { actionCreators as userActions } from '../redux/modules/user';
import styled from 'styled-components';
import Wrapper from '../elements/Wrapper';
const Login = (props) => {
  const dispatch = useDispatch();
  const fbAuthError = useSelector((state) => state.user.fbAuthError);
  const { isMobile } = useSelector((state) => state.view);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const onLogin = (e) => {
    if (!id || !pw) return;
    dispatch(userActions.loginFB(id, pw));
  };
  return (
    <Wrapper
      is_column
      width={isMobile ? '100%' : '50vh'}
      jc="space-around"
      height="100%"
    >
      <Header>
        <Text bold>로그인</Text>
        <i />
      </Header>
      <Wrapper is_column>
        <Wrapper>
          <Wrapper width="200px">
            <Text>아이디</Text>
          </Wrapper>

          <Input
            value={id}
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Wrapper>
        <Wrapper>
          <Wrapper width="200px">
            <Text>비밀번호</Text>
          </Wrapper>
          <Input
            is_submit
            onSubmit={onLogin}
            value={pw}
            type="password"
            _onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </Wrapper>
        <ErrorMsg valid={fbAuthError.isError}>{fbAuthError.msg}</ErrorMsg>
      </Wrapper>
      <Button disabled={!id || !pw} _onClick={onLogin} width="50%">
        로그인
      </Button>
    </Wrapper>
  );
};

/* const LoginContainer = styled.div`
  height: 100%;
  width: 30vw;

  ${(props) => props.theme.flex_column};
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;
 */

export default Login;
