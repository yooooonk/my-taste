import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BasketCard from '../components/basket/BasketCard';
import NoResult from '../components/book/NoResult';
import { bookActions } from '../redux/modules/book';
import { commonActions } from '../redux/modules/common';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';
import _ from 'lodash';

const BookBasket = ({ history }) => {
  const dispatch = useDispatch();
  const { bookBasket, loading } = useSelector((state) => state.book);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    console.log('%c 💗Shelf💗', 'color: rgb(0, 0, 0); font-size: 16px');
    console.log('검색 탭에서 하트를 누른 책 목록입니다');
    console.log(
      '책 읽음 버튼을 누르면 읽은 책을 calendar에서 확인할 수 있습니다'
    );
    console.log(
      '기록버튼을 누르면 책의 감상과 인상 깊은 문장을 기록할 수 있습니다.'
    );
    dispatch(commonActions.setCurrentMenu('shelf'));
    return () => {
      dispatch(commonActions.setCurrentMenu(null));
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasket());
    }
  }, [isLogin]);

  const goTo = (url) => {
    history.push(url);
  };
  const basketCardList = bookBasket.map((book) => {
    return <BasketCard key={book.id} book={book} goTo={goTo} />;
  });

  const onScroll = _.throttle((e) => {
    if (loading) return;

    const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );
    if (scrollPer > 80) {
      dispatch(bookActions.fetchBookBasket());
    }
  }, 300);
  return (
    <Container onScroll={onScroll}>
      {basketCardList}
      <PulseLoader loading={loading} css={spinnerStyle} color="#3a5378" />
      {!loading && bookBasket.length === 0 && (
        <NoResult msg="좋아하는 책을 담아주세요. &#10024;" />
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.orange};
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, auto));

  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(auto-fit, minmax(20%, 20%));
    grid-template-rows: repeat(auto-fit, minmax(40%, 40%));
  }
`;

const spinnerStyle = css`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export default BookBasket;
