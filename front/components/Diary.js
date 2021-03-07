import { useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";


const Diary = ({diary})=>{
  const commentDiv = useRef();
  const [isMore, setIsMore] = useState(true);
 
  useEffect(()=>{
    let comment = diary.comment;
    let isLong = comment.length>20;
    if(isMore && isLong){
        comment  = comment.substring(0,20)+'...'
    }
    commentDiv.current.innerHTML = comment
  },[diary,isMore])

    return (
      <div className="diary">
          <header>
              <span>{diary.title}</span>
              <span>{diary.authors}</span>
              <span>{diary.date}</span>
          </header>          
          <ImageCarousel image={diary.src} phraseList={diary.phrases}/>
          <section >      
            <div ref={commentDiv}>
              코멘트
            </div>
            <span onClick={()=>setIsMore(!isMore)}>
                {diary.comment.length>20? (isMore? '더보기':'접기'):''}                
            </span>         
          </section>
      </div>
    );
};


export default Diary;