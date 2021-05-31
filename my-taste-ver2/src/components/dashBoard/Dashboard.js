import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../../redux/modules/book';
import { actionCreators as postActions } from '../../redux/modules/post';
import DashboardCard from './DashboardCard';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const { dashBoard, loading } = useSelector((state) => state.book);
  const { randomPhrases } = useSelector((state) => state.post);

  const [totalBookCnt, setTotalBookCnt] = useState(0);
  const [isReadCnt, setIsReadCnt] = useState(0);
  const [isWriteCnt, setIsWriteCnt] = useState(0);

  const [phrase, setPhrase] = useState('');

  // dashboard에서 사용할 데이터 가져오기
  useEffect(() => {
    console.log('%c 💗Dashboard💗', 'color: rgb(0, 0, 0); font-size: 16px');
    console.log('내가 담은 책, 읽은 책, 쓴 포스트 통계와');
    console.log('오늘의 문장으로 기분을 환기해보세요');

    dispatch(bookActions.fetchBookBasketAll());
    dispatch(postActions.fetchRandomPhrase());
  }, []);

  // 통계 데이터
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

  // 랜덤 문구
  useEffect(() => {
    const len = randomPhrases.length;
    const idx = Math.floor(Math.random() * len);
    setPhrase(randomPhrases[idx]);
  }, [randomPhrases]);

  return (
    <Container>
      <CardWrapper>
        <DashboardCard data={totalBookCnt} type="basketCount" />
        <DashboardCard data={isReadCnt} type="isReadCount" />
        <DashboardCard data={isWriteCnt} type="isWriteCount" />
      </CardWrapper>
      <RandomPhraseWrapper>
        <Title>Today's Phrase</Title>
        <PhraseBox>"{phrase}"</PhraseBox>
      </RandomPhraseWrapper>
      <PulseLoader loading={loading} css={spinnerStyle} color="pink" />
    </Container>
  );
};

Dashboard.propTypes = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_column};
  ${(props) => props.theme.border_box};
  justify-content: center;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 50%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  padding: 1rem;
  ${(props) => props.theme.border_box};
`;

const RandomPhraseWrapper = styled.div`
  ${(props) => props.theme.border_box};
  color: ${(props) => props.theme.color.navy};
  width: 100%;
  height: 40%;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 0.5rem 0;
`;

const PhraseBox = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: center;
  background-color: ${(props) => props.theme.color.gray_light};
  width: 100%;
  height: 80%;
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
