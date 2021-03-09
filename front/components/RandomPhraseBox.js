import { useEffect, useState } from "react";
import {FaQuoteLeft,FaQuoteRight} from "react-icons/fa";
const RandomPhraseBox = ({phrases})=>{
    console
    const [phrase,setPhrase] = useState('')
   /*  const mapToDiv = phrases[0].phrases.map((p)=>{
        return <div key={p.id} className="phrase">{p.phrase}</div>
    }) */

    useEffect(()=>{
      console.log(phrases[0])
      if(phrases){
          const value = phrases?.[0].phrases[0].phrase
          setPhrase(value)
      }else{
          setPhrase('친절과 빛과 삶과 공감의 확대')
      }
        
    },[])
    
    return (
      <div className="random-phrase-box">
        <div className="phrase-wrapper">
            <FaQuoteLeft />
            {phrase}
            
            <FaQuoteRight />
        </div>
      </div>
    );
};


export default RandomPhraseBox;