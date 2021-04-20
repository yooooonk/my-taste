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

const Search = () => {
  const { detailBook, isPostFormOpen } = useSelector((state) => state.book);
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasket());
    }
    return () => {
      dispatch(bookActions.clearBookState());
    };
  }, [isLogin]);

  const onWrite = useCallback(
    (isWrite) => () => {
      console.log('디테일에서 쓰기', isWrite);
      if (!isWrite._id) {
        //dispatch(setIsPostFormOpen(true));
      }
    },
    []
  );
  return (
    <Container>
      <SearchBar />
      <DetailWrapper>
        {detailBook ? (
          <BookDetail onWrite={onWrite} />
        ) : (
          <NoResult msg="좋아하는 책을 검색해주세요 &#128151;" />
        )}
      </DetailWrapper>
      <SearchList />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  height: 100%;
  //background-size: contain;
`;

const DetailWrapper = styled.div`
  background-color: yellow;
  width: 100%;
`;

export default Search;
