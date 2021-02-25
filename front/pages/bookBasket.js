import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import BasketCard from '../components/BasketCard';
import NoResult from '../components/NoResult';
import '../styles/bookBasket.scss'

const BookList = ()=>{
    
    const {bookBasket} = useSelector(state=>state.book)
    
    const onScroll = useCallback(e=>{
        console.log(e)
    })

    const basketCardList = bookBasket.map((book)=>{
        return <BasketCard book={book} key={book.isbn} />
    })

    return(
        <div className="book-basket" >
            {bookBasket.length>0? basketCardList : <NoResult msg='좋아하는 책을 담아주세요. &#10024;'/>}
        </div>
    )
}

export default BookList;