import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollWrapper from '../../shared/ScrollWrapper';
//import book from '../../redux/modules/book';
import { BookCard, NoResult } from '../book';
import styled from 'styled-components';
import { bookActions } from '../../redux/modules/book';

const SearchList = () => {
  const dispatch = useDispatch();
  const { searchList, page, keyword, isEnd, loading } = useSelector(
    (state) => state.book
  );

  const mapToComponent = searchList?.map((book) => {
    return <BookCard book={book} key={book.isbn} />;
  });

  const searchNext = useCallback((e) => {
    //TODO : 다음이 너무 자주 호출됨
    if (!isEnd && !loading) {
      dispatch(bookActions.fetchBookList({ keyword, page: page + 1 }));
    }
  });

  return (
    <Container>
      {searchList.length > 0 && (
        <ScrollWrapper callNext={searchNext} is_next={!isEnd} loading={loading}>
          {searchList.map((book, idx) => {
            return <BookCard key={idx} book={book} key={book.isbn} />;
          })}
        </ScrollWrapper>
      )}

      {searchList.length === 0 && (
        <NoResult msg="검색결과가 없습니다. &#128166;" />
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;
`;

export default SearchList;
