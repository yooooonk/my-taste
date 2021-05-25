import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { bookActions } from '../../redux/modules/book';
import styled from 'styled-components';

const BookDetail = () => {
  const { detailBook, dashBoard } = useSelector((state) => state.book);
  const { isLogin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const authors = `${detailBook.authors[0]} ${
    detailBook.authors.length > 2 ? '외' : ''
  }`;
  const status = `${detailBook.status ? '' : '절판'}`;

  const basketBook = dashBoard.find((v) => v.isbn === detailBook.isbn);

  const onLike = useCallback(() => {
    dispatch(bookActions.fetchCreateBookBasket(detailBook));
  });

  const onUnlike = useCallback(() => {
    dispatch(bookActions.fetchDeleteBookBasket(basketBook.id));
  });

  return (
    <DetailContainer>
      <Thumbnail>
        <img src={detailBook.thumbnail} alt="thumbnail" />
        {isLogin && (
          <ButtonBox>
            {basketBook ? (
              <FaHeart className="icon like" onClick={onUnlike} />
            ) : (
              <FaHeart className="icon unlike" onClick={onLike} />
            )}
          </ButtonBox>
        )}
      </Thumbnail>
      <Contents>
        <span className="title">{detailBook.title}</span>
        <span className="author">
          {authors} | {detailBook.translators}
        </span>

        <span className="publisher">{detailBook.publisher} </span>
        <span className="price">
          &#128181;{detailBook.price}원 <span>{status}</span>{' '}
        </span>
        <span className="description">
          {detailBook.contents.substr(0, 80)}...
          <a href={detailBook.url} target="_blank" rel="noreferrer">
            {' '}
            자세히
          </a>
        </span>
      </Contents>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Thumbnail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;

  img {
    width: 75%;
    border-radius: 20px;
    box-shadow: $shadow rgba(255, 99, 99, 0.2);
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & .icon {
    margin: 10px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 30%;
    cursor: pointer;
    &:hover {
      box-shadow: 3px 3px 10px rgba(180, 132, 132, 0.5);
    }
  }

  & .like {
    color: ${(props) => props.theme.main_color};
    border: 1px solid ${(props) => props.theme.main_color};
  }

  & .unlike {
    color: pink;
    border: 2px dotted pink;

    &:hover {
    }
  }

  & .penceil {
    color: pink;
    border: 2px dotted $mainColor;
  }
`;

const Contents = styled.div`
  width: 50%;

  span {
    display: block;
    margin: 1vh 0;
  }

  .title {
    font-size: 1.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .author,
  .publisher {
    font-size: 0.9rem;
  }

  .description {
    height: 100px;
    font-size: 0.75rem;
    a {
      color: ${(props) => props.theme.main_color};
    }
  }

  .price {
    font-size: 0.9rem;
    span {
      display: inline-block;
      background-color: pink;
      color: white;
      border-radius: 15px;
      text-align: center;
      width: 40px;
    }
  }
`;

export default BookDetail;
