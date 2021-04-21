import propTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../../redux/modules/book';
import styled from 'styled-components';

const BookCard = ({ book, changeCardStyle }) => {
  const dispatch = useDispatch();

  const cardRef = useRef();

  const onClickBookCard = useCallback((e) => {
    dispatch(bookActions.setDetailBook(book));

    changeCardStyle(cardRef.current);
  });

  return (
    <Container onClick={onClickBookCard} ref={cardRef}>
      <img src={book.thumbnail} />
      <Content>
        <span className="title">{book.title}</span>
        <span className="author">{book.authors}</span>
        <span className="publisher">{book.publisher}</span>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  height: 120px;
  margin: 10px 0;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  ${(props) => props.theme.border_box};

  &:hover {
    background-color: white;
  }

  img {
    border-radius: 10px;
    height: 90%;
    @media ${(props) => props.theme.desketop} {
      height: 90%;
    }
  }

  @media ${(props) => props.theme.tablet} {
    height: 30%;
    width: 600px;
    padding: 0;
  }

  @media ${(props) => props.theme.mobile} {
    height: 30%;
    width: 90%;
    padding: 0;
  }
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & span.title {
    font-size: large;
  }
`;
export default BookCard;
