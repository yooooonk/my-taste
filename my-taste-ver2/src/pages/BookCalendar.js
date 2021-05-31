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
      <PulseLoader loading={loading} css={spinnerStyle} color="pink" />
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
