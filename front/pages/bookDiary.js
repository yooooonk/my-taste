import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookDiaryRequest } from "../modules/book";


const BookPost = ()=>{
    const dispatch = useDispatch();
    const {bookDiary} = useSelector(state=>state.book)
    useEffect(()=>{
        dispatch(getBookDiaryRequest());
    },[])
    return(
        <div>
            책크크크
        </div>
    )
}

export default BookPost;