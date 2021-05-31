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
      <PulseLoader loading={loading} css={spinnerStyle} color="#3a5378" />
      {basketCardList}
      {bookBasket.length === 0 && (
        <NoResult msg="좋아하는 책을 담아주세요. &#10024;" />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.orange};

  &::-webkit-scrollbar {
    display: none;
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
`;
export default BookBasket;
