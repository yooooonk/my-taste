import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { addPhrase } from "../modules/book";
import PhraseItem from "./PhraseItem"

const PhraseInput = ()=>{
    const dispatch = useDispatch();
    const {phraseInputList} = useSelector(state=>state.book)
    const [value, onChangeValue, setValue] = useInput('');
    const [isOverTen, setIsOverTen] = useState(false)
    
    const getId = useCallback(e=>{
      let max = -1      
      phraseInputList?.forEach(element => {
              max = max > element.id? max : element.id
      })            
       return max+1;
    },[phraseInputList])

    const onEnter = useCallback((e)=>{
      if(e.key === 'Enter'){
        
        if(phraseInputList.length>=10){
          setIsOverTen(true);
          return;
        }

        const id = getId();
        
        dispatch(addPhrase({id,phrase:value}))
        setValue('')
        setIsOverTen(false);
      }
    },[value]) 

    const mapToPhraseItem = phraseInputList.map((p)=>{
        return <PhraseItem phraseData={p} key={p.id} />
    })

    return (
      <div className="phrase">  
         <input type="text" onChange={onChangeValue} onKeyPress={onEnter} placeholder="기록하고 싶은 문장이 있었나요?" value={value}></input>         
         {isOverTen? <span className="error-msg">10개까지만 등록가능합니다</span> : ''}
         <div className="phrase-wrapper">          
            {mapToPhraseItem}
         </div>
      </div>
    );
};


export default PhraseInput;