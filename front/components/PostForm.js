import { useCallback, useEffect, useState } from "react";
import { FaTimesCircle} from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { addPhrase, clearAllCompnent, clearPhraseList, closeWritePopup, setIsPostFormOpen, writeBookDiraryRequest } from "../modules/book";
import { removeImage } from "../modules/utill";
import { Switch } from 'antd';
import ImageForm from "./ImageForm";
import PhraseInput from "./PhraseInput";



const PostForm = ()=>{
    const dispatch = useDispatch();
    const {phraseInputList,detailBook} = useSelector(state=>state.book)    
    const {imagePath} = useSelector(state=>state.utill)
    const [value, onChangeValue, setValue] =  useInput('');
    const [isPhrase,setIsPhrase] = useState(false)
    const [isOverTen, setIsOverTen] = useState(false)

    useEffect(()=>{
      setValue('')      
    },[])

    const onSubmit = useCallback(()=>{
      if(isPhrase){
        addPhrase()
      }else{
        writeDiary()
      }
      
    },[value,isPhrase])
    const addPhrase = useCallback(e=>{
      if(!value){
        alert('문장을 입력해주세요 :)')
      }
  
      if(phraseInputList.length>=10){
          setIsOverTen(true);
          return;
      }

        

        const id = getId();
        
        dispatch(addPhrase({id,phrase:value}))
        setValue('')
        setIsOverTen(false);
  
      
    },[value,phraseInputList])

    const writeDiary = useCallback(e=>{
      console.log('저장')
      if(imagePath || phraseInputList ||value){
        const src = imagePath? imagePath:detailBook.thumbnail
      
        let copyValue = value
        //TODO : \n 처리
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
    },[value,imagePath,phraseInputList])
    const onClose = useCallback(()=>{
      dispatch(closeWritePopup())
      setValue('')
      
    },[])
    
    const mapToPhraseItem = phraseInputList.map((p)=>{
      return <PhraseItem phraseData={p} key={p.id} />
    })

    const onChangeSwtich = useCallback((checked)=>{      
      setIsPhrase(checked)
      console.log(`switch to ${checked}`);
    },[])

    return (
      <div className="post-form">
          <section className="head">
                <FaTimesCircle className="icon" onClick={onClose}/>
          </section>
          
          <section className="body">            
              <div className="up-part">
                  <ImageForm />  
                  <div className="phrase-wrapper">          
                      {mapToPhraseItem}
                  </div>        
              </div>
              <div className="down-part">
                  <div className="switch-wrapper">
                      <Switch className="switch" checkedChildren="문장" unCheckedChildren="감상" onChange={onChangeSwtich} />
                      {isOverTen? <span className="error-msg">10개까지만 등록가능합니다</span> : ''}
                  </div>  
                  <div className="textarea-wrapper">
                    <textarea onChange={onChangeValue} placeholder={isPhrase?"기억하고 싶은 문장이 있었나요?":"감상을 남겨주세요"}></textarea>                
                    <button onClick={onSubmit}>{isPhrase? '문장 추가':'저장'}</button>
                  </div>                
              </div>
            
            
          </section>
      </div>
    );
};


export default PostForm;