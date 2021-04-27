import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt, FaTrashAlt, FaBookOpen } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import styled from 'styled-components';

const BasketCard = ({ book }) => {
  const dispatch = useDispatch();

  const onRemove = useCallback((e) => {
    console.log('삭제');
    //dispatch(bookUnlikeRequest(book.isbn));
  });

  const onRead = useCallback((e) => {
    console.log('읽음');
    //dispatch(updateBookStateRequest({ id: book._id, state: 'isRead' }));
  });

  const onWrite = useCallback((e) => {
    console.log('쓰기');
  });
  return (
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
      <div className="button-box">
        {book.isRead ? (
          <BsBook className="icon can done" onClick={onRead} />
        ) : (
          <BsBook className="icon can" onClick={onRead} />
        )}
        {book.isWrite ? (
          <FaPencilAlt className="icon penceil done" onClick={onWrite} />
        ) : (
          <FaPencilAlt className="icon penceil" onClick={onWrite} />
        )}

        <FaTrashAlt className="icon can" onClick={onRemove} />
      </div>
    </Card>
  );
};

const Card = styled.div`
  margin: 1vw;
  width: 150px;
  height: 225px;
  border-bottom: 1px solid rgb(122, 122, 122);
`;

const Info = styled.div``;

const Content = styled.div``;
export default BasketCard;
