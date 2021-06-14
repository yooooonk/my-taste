import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Wrapper, Image, Text } from '../elements';
import { userActions } from '../redux/modules/user';
import { FaUserAlt } from 'react-icons/fa';
import { history } from '../redux/configStore';
const Profile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const logout = (e) => {
    dispatch(userActions.logout());
  };

  const editProfile = () => {
    history.push('/user');
  };
  return (
    <Container>
      <ProfileImg>
        {userInfo.user_profile && (
          <Image size={10} src={userInfo.user_profile} />
        )}
        {!userInfo.user_profile && <FaUserAlt />}
      </ProfileImg>
      <Text bold>{userInfo.user_name}</Text>

      <Wrapper>
        <Button onClick={logout}>LOGOUT</Button>
        <Button onClick={editProfile}>EDIT</Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.navy};
  ${(props) => props.theme.flex_column};
  height: 80%;
`;

const ProfileImg = styled.div`
  width: 60%;
  height: 70%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background-color: ${(props) => props.theme.color.gray};
  & svg {
    font-size: 3rem;
  }
`;

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.navy_light};
  color: ${(props) => props.theme.color.gray_light};
  border-radius: 8px;
  margin: 0.25rem;
  width: 28%;
  ${(props) => props.theme.border_box};
  cursor: pointer;
`;

export default Profile;
