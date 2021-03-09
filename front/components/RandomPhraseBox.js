import { useEffect, useState } from "react";
import {FaQuoteLeft,FaQuoteRight} from "react-icons/fa";
const RandomPhraseBox = ({phrases})=>{
    console
    const [phrase,setPhrase] = useState('')
   /*  const mapToDiv = phrases[0].phrases.map((p)=>{
        return <div key={p.id} className="phrase">{p.phrase}</div>
    }) */

    useEffect(()=>{
        const value = phrases?.[0].phrases[0].phrase
        console.log(value)
        setPhrase(value)
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