import useInput from "../hooks/useInput";

const PhraseInput = ({onRemovePhrase})=>{
    
    

    const [phrase, onChangePhrase] = useInput('')

    
    return (
      <div className="phrase-input">
        <input type="text" onChange={onChangePhrase}></input>
        <button onClick={onRemovePhrase(phrase)}>-</button>
      </div>
    );
};


export default PhraseInput;

/* const removeClick = useCallback(() => {
    if(onRemovePhrase) onRemovePhrase(phrase)
  }, [])
 */