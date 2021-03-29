import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Diary from "../components/Diary";
import { getBookDiaryRequest } from "../modules/book";
import '../styles/bookDiary.scss'

const BookDiary = ()=>{
    const dispatch = useDispatch();
    const {bookDiary} = useSelector(state=>state.book)
    useEffect(()=>{
        dispatch(getBookDiaryRequest());
    },[])
    
    const mapToDiary = bookDiary.map(d=>{
        return <Diary diary={d} key={d._id}/>
    })
    return(
        <div className="book-diary-container">
            {mapToDiary}
        </div>
    )
}

export default BookDiary;