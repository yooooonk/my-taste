import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Diary from "../components/Diary";
import { getBookDiaryRequest } from "../modules/book";


const BookPost = ()=>{
    const dispatch = useDispatch();
    const {bookDiary} = useSelector(state=>state.book)
    useEffect(()=>{
        dispatch(getBookDiaryRequest());
    },[])

    useEffect(()=>{
        console.log(bookDiary)
    },[bookDiary])

    const mapToDiary = bookDiary.map(d=>{
        return <Diary diary={d} key={d._id}/>
    })
    return(
        <div>
            {mapToDiary}
        </div>
    )
}

export default BookPost;