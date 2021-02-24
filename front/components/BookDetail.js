import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaPencilAlt } from "react-icons/fa"; 
import { bookLikeRequest, bookUnlikeRequest } from "../modules/book";
const BookDetail = ()=>{
    const {detailBook,bookBasket} = useSelector((state)=>state.book)
    
    const dispatch = useDispatch();
    
    const authors = `${detailBook.authors[0]} ${detailBook.authors.length>2? '외': ''}`
    const status = `${detailBook.status? '': '절판'}`
    
    const liked = bookBasket.find((v)=> v.isbn === detailBook.isbn);
    
    const onLike = useCallback(()=>{
      
       dispatch(bookLikeRequest(detailBook))

    })

    const onUnlike = useCallback(()=>{      
        dispatch(bookUnlikeRequest(detailBook.isbn))        
    })

    const onWrite = useCallback(()=>{
      console.log('기록하기')
    })

    return (
      
      <div className="BookDetail" >
        
        <div className="bookInfo">
          <div className="bookInfo-thumbnail">
              <img src={detailBook.thumbnail}/>
              <div className="button-box">
                {liked
                     ? <FaHeart className="icon like" onClick={onUnlike}/>
                    : <FaHeart className="icon unlike" onClick={onLike}/>}            
                  <FaPencilAlt className="icon penceil" onClick={onWrite} />
                  
                  
              </div>  
          </div>          
          <div className="bookInfo-content">
            <span className="title">{detailBook.title}</span>
            <span className="author">{authors}</span>
            <span className="translator">{detailBook.translators}</span>
            <span className="publisher">{detailBook.publisher} </span>
            <span className="price">&#128181;{detailBook.price}원 <span>{status}</span> </span>
            <span className="description">
              {detailBook.contents}
              <a href={detailBook.url} target="_blank"> 자세히</a>
            </span>                    
          </div>
        </div>
        
        
      
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default BookDetail;