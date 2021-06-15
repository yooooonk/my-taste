import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen, FaBookOpen, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { bookActions } from '../../redux/modules/book';
import { actionCreators as imageActions } from '../../redux/modules/image';
import moment from 'moment';

const BasketCard = ({ book, goTo }) => {
  const dispatch = useDispatch();

  const onRemove = (e) => {
    dispatch(bookActions.fetchDeleteBookBasket(book.id));
  };

  const onRead = (e) => {
    const readDate = moment().format('YYYYMMDD');

    if (book.readDate) {
      dispatch(bookActions.fetchUpdateBookBasket(book.id, { readDate: null }));
    } else {
      dispatch(bookActions.fetchUpdateBookBasket(book.id, { readDate }));
    }
  };

  const onWrite = async (e) => {
    if (book.postId) {
      goTo(`/edit/${book.postId}`);
    } else {
      await dispatch(imageActions.setPreview(book.thumbnail));
      goTo(`/write/${book.id}`);
    }
  };

  return (
    <Card>
      <Thumbnail src={book.thumbnail} alt="thumbnail" />
      <ButtonBox>
        <I done={book.readDate}>
          <FaBookOpen onClick={onRead} />
        </I>
        <I done={book.postId}>
          <FaPen onClick={onWrite} />
        </I>
        <I>
          <FaTrash onClick={onRemove} />
        </I>
      </ButtonBox>
    </Card>
  );
};

const Card = styled.div`
  margin: 1rem;
  padding: 0 0.5rem;
  background-color: ${(props) => props.theme.color.gray_light};
  border-radius: 0.5rem;
  transition: 0.3s all ease-out;
  justify-content: space-between;
  align-self: stretch;

  &:hover {
    transform: translateY(-10px);
  }
  ${(props) => props.theme.flex_column};
  justify-content: space-around;
  ${(props) => props.theme.border_box};
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 75%;
`;

const ButtonBox = styled.div`
  ${(props) => props.theme.flex_row};
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 15%;
  padding: 0 0.5rem;
`;

const I = styled.span`
  cursor: pointer;
  font-size: 1.25rem;
  transition: 0.2s all ease;
  color: ${(props) =>
    props.done ? props.theme.color.red : props.theme.color.navy_light};

  &:hover {
    color: ${(props) =>
      props.done ? props.theme.color.navy_light : props.theme.color.red};
  }
`;
export default BasketCard;
