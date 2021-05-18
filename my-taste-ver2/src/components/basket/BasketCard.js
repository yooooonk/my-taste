import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt, FaTrashAlt, FaBookOpen } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import styled from 'styled-components';
import { bookActions } from '../../redux/modules/book';
import { actionCreators as imageActions } from '../../redux/modules/image';
import Dialog from '../Dialog';

const BasketCard = ({ book, goTo }) => {
  const dispatch = useDispatch();

  const onRemove = useCallback((e) => {
    if (window.confirm('basket에서 삭제하시겠습니까?')) {
      dispatch(bookActions.fetchDeleteBookBasket(book.id));
    }
  });

  const onRead = useCallback((e) => {
    dispatch(bookActions.fetchUpdateIsRead(book.id, !book.isRead));
  });

  const onWrite = useCallback((e) => {
    console.log(book.diaryId);
    if (book.diaryId) {
      goTo(`/edit/${book.diaryId}`);
    } else {
      goTo(`/write/${book.id}`);
      dispatch(imageActions.setPreview(book.thumbnail));
    }
  });

  return (
    <>
      <Card>
        <Info href={book.url} target="_blank">
          <img src={book.thumbnail} />
          <Content className="content">
            <span className="title">
              <b>{book.title}</b>
            </span>
            <span className="author">{book.authors}</span>
            <span className="publisher">{book.publisher}</span>
          </Content>
        </Info>
        <ButtonBox>
          <I done={book.isRead}>
            <BsBook onClick={onRead} />
          </I>
          <I done={book.diaryId}>
            <FaPencilAlt onClick={onWrite} />
          </I>
          <I>
            <FaTrashAlt onClick={onRemove} />
          </I>
        </ButtonBox>
      </Card>
    </>
  );
};

const Card = styled.div`
  margin: 1vw;
  width: 150px;
  height: 225px;
  border-bottom: 1px solid rgb(122, 122, 122);
`;

const Info = styled.div`
  ${(props) => props.theme.flex_column};

  img {
    width: 85%;
    height: 180px;
  }
  &:hover .content {
    opacity: 1;
    transform: translateY(-10px);
  }
`;

const Content = styled.div`
  position: relative;
  background-color: rgba(245, 245, 245, 0.774);
  color: rgb(65, 65, 65);
  width: 90%;
  top: -50px;
  border-radius: 12px;
  transition: 0.3s ease-in-out;
  opacity: 0;

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  position: relative;
  top: -50px;
  justify-content: space-around;
`;

const I = styled.span`
  cursor: pointer;
  & {
    color: ${(props) => (props.done ? 'red' : 'gray')};
  }
`;
export default BasketCard;
