import { useDispatch, useSelector } from "react-redux";
import * as book from "../modules/book";
import BookCard from "./BookCard";
import NoSearchResult from './NoSearchResult'

const BookSearchList = ()=>{
    const dispatch = useDispatch();
    const {bookSearchList, bookSearchRequest, is_end, keyword} = useSelector((state)=>state.book);
    
    const mapToComponent =  bookSearchList.map((book)=>{            
      return <BookCard book={book} key={book.isbn} />
    })

    const onScroll = (e)=>{

      const scrollPer = Math.floor(e.target.scrollTop/(e.target.scrollHeight-e.target.clientHeight)*100)

      if(scrollPer>70){
        
        if(!is_end && !bookSearchRequest){
          const page = bookSearchList.length/10 +1;           
          dispatch(book.bookSearchRequest({page,keyword}))
        }
      }
    }

    return (
      <div className="BookSearchList" onScroll={onScroll}  >        
        { bookSearchList.length>0? mapToComponent : <NoSearchResult/>}
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default BookSearchList;