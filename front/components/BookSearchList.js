import { useSelector } from "react-redux";
import book from "../modules/book";
import BookCard from "./BookCard";
import NoSearchResult from './NoSearchResult'

const BookSearchList = ()=>{
    const {bookSearchList} = useSelector((state)=>state.book)
    
    const mapToComponent =  bookSearchList.map((book)=>{
      
      return <BookCard book={book} key={book.isbn} />
    })

  

    return (
      <div className="BookSearchList">
        
        { bookSearchList.length>0? mapToComponent : <NoSearchResult/>}
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default BookSearchList;