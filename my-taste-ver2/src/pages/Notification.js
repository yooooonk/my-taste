import React, { useEffect, useState } from 'react';
import { Grid, Text } from '../elements';
import Card from '../components/Card';
import { realtime } from '../shared/firebase';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import styled from 'styled-components';

const Notification = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    if (!user) return;

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    const _noti = notiDB.orderByChild('insert_dt');
    _noti.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });

        setNoti(_noti_list);
      }
    });
    return () => {};
  }, [user]);

  return (
    <Container>
      <Header bg="#c5dee2">
        <Text bold>알림확인</Text>
        <i />
      </Header>
      <NotiWrapper>
        {noti.map((n, idx) => {
          return <Card {...n} key={`noti_${idx}`} />;
        })}
      </NotiWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_column};
  background-color: ${(props) => props.theme.color.blue_light};
  padding: 1rem;
  ${(props) => props.theme.border_box};
`;

const NotiWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Notification;
