import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Input, Button } from '../elements';
import { emailCheck } from '../shared/common';
import ErrorMsg from '../components/ErrorMsg';
import Header from '../components/Header';
import { actionCreators as userActions } from '../redux/modules/user';
import styled from 'styled-components';

const Signup = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [nickname, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [idError, setIdError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [pwdChkError, setPwdChkError] = useState(false);

  const { fbAuthError } = useSelector((state) => state.user);

  const isFailValid = () => {
    let fail = false;
    setIdError(false);
    setNicknameError(false);
    setPwdError(false);
    setPwdChkError(false);

    if (!id || !emailCheck(id)) {
      setIdError(true);
      fail = true;
    }

    if (!nickname) {
      setNicknameError(true);
      fail = true;
    }

    if (!pw || pw.length < 6) {
      setPwdError(true);
      fail = true;
    }
    if (!pwCheck || pw !== pwCheck) {
      setPwdChkError(true);
      fail = true;
    }

    return fail;
  };

  const onSignup = (e) => {
    if (isFailValid()) return;

    dispatch(userActions.signupFB(id, nickname, pw));
  };

  return (
    <SignupContainer>
      <Header>
        <Text bold>회원가입</Text>
        <i />
      </Header>
      <Middle>
        <Grid padding="0 6px">
          <Text>아이디</Text>
          <Input
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <ErrorMsg valid={idError}>이메일 형식으로 입력해주세요</ErrorMsg>
          <ErrorMsg valid={fbAuthError.isError}>
            이미 가입된 이메일입니다
          </ErrorMsg>
        </Grid>
        <Grid padding="0 6px">
          <Text>닉네임</Text>

          <Input
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
          <ErrorMsg valid={nicknameError}>닉네임을 입력해주세요</ErrorMsg>
        </Grid>
        <Grid padding="0 6px">
          <Text>비밀번호</Text>
          <Input
            type="password"
            _onChange={(e) => {
              setPw(e.target.value);
            }}
          />
          <ErrorMsg valid={pwdError}>
            비밀번호는 6글자 이상 입력해주세요
          </ErrorMsg>
        </Grid>
        <Grid padding="0 6px">
          <Text>비밀번호 확인</Text>

          <Input
            type="password"
            _onChange={(e) => {
              setPwCheck(e.target.value);
            }}
          />
          <ErrorMsg valid={pwdChkError}>입력한 비밀번호와 다릅니다</ErrorMsg>
        </Grid>
      </Middle>
      <Button
        disabled={!pwCheck || !pw || !id || !nickname}
        _onClick={onSignup}
      >
        회원가입
      </Button>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  height: 100%;

  ${(props) => props.theme.flex_column};
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;

const Middle = styled.div`
  width: 30vw;
  margin: 10vh 0;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    padding: 10px;
  }
`;

export default Signup;
