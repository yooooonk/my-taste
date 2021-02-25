
import { useSelector } from 'react-redux';
import BookDetail from '../components/BookDetail';
import BookSearchList from '../components/BookSearchList';
import NoResult from '../components/NoResult';
import SearchBar from '../components/SearchBar';
import '../styles/bookSearch.scss'

const BookSearch = ()=>{
    const {detailBook} = useSelector((state)=>state.book)
    
      
    return(
        <div className="book-search">
            <SearchBar />
            {detailBook? <BookDetail /> : <NoResult msg='좋아하는 책을 검색해주세요 &#128151;' />}
            <BookSearchList />
        </div>
    )
}

export default BookSearch;