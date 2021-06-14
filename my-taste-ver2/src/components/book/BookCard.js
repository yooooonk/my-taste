import propTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../../redux/modules/book';
import styled from 'styled-components';
import { BiBook } from 'react-icons/bi';
const BookCard = ({ book, changeCardStyle }) => {
  const dispatch = useDispatch();

  const cardRef = useRef();

  const onClickBookCard = (e) => {
    dispatch(bookActions.setDetailBook(book));

    changeCardStyle(cardRef.current);
  };

  return (
    <Container onClick={onClickBookCard} ref={cardRef}>
      <BookWrapper>
        {book.thumbnail && <Thumbnail url={book.thumbnail} />}
        {!book.thumbnail && <BiBook />}
      </BookWrapper>

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
  margin: 1rem;
  padding: 5px;

  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
  ${(props) => props.theme.border_box};

  &:hover {
    background-color: rgb(236, 236, 236, 0.9);
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

const BookWrapper = styled.div`
  width: 30%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.yellow_light};
  border-radius: 9px;

  & svg {
    font-size: 2rem;
    color: ${(props) => props.theme.color.yellow};
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 9px;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  ${(props) => props.theme.border_box};
  color: ${(props) => props.theme.color.navy};

  & span.title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }

  & .author,
  & .publisher {
    font-size: 0.75rem;
  }
`;
export default BookCard;
