
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookDetail from '../components/BookDetail';
import BookSearchList from '../components/BookSearchList';
import NoResult from '../components/NoResult';
import PostForm from '../components/PostForm';
import SearchBar from '../components/SearchBar';
import { bookLikeRequest, clearSearchCompnent, setIsPostFormOpen } from '../modules/book';
import '../styles/bookSearch.scss'
import '../styles/PostForm.scss'

const BookSearch = ()=>{
    const {detailBook, isPostFormOpen} = useSelector((state)=>state.book)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        return () => { //unMount
            dispatch(clearSearchCompnent())
        }
    },[])

    const onWrite = useCallback((isWrite)=>()=>{
        console.log('디테일에서 쓰기', isWrite)
        if(!isWrite){            
            dispatch(setIsPostFormOpen(true))
        }
        
    },[])
    
      
    return(
        <div className="book-search">
            <SearchBar />
            {detailBook? <BookDetail onWrite={onWrite}/> : <NoResult msg='좋아하는 책을 검색해주세요 &#128151;' />}
            <BookSearchList />
            {isPostFormOpen? <PostForm /> : ''}
        </div>
    )
}

export default BookSearch;