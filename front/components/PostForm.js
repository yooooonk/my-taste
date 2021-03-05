import { useCallback, useRef, useState } from "react";
import { FaTimesCircle, FaTimes } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { writeBookDiraryRequest } from "../modules/book";
import { removeImage, uploadImageRequest } from "../modules/utill";

import ImageForm from "./ImageForm";
import PhraseInput from "./PhraseInput";



const PostForm = ({msg})=>{
    const dispatch = useDispatch();
    const {phraseInputList,detailBook} = useSelector(state=>state.book)
    const {imagePath} = useSelector(state=>state.utill)
    const [value, onChangeValue] =  useInput('');

    const onSubmit = useCallback(()=>{
            
      const src = imagePath? imagePath:detailBook.thumbnail
      
      const payload = {
          src,
          title:detailBook.title,
          isbn:detailBook.isbn,
          authors:detailBook.authors,
          phrases:phraseInputList,
          comment:value
      }

      dispatch(writeBookDiraryRequest(payload))
    },[value])

    return (
      <div className="post-form">
          <section className="head">
                <FaTimesCircle className="icon"/>
          </section>
          
          <section className="body">            
            <ImageForm />  
            <PhraseInput />          
            <textarea onChange={onChangeValue}></textarea>                
            <button onClick={onSubmit}>저장</button>
            
          </section>
      </div>
    );
};


export default PostForm;