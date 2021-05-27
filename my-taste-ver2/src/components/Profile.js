import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Image, Wrapper } from '../elements';
import { actionCreators as userActions } from '../redux/modules/user';

const Profile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const logout = (e) => {
    dispatch(userActions.logoutFB());
  };
  return (
    <Container>
      <Wrapper>{userInfo.user_name}</Wrapper>

      <Wrapper>
        <Button _onClick={logout}>LOGOUT</Button>
        <Button>EDIT</Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: pink;
  width: 100%;
  ${(props) => props.theme.flex_column};
`;

export default Profile;
