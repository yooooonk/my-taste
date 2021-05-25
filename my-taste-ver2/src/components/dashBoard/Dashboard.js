import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../../redux/modules/book';
import DashboardCard from './DashboardCard';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { dashBoard, loading } = useSelector((state) => state.book);

  const [totalBookCnt, setTotalBookCnt] = useState(0);
  const [isReadCnt, setIsReadCnt] = useState(0);
  const [isWriteCnt, setIsWriteCnt] = useState(0);
  useEffect(() => {
    dispatch(bookActions.fetchBookBasketAll());
  }, []);

  useEffect(() => {
    setTotalBookCnt(dashBoard.length);

    const isRead = dashBoard.reduce((acc, cur) => {
      if (cur.readDate) {
        acc++;
      }

      return acc;
    }, 0);

    const isWrite = dashBoard.reduce((acc, cur) => {
      if (cur.postId) {
        acc++;
      }

      return acc;
    }, 0);

    setIsReadCnt(isRead);
    setIsWriteCnt(isWrite);
  }, [dashBoard]);

  return (
    <Container>
      <CardWrapper>
        <DashboardCard data={totalBookCnt} type={'basketCount'} />
        <DashboardCard data={isReadCnt} type={'isReadCount'} />
        <DashboardCard data={isWriteCnt} type={'isWriteCount'} />
      </CardWrapper>
      <PulseLoader loading={loading} css={spinnerStyle} color="pink" />
    </Container>
  );
};

Dashboard.propTypes = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: skyblue;
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
export default Dashboard;
