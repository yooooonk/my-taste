import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BookDetail,
  NoResult,
  SearchBar,
  SearchList
} from '../components/book';

const Search = () => {
  const { detailBook, isPostFormOpen } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      //dispatch(clearSearchCompnent());
    };
  }, []);

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
      {detailBook ? (
        <BookDetail onWrite={onWrite} />
      ) : (
        <NoResult msg="좋아하는 책을 검색해주세요 &#128151;" />
      )}
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

export default Search;
