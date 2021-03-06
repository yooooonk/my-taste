import useInput from "../hooks/useInput";
import { FaTimes } from "react-icons/fa"; 
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removePhrase } from "../modules/book";
const PhraseItem = ({phraseData})=>{
    const dispatch = useDispatch()
    const [value, onChangeValue, setValue] = useInput('');
    const [isEdit, setIsEdit] = useState(false)    
    const textInput = useRef();
    useEffect(()=>{
      setValue(phraseData.phrase)
    },[phraseData])
    
    
    const onRemovePhrase = useCallback((e)=>{
      dispatch(removePhrase(phraseData.id))
      setValue('')
    },[phraseData])

    const onClickPhrase = useCallback((e)=>{
        setIsEdit(true);
        
        process.nextTick(()=>{
          textInput.current.focus()
          debugger
        })
        

    },[isEdit])
   
    return (
      <div className="phrase-item">
        
          {isEdit?
                <input type="text" onChange={onChangeValue} onBlur={()=>setIsEdit(false)} value={value} ref={textInput}></input>
              : (<div>
              <span onClick={onClickPhrase}>{phraseData.phrase}</span>
              <FaTimes className="icon" onClick={onRemovePhrase} /></div>
              )
            } 
      </div>
    );
};


export default PhraseItem;

