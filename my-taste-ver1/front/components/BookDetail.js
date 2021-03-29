import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaPencilAlt } from "react-icons/fa"; 
import { bookLikeRequest, bookUnlikeRequest } from "../modules/book";
const BookDetail = ({onWrite})=>{
    const {detailBook,bookBasket} = useSelector((state)=>state.book)
    
    const dispatch = useDispatch();
    
    const authors = `${detailBook.authors[0]} ${detailBook.authors.length>2? '외': ''}`
    const status = `${detailBook.status? '': '절판'}`
    
    const inBasketBook = bookBasket.find((v)=> v.isbn === detailBook.isbn);
    
    const onLike = useCallback(()=>{      
       dispatch(bookLikeRequest(detailBook))
    })

    const onUnlike = useCallback(()=>{      
        dispatch(bookUnlikeRequest(detailBook.isbn))        
    })

   
    return (
      
      <div className="BookDetail" >
        
        <div className="bookInfo">
          <div className="bookInfo-thumbnail">
              <img src={detailBook.thumbnail}/>
              <div className="button-box">
                {inBasketBook
                     ? <FaHeart className="icon like" onClick={onUnlike}/>
                    : <FaHeart className="icon unlike" onClick={onLike}/>}            
                  
                 {inBasketBook?.isWrite? <FaPencilAlt className="icon like" onClick={onWrite(book)} />:<FaPencilAlt className="icon unlike" onClick={onWrite(detailBook)} />} 
                  
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