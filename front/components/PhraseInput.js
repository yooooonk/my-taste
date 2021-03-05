import useInput from "../hooks/useInput";

const PhraseInput = ({idx, onRemovePhrase, onPushPhrease})=>{
    
    

    const [phrase, onChangePhrase] = useInput('')

    
    return (
      <div className="phrase-input">
        <input type="text" onChange={onChangePhrase} onBlur={onPushPhrease(idx, phrase)}></input>
        <button onClick={onRemovePhrase(phrase)}>-</button>
      </div>
    );
};


export default PhraseInput;

/* const removeClick = useCallback(() => {
    if(onRemovePhrase) onRemovePhrase(phrase)
  }, [])
 */