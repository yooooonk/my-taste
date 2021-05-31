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
      <MetaData>
        <Thumbnail src={detailBook.thumbnail} alt="thumbnail" />
        <DataBox>
          <Title>{detailBook.title}</Title>
          <Contents>
            <tbody>
              <tr>
                <td>저자</td>
                <td>{authors}</td>
              </tr>
              <tr>
                <td>출판사</td>
                <td>{detailBook.publisher} </td>
              </tr>
              <tr>
                <td>출판일</td>
                <td>{detailBook.datetime.split('T')[0]}</td>
              </tr>
              <tr>
                <td>가격</td>
                <td>{detailBook.price}</td>
              </tr>
            </tbody>
          </Contents>
          {isLogin && (
            <ButtonBox>
              {basketBook ? (
                <FaHeart className="icon like" onClick={onUnlike} />
              ) : (
                <FaHeart className="icon unlike" onClick={onLike} />
              )}
            </ButtonBox>
          )}
        </DataBox>
      </MetaData>
      <Description>
        {detailBook.contents.substr(0, 100)}...
        <br />
        <a href={detailBook.url} target="_blank" rel="noreferrer">
          {' '}
          자세히
        </a>
      </Description>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  ${(props) => props.theme.flex_column};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  padding: 1rem;
  ${(props) => props.theme.border_box};
`;

const MetaData = styled.div`
  ${(props) => props.theme.flex_row};
  ${(props) => props.theme.border_box};
  width: 100%;

  color: ${(props) => props.theme.color.navy};
`;

const Thumbnail = styled.img`
  border-radius: 1rem;
  width: 30%;

  @media ${(props) => props.theme.desktop} {
    width: 40%;
  }
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
 */
  /* img {
    width: 75%;
    border-radius: 20px;
    box-shadow: $shadow rgba(255, 99, 99, 0.2);
  } */
`;

const DataBox = styled.div`
  width: 50%;
  ${(props) => props.theme.flex_column};
  height: 100%;
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
    background-color: ${(props) => props.theme.color.navy};
  }

  & .like {
    color: ${(props) => props.theme.color.red};

    &:hover {
      color: ${(props) => props.theme.color.gray_light};
    }
  }

  & .unlike {
    color: white;
    &:hover {
      color: ${(props) => props.theme.color.red};
    }
  }
`;

const Contents = styled.table`
  width: 100%;
  font-size: 0.85rem;
`;

const Title = styled.span`
  font-size: 1.5rem;
  width: 100%;
  overflow: hidden;

  font-weight: bold;
  @media ${(props) => props.theme.mobile} {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media ${(props) => props.theme.tablet} {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Description = styled.div`
  display: none;
  margin: 1rem 0;
  font-size: 0.85rem;
  color: ${(props) => props.theme.color.navy};

  & a {
    color: ${(props) => props.theme.color.orange};
  }
  @media ${(props) => props.theme.desktop} {
    display: block;
  }
`;

export default BookDetail;
