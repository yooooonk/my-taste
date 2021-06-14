import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BookDetail,
  NoResult,
  SearchBar,
  SearchList
} from '../components/book';
import { bookActions } from '../redux/modules/book';
import { commonActions } from '../redux/modules/common';

const Search = (props) => {
  const { detailBook } = useSelector((state) => state.book);
  const { isLogin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('%c 💗책 검색💗', 'color: rgb(0, 0, 0); font-size: 16px');
    console.log('open api를 이용해 책을 검색하고,');
    console.log('하트를 누르면 shelf에 저장합니다.');
    dispatch(commonActions.setCurrentMenu('search'));
    return () => {
      dispatch(bookActions.clearBookState());
      dispatch(commonActions.setCurrentMenu(null));
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasketAll());
    }
  }, [isLogin]);

  return (
    <Container>
      <DetailWrapper>
        <SearchBar />
        {detailBook ? (
          <BookDetail />
        ) : (
          <NoResult msg="좋아하는 책을 검색해보세요" />
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

  ${(props) => props.theme.flex_column};

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;

const DetailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 35%;
  ${(props) => props.theme.flex_column};
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.gray_light};

  @media ${(props) => props.theme.desktop} {
    width: 60%;
    height: 100%;
  }
`;

export default Search;
