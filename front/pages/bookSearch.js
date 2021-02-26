
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import BookDetail from '../components/BookDetail';
import BookSearchList from '../components/BookSearchList';
import NoResult from '../components/NoResult';
import PostForm from '../components/PostForm';
import SearchBar from '../components/SearchBar';
import '../styles/bookSearch.scss'

const BookSearch = ()=>{
    const {detailBook} = useSelector((state)=>state.book)
    const [open, setOpen] = useState(false);

    const openForm = useCallback(()=>{
        console.log('openForm')
    },[open])
      
    return(
        <div className="book-search">
            <SearchBar />
            {detailBook? <BookDetail onWrite={openForm}/> : <NoResult msg='좋아하는 책을 검색해주세요 &#128151;' />}
            <BookSearchList />
            <PostForm />
        </div>
    )
}

export default BookSearch;