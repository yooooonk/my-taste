import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid } from '../elements';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { actionCreators as userActions } from '../redux/modules/user';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const onClick = (e) => {
    history.push('/');
  };
  const login = (e) => {
    history.push('/login');
  };

  const signup = (e) => {
    history.push('/signup');
  };

  const myInfo = (e) => {
    console.log('내정보');
  };

  const logout = (e) => {
    dispatch(userActions.logoutFB());
  };
  return (
    <React.Fragment>
      <Grid>
        <Grid _onClick={onClick}>My Taste</Grid>
        <Permit not>
          <Grid width="50vw">
            <Grid>
              <Button _onClick={login}>로그인</Button>
            </Grid>
            <Grid>
              <Button _onClick={signup}>회원가입</Button>
            </Grid>
          </Grid>
        </Permit>
        <Permit>
          <Grid width="50vw">
            <Grid>
              <Button _onClick={myInfo}>내 정보</Button>
            </Grid>
            <Grid>
              <Button _onClick={logout}>로그아웃</Button>
            </Grid>
          </Grid>
        </Permit>
      </Grid>
    </React.Fragment>
  );
};
{
  /* <Permit>
<Grid>
  <Button _onClick={login}>내정보</Button>
</Grid>
<Grid>
  <Button _onClick={logout}>로그아웃</Button>
</Grid>
</Permit> */
}
Navbar.defaultProps = {};

export default Navbar;
