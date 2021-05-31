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
      dispatch(bookActions.fetchBookBasketAll());
    }
  }, [isLogin]);

  return (
    <Container>
      <DetailWrapper>
        <SearchBar />
        {detailBook ? <BookDetail /> : <NoResult msg="" />}
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
  ${(props) => props.theme.flex_column};
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.gray_light};

  @media ${(props) => props.theme.desktop} {
    width: 60%;
    height: 100%;
  }
`;

export default Search;
