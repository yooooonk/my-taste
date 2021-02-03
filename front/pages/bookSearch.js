import BookDetail from '../components/BookDetail';
import BookSearchList from '../components/BookSearchList';
import SearchBar from '../components/SearchBar';
import '../styles/bookSearch.scss'

const BookSearch = ()=>{
    return(
        <div className="bookSearch">
            <SearchBar />
            <BookDetail />
            <BookSearchList />
        </div>
    )
}

export default BookSearch;