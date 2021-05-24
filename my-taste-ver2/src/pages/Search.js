import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BookDetail,
  NoResult,
  SearchBar,
  SearchList
} from '../components/book';
import { bookActions } from '../redux/modules/book';

const Search = (props) => {
  const { history } = props;
  const { detailBook } = useSelector((state) => state.book);
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(bookActions.clearBookState());
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasket());
    }
  }, [isLogin]);

  return (
    <Container>
      <SearchBar />
      <DetailWrapper className="detail">
        {detailBook ? (
          <BookDetail />
        ) : (
          <NoResult msg="좋아하는 책을 검색해주세요 &#128151;" />
        )}
      </DetailWrapper>
      <SearchList className="list" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  height: 100%;

  ${(props) => props.theme.flex_column};

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;

const DetailWrapper = styled.div`
  width: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;

  @media ${(props) => props.theme.desktop} {
    height: 100%;
  }
`;

export default Search;
