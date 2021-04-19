import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollWrapper from '../../shared/ScrollWrapper';
//import book from '../../redux/modules/book';
import { BookCard, NoResult } from '../book';
import styled from 'styled-components';

const SearchList = () => {
  const dispatch = useDispatch();
  const { searchList, is_end, loading } = useSelector((state) => state.book);

  const mapToComponent = searchList?.map((book) => {
    return <BookCard book={book} key={book.isbn} />;
  });

  const searchNext = useCallback((e) => {
    console.log('다음!');
    /* const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );

    if (scrollPer > 70) {
      if (!is_end && !loading) {
        const page = searchList.length / 10 + 1;
        //dispatch(book.bookSearchRequest({ page, keyword }));
      }
    } */
  });

  return (
    <Container>
      {searchList.length > 0 && (
        <ScrollWrapper
          callNext={searchNext}
          is_next={!is_end}
          loading={loading}
        >
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
