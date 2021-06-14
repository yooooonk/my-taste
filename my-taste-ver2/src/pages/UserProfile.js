import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Upload from '../shared/Upload';
import useInput from '../shared/useInput';
import { Input, Button, Image } from '../elements';
import user, { userActions } from '../redux/modules/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user?.user);
  const isMobile = useSelector((state) => state.common.isMobile);
  const preview = useSelector((state) => state.image.preview);

  const [userName, onChangeUserName, setUserName] = useInput('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  useEffect(() => {
    console.log(userInfo?.user_profile);
    if (!userInfo) return;

    setUserName(userInfo.user_name);
  }, [userInfo]);

  const updateUserProfile = () => {
    dispatch(userActions.updateProfile(userName));
  };

  if (!userInfo) return null;
  return (
    <Container>
      {!userInfo.user_profile && <Upload size={isMobile ? 90 : 25} />}
      {userInfo.user_profile && (
        <Image src={userInfo.user_profile} size={isMobile ? 90 : 25} />
      )}
      <FormTable>
        <Tr>
          <Th>이메일</Th>
          <Td>
            <Input disabled value={userInfo?.id} />
          </Td>
        </Tr>
        <Tr>
          <Th>닉네임</Th>
          <Td>
            <Input isGray _onChange={onChangeUserName} value={userName}></Input>
          </Td>
        </Tr>
      </FormTable>
      <Button width={isMobile ? '100%' : '50%'} _onClick={updateUserProfile}>
        수정하기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  background-color: ${(props) => props.theme.color.gray_light};
  ${(props) => props.theme.flex_column};
  align-items: center;
  justify-content: space-around;
`;

const FormTable = styled.div`
  color: ${(props) => props.theme.color.navy};
  width: 100%;
  padding: 1rem;
  ${(props) => props.theme.border_box};
  @media ${(props) => props.theme.desktop} {
    width: 50%;
  }
`;

const Tr = styled.div`
  ${(props) => props.theme.flex_row};
`;

const Th = styled.span`
  text-align: right;
  width: 30%;
`;

const Td = styled.span`
  width: 65%;
`;
export default UserProfile;
