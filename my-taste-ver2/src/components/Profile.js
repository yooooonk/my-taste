import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Wrapper, Image, Text } from '../elements';
import { userActions } from '../redux/modules/user';
import { FaUserAlt } from 'react-icons/fa';
import { history } from '../redux/configStore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NotiBadge from './NotiBadge';
const Profile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const logout = (e) => {
    dispatch(userActions.logout());
  };

  const editProfile = () => {
    history.push('/user');
  };

  const moveToPage = (url) => {
    history.push('/noti');
    // TODO moveToPage cokmmon으로 빼기
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
      <Tooltip title="알림">
        <IconButton onClick={() => moveToPage('/noti')}>
          <NotiBadge />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.navy};
  ${(props) => props.theme.flex_column};
  height: 85%;
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
