import React, { useState } from 'react';
import { Grid, Text, Input, Button } from '../elements';
import Header from './Header';

const Login = (props) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const onLogin = (e) => {
    console.log(id, pw);
  };
  return (
    <Grid is_flex is_column>
      <Header>로그인</Header>
      <Grid bg="yellow">
        <Text>아이디</Text>
        <Input
          _onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </Grid>
      <Grid bg="yellow">
        <Text>비밀번호</Text>
        <Input
          type="password"
          _onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </Grid>
      <Button _onClick={onLogin}>로그인</Button>
    </Grid>
  );
};

export default Login;
