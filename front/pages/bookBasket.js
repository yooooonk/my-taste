import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import BasketCard from '../components/BasketCard';
import NoResult from '../components/NoResult';
import '../styles/bookBasket.scss'
import Diary from "../components/Diary";

const BookList = ()=>{
    
    const {bookBasket,bookDiaryone} = useSelector(state=>state.book)
    const onWrite =  useCallback((book)=>(e)=>{
        console.log(book)
    },[bookDiaryone])
    const basketCardList = bookBasket.map((book)=>{
        return <BasketCard book={book} key={book._id} onWrite={onWrite}/>
    })

    
    const diaryPopup = ()=>{
        return <Diary diary={d} />
    }

    return(
        <div className="book-basket" >
           {/*  <div className="filter-box">
                <span># 읽은 책</span>
                <span># 안 읽은 책</span>
            </div> */}
            <div className="card-container">

            {bookBasket.length>0? basketCardList : <NoResult msg='좋아하는 책을 담아주세요. &#10024;'/>}
            </div>
            {diaryPopup}
        </div>
    )
}

export default BookList;