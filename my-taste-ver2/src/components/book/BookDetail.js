import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaPencilAlt } from 'react-icons/fa';
import { bookActions } from '../../redux/modules/book';
//import { bookLikeRequest, bookUnlikeRequest } from "../modules/book";
const BookDetail = ({ onWrite }) => {
  const { detailBook, bookBasket } = useSelector((state) => state.book);
  const { isLogin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const authors = `${detailBook.authors[0]} ${
    detailBook.authors.length > 2 ? '외' : ''
  }`;
  const status = `${detailBook.status ? '' : '절판'}`;

  const basketBook = bookBasket.find((v) => v.isbn === detailBook.isbn);

  const onLike = useCallback(() => {
    console.log('좋아요');
    dispatch(bookActions.likeBook(detailBook));
    //dispatch(bookLikeRequest(detailBook))
  });

  const onUnlike = useCallback(() => {
    console.log('취소', basketBook.id);

    dispatch(bookActions.dislikeBook(basketBook.id));
    //console.log(detailBook);
    //dispatch(bookUnlikeRequest(detailBook.isbn))
  });

  return (
    <div className="BookDetail">
      <div className="bookInfo">
        <div className="bookInfo-thumbnail">
          <img src={detailBook.thumbnail} />
          {isLogin && (
            <div className="button-box">
              {basketBook ? (
                <FaHeart className="icon like" onClick={onUnlike} />
              ) : (
                <FaHeart className="icon unlike" onClick={onLike} />
              )}
              <FaPencilAlt
                className="icon unlike"
                onClick={onWrite(detailBook)} //onWrite를 꼭 props로?
              />
              {/* {inBasketBook?.isWrite ? (
              <FaPencilAlt className="icon like" onClick={onWrite(book)} />
            ) : (
              <FaPencilAlt
                className="icon unlike"
                onClick={onWrite(detailBook)}
              />
            )} */}
            </div>
          )}
        </div>
        <div className="bookInfo-content">
          <span className="title">{detailBook.title}</span>
          <span className="author">{authors}</span>
          <span className="translator">{detailBook.translators}</span>
          <span className="publisher">{detailBook.publisher} </span>
          <span className="price">
            &#128181;{detailBook.price}원 <span>{status}</span>{' '}
          </span>
          <span className="description">
            {detailBook.contents}
            <a href={detailBook.url} target="_blank">
              {' '}
              자세히
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default BookDetail;
