import React from 'react';
import { Button, Grid } from '../elements';
import { history } from '../redux/configStore';

const Navbar = (props) => {
  const onClick = (e) => {
    history.push('/');
  };
  const login = (e) => {
    history.push('/login');
  };

  const signup = (e) => {
    history.push('/signup');
  };
  return (
    <Grid>
      <Grid _onClick={onClick}>My Taste</Grid>
      <Grid>
        <Grid>
          <Button _onClick={login}>로그인</Button>
        </Grid>
        <Grid>
          <Button _onClick={signup}>회원가입</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

Navbar.defaultProps = {};

export default Navbar;
