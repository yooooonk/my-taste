import { useCallback } from "react";
import { FaTimesCircle} from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { clearPhraseList, setIsPostFormOpen, writeBookDiraryRequest } from "../modules/book";
import { removeImage } from "../modules/utill";
import ImageForm from "./ImageForm";
import PhraseInput from "./PhraseInput";



const PostForm = ()=>{
    const dispatch = useDispatch();
    const {phraseInputList,detailBook} = useSelector(state=>state.book)
    const {imagePath} = useSelector(state=>state.utill)
    const [value, onChangeValue, setValue] =  useInput('');

    const onSubmit = useCallback(()=>{

      if(imagePath || phraseInputList ||value){
        const src = imagePath? imagePath:detailBook.thumbnail
      
        let copyValue = value
        copyValue = copyValue.replaceAll("\n", "<br/>");
          
        const payload = {
            src,
            title:detailBook.title,
            isbn:detailBook.isbn,
            authors:detailBook.authors,
            phrases:phraseInputList,
            comment:copyValue
        }
  
        dispatch(writeBookDiraryRequest(payload))
      }else{
        alert('내용을 입력해주세요')
      }
    },[value])

    const onClose = useCallback(()=>{
      dispatch(removeImage())
      dispatch(clearPhraseList())
      setValue('')
      dispatch(setIsPostFormOpen(false))
      
    },[])

    return (
      <div className="post-form">
          <section className="head">
                <FaTimesCircle className="icon" onClick={onClose}/>
          </section>
          
          <section className="body">            
              <div className="up-part">
                  <ImageForm />  
                  <PhraseInput />          
              </div>
              <div className="down-part">
                  <textarea onChange={onChangeValue} placeholder="감상을 남겨주세요"></textarea>                
                  <button onClick={onSubmit}>저장</button>
              </div>
            
            
          </section>
      </div>
    );
};


export default PostForm;