import { useCallback, useRef, useState } from "react";
import { FaTimesCircle, FaTimes } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { removeImage, uploadImageRequest } from "../modules/utill";

import ImageForm from "./ImageForm";
import PhraseInput from "./PhraseInput";



const PostForm = ({msg})=>{
    const dispatch = useDispatch();
    const {phraseInputList} = useSelector(state=>state.book)
    const {imagePath} = useSelector(state=>state.utill)
    const [value, onChangeValue] =  useInput('');

    const onSubmit = useCallback(()=>{
      console.log(imagePath, phraseInputList)
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