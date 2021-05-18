import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BasketCard from '../components/basket/BasketCard';
import NoResult from '../components/book/NoResult';
import Dialog from '../components/Dialog';
import { Button } from '../elements';
import { bookActions } from '../redux/modules/book';

const BookBasket = ({ history }) => {
  const dispatch = useDispatch();
  const { bookBasket } = useSelector((state) => state.book);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      dispatch(bookActions.fetchBookBasket());
    }
  }, [isLogin]);

  const goTo = (url) => {
    history.push(url);
  };
  const basketCardList = bookBasket.map((book) => {
    return <BasketCard key={book.id} book={book} goTo={goTo} />;
  });
  /*  const onWrite =  useCallback((book)=>(e)=>{
        console.log(book)
    },[bookDiaryone]) */

  /* const basketCardList = bookBasket.map((book) => {
    return <BasketCard book={book} key={book._id} onWrite={onWrite} />;
  }); */

  /*  useEffect(()=>{
        dispatch(getBookBasketRequest())
    },[])
    const diaryPopup = ()=>{
        return <Diary diary={d} />
    } */

  return (
    <Container>
      {basketCardList}
      {bookBasket.length == 0 && (
        <NoResult msg="좋아하는 책을 담아주세요. &#10024;" />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default BookBasket;
