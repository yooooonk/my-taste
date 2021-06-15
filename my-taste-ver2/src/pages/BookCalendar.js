import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Calendar from '../components/calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';
import { bookActions } from '../redux/modules/book';
import { commonActions } from '../redux/modules/common';

const BookCalendar = (props) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const { dashBoard, loading } = useSelector((state) => state.book);

  useEffect(() => {
    console.log('%c 💗Calendar💗', 'color: rgb(0, 0, 0); font-size: 16px');
    console.log('shelf에서 읽음을 누른 날짜에 읽은 책을 저장해');
    console.log('독서량을 한 눈에 확인할 수 있습니다.');
    console.log('기록을 했다면 해당 책을 눌러 바로 포스트로 이동합니다');
    dispatch(commonActions.setCurrentMenu('calendar'));

    return () => {
      dispatch(commonActions.setCurrentMenu(null));
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasketAll());
    }
  }, [isLogin]);
  return (
    <Container>
      <Calendar />
      <PulseLoader loading={loading} css={spinnerStyle} color="#3a5378" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const spinnerStyle = css`
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default BookCalendar;
