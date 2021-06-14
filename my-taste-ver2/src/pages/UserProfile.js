import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Upload from '../shared/Upload';
import useInput from '../shared/useInput';
import { Input, Button } from '../elements';
import user from '../redux/modules/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user?.user);
  const isMobile = useSelector((state) => state.common.isMobile);
  const preview = useSelector((state) => state.image.preview);

  const [userName, onChangeUserName, setUserName] = useInput('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  useEffect(() => {
    console.log(userInfo?.id);
    if (!userInfo) return;

    setUserName(userInfo.user_name);
  }, [userInfo]);

  const updateUserProfile = () => {
    dispatch(user.updateProfile(userName));
  };

  if (!userInfo) return null;
  return (
    <Container>
      <Upload size={isMobile ? '95' : '20'} />
      <table>
        <tbody>
          <tr>
            <td>이메일</td>
            <td>
              <Input disabled isGray value={userInfo?.id} />
            </td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td>
              <Input _onChange={onChangeUserName} value={userName}></Input>
            </td>
          </tr>
          {/* <tr>
            <td>닉네임</td>
            <td>
              <Input isGray type="password"></Input>
            </td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td>
              <Input isGray type="password"></Input>
            </td>
          </tr> */}
        </tbody>
      </table>
      <Button _onClick={updateUserProfile}>수정하기</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  background-color: ${(props) => props.theme.color.gray_light};
  ${(props) => props.theme.flex_column};
`;
export default UserProfile;
