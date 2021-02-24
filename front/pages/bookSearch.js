import { useSelector } from 'react-redux';
import BookDetail from '../components/BookDetail';
import BookSearchList from '../components/BookSearchList';
import NoDetailBook from '../components/NoDetailBook';
import SearchBar from '../components/SearchBar';
import '../styles/bookSearch.scss'

const BookSearch = ()=>{
    const {detailBook} = useSelector((state)=>state.book)
    return(
        <div className="book-search">
            <SearchBar />
            {detailBook? <BookDetail /> : <NoDetailBook />}
            <BookSearchList />
        </div>
    )
}

export default BookSearch;