import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Input, Button, Wrapper } from '../elements';
import {
  testEmailValid,
  testPwValid,
  testRepatNumber,
  testUsernameValid
} from '../shared/common';
import ErrorMsg from '../components/ErrorMsg';
import { userActions } from '../redux/modules/user';
import styled from 'styled-components';
import InputValid from '../elements/InputValid';

const Signup = (props) => {
  const { history } = props;

  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [nickname, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [totalValidPass, setTotalValidPass] = useState(false);

  // email validation
  const [isOpenEmailValid, setIsOpenEmailValid] = useState(false);
  const [isStartEmailInput, setIsStartEmailInput] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const isValidEmailMultiple = useSelector(
    (state) => state.user.isValidEmailMultiple
  );

  // username validation
  const [isOpenUsernameValid, setIsOpenUsernameValid] = useState(false);
  const [isStartUsernameInput, setIsStartUsernameInput] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidUsernameLength, setIsValidUsernameLength] = useState(false);

  // passwrod validation
  const [isOpenPasswordValid, setIsOpenPasswordValid] = useState(false);
  const [isStartPasswordInput, setIsStartPasswordInput] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(false);

  // password check validation
  const [isOpenPwChkValid, setIsOpenPwChkValid] = useState(false);

  const { loginError } = useSelector((state) => state.user);

  // 이메일 입력 - email 형식 체크, 형식 validation 초기화
  const onChangeEmail = (e) => {
    if (!isStartEmailInput) setIsStartEmailInput(true);

    setId(e.target.value);

    setIsValidEmail(testEmailValid(e.target.value));
  };

  // 닉네임 입력
  const onChangeUsername = (e) => {
    // validation 색깔 바꾸기 용
    if (!isStartUsernameInput) setIsStartUsernameInput(true);

    setNickName(e.target.value);

    // 영어 숫자 한글 - _ 만 입력가능
    setIsValidUsername(testUsernameValid(e.target.value));
    //e.target.value = e.target.value.replace(/[^가-힣A-Za-z0-9-_]/gi, '');

    // username 길이 체크
    setIsValidUsernameLength(
      e.target.value.length >= 3 && e.target.value.length <= 20
    );
  };

  // password 입력
  const onChangePassword = (e) => {
    if (!isStartPasswordInput) setIsStartPasswordInput(true);

    setPw(e.target.value);
    setIsValidPassword(testPwValid(e.target.value));
    setIsValidPasswordRepeat(testRepatNumber(e.target.value));
  };

  const onSignup = (e) => {
    console.log(checkTotalvalidation());
    if (!checkTotalvalidation()) return alert('입력요건을 지켜주세요');

    dispatch(userActions.signup(id, nickname, pw));
  };

  useEffect(() => {
    let passEmail = id && isValidEmail;
    let passUsername = nickname && isValidUsername;
    let passPw =
      pw && isValidPassword && isValidPasswordRepeat && pw === pwCheck;

    setTotalValidPass(passEmail && passUsername && passPw);
  }, [
    id,
    isValidEmail,
    nickname,
    isValidUsername,
    pw,
    isValidPassword,
    isValidPasswordRepeat,
    pwCheck
  ]);
  const checkTotalvalidation = () => {
    let passEmail = id && isValidEmail;
    let passUsername = nickname && isValidUsername;
    let passPw =
      pw && isValidPassword && isValidPasswordRepeat && pw === pwCheck;

    return passEmail && passUsername && passPw;
  };

  const goBack = () => {
    history.replace('/');
  };
  return (
    <SignupContainer>
      <Text bold>회원가입</Text>

      <FormTable>
        <tbody>
          <tr>
            <td>
              <Text>EMAIL</Text>{' '}
            </td>
            <td>
              <Input
                _onChange={onChangeEmail}
                _onFocus={() => setIsOpenEmailValid(true)}
                placeholder="이메일을 입력해주세요"
              />
              <ValidWrapper isOpen={isOpenEmailValid}>
                <InputValid isStart={isStartEmailInput} isValid={isValidEmail}>
                  이메일 형식
                </InputValid>
                {/* <InputValid
                  isStart={isValidEmailChk}
                  isValid={isValidEmailMultiple}
                >
                  아이디 중복확인
                </InputValid> */}
              </ValidWrapper>
              {/* <ErrorMsg valid={idError}>이메일 형식으로 입력해주세요</ErrorMsg> */}
            </td>
          </tr>
          <tr>
            <td>
              <Text>NAME</Text>
            </td>
            <td>
              {' '}
              <Input
                _onChange={onChangeUsername}
                _onFocus={() => setIsOpenUsernameValid(true)}
                placeholder="3~20자리의 숫자, 영어, 한글, -,_만 가능합니다."
              />
              <ValidWrapper isOpen={isOpenUsernameValid}>
                <InputValid
                  isStart={isStartUsernameInput}
                  isValid={isValidUsername}
                >
                  한글,영어,숫자, -, _만 허용
                </InputValid>
              </ValidWrapper>
              <ValidWrapper isOpen={isOpenUsernameValid}>
                <InputValid
                  isStart={isStartUsernameInput}
                  isValid={isValidUsernameLength}
                >
                  3~20자리
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>
          <tr>
            <td>
              <Text>PW</Text>
            </td>
            <td>
              <Input
                type="password"
                _onChange={onChangePassword}
                placeholder="비밀번호를 입력해주세요"
                _onFocus={() => setIsOpenPasswordValid(true)}
              />
              <ValidWrapper isOpen={isOpenPasswordValid}>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={pw.length >= 10}
                >
                  10자리 이상 입력
                </InputValid>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={isValidUsername}
                >
                  영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
                </InputValid>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={isValidPasswordRepeat}
                >
                  동일한 숫자 3개 이상 연속 사용 불가
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>
          <tr>
            <td>
              <Text>PW CHECK</Text>
            </td>
            <td>
              <Input
                type="password"
                _onChange={(e) => {
                  setPwCheck(e.target.value);
                }}
                _onFocus={() => {
                  if (!isOpenPwChkValid) setIsOpenPwChkValid(true);
                }}
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
              <ValidWrapper isOpen={isOpenPwChkValid}>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={pwCheck && pw === pwCheck}
                >
                  동일한 비밀번호를 입력해주세요
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Wrapper>
                <Button _onClick={goBack}>취소</Button>
                <Button disabled={!totalValidPass} _onClick={onSignup}>
                  가입하기
                </Button>
              </Wrapper>
            </td>
          </tr>
        </tbody>
      </FormTable>

      <ErrorMsg valid={loginError.isError}>이미 가입된 이메일입니다</ErrorMsg>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  height: 100%;
  padding: 1rem;
  ${(props) => props.theme.border_box};

  ${(props) => props.theme.flex_column};
  justify-content: center;

  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`;

const FormTable = styled.table`
  width: 100%;

  & tr {
    align-items: flex-start;
    justify-content: center;
  }

  & td {
    padding: 0.5rem;

    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      width: 70%;
    }
  }

  @media ${(props) => props.theme.desktop} {
    width: 70%;
    max-width: 500px;
    & td.input {
      width: 300px;
    }
  }
`;

const ValidWrapper = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding-top: 0.5em;
`;

export default Signup;
