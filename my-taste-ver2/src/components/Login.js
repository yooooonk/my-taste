import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Input, Button } from '../elements';
import ErrorMsg from './ErrorMsg';
import Header from './Header';
import { actionCreators as userActions } from '../redux/modules/user';
import styled from 'styled-components';
import Wrapper from '../elements/Wrapper';
import { Container } from '@material-ui/core';

const Login = (props) => {
  const { moveSignUpPage, isNav } = props;
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
    <LoginContainer>
      {!isNav && <Text>로그인</Text>}
      <Table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>
              <Input
                value={id}
                _onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>PW</td>
            <td>
              <Input
                is_submit
                onSubmit={onLogin}
                value={pw}
                type="password"
                _onChange={(e) => {
                  setPw(e.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <Wrapper jc="space-between">
                <Button _onClick={moveSignUpPage} width="47%">
                  JOIN
                </Button>
                <Button disabled={!id || !pw} _onClick={onLogin} width="47%">
                  LOGIN
                </Button>
              </Wrapper>
            </td>
          </tr>
        </tbody>
      </Table>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  height: 100%;
  width: 100%;
  ${(props) => props.theme.flex_column};
  justify-content: center;
  ${(props) => props.theme.border_box};
  padding: 1rem;
  /* @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  } */
`;

const Table = styled.table`
  width: 100%;

  & td {
    color: ${(props) => props.theme.color.navy};
    font-family: Arial, Helvetica, sans-serif;
    text-align: right;
    padding: 0.25rem;
    font-size: 0.9rem;
    height: 2rem;
  }
`;

export default Login;
