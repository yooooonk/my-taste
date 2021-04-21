import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollWrapper from '../../shared/ScrollWrapper';
//import book from '../../redux/modules/book';
import { BookCard, NoResult } from '../book';
import styled from 'styled-components';
import { bookActions } from '../../redux/modules/book';

const SearchList = () => {
  const dispatch = useDispatch();
  const [preCard, setPreCard] = useState(null);
  const { searchList, page, keyword, isEnd, loading } = useSelector(
    (state) => state.book
  );

  const mapToComponent = searchList?.map((book) => {
    return <BookCard book={book} key={book.isbn} />;
  });
  const changeCardStyle = useCallback((target) => {
    console.log(preCard);
    if (preCard) {
      preCard.style.transform = `translateX(0px)`;
      preCard.style.backgroundColor = '';
    }

    setPreCard(target);
    target.style.transform = `translateX(-30px)`;
    target.style.backgroundColor = `white`;
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
            return (
              <BookCard
                changeCardStyle={changeCardStyle}
                key={idx}
                book={book}
                key={book.isbn}
              />
            );
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
  height: 70vh;
  background-color: ${(props) => props.theme.pink};

  background-color: yellow;
  ${(props) => props.theme.flex_column};
  justify-content: center;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.desktop} {
    height: 100%;
    width: 600px;
    padding: 0;
  }
`;

export default SearchList;
