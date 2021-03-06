import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import BasketCard from '../components/BasketCard';
import NoResult from '../components/NoResult';
import '../styles/bookBasket.scss'

const BookList = ()=>{
    
    const {bookBasket} = useSelector(state=>state.book)
    
    const basketCardList = bookBasket.map((book)=>{
        return <BasketCard book={book} key={book._id} />
    })

    return(
        <div className="book-basket" >
           {/*  <div className="filter-box">
                <span># 읽은 책</span>
                <span># 안 읽은 책</span>
            </div> */}
            <div className="card-container">

            {bookBasket.length>0? basketCardList : <NoResult msg='좋아하는 책을 담아주세요. &#10024;'/>}
            </div>
        </div>
    )
}

export default BookList;