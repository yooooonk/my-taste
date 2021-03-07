import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookUnlikeRequest, setSelectedCard, updateBookStateRequest } from '../modules/book';
import { FaPencilAlt,FaTrashAlt, FaBookOpen } from "react-icons/fa"; 

const BasketCard = ({book})=>{
    const dispatch = useDispatch();
 
    const onWrite = useCallback(e=>{
        console.log('쓰기')
    })

    const onRemove = useCallback(e=>{
      dispatch(bookUnlikeRequest(book.isbn))        
    })

    const onRead = useCallback(e=>{
      dispatch(updateBookStateRequest({id:book._id, state:'isRead'}))
    })
    return (
      <div className="basket-card" >
         <a href={book.url} target='_blank'>
                
                <img src={book.thumbnail} />                            
                <div className="content">
                    <span className="title">{book.title}</span> 
                    <span className="author">{book.authors}</span> 
                    <span className="publisher">{book.publisher}</span>       
                </div>
          </a>        
        <div className="button-box">
          {book.isRead? <FaBookOpen className="icon can done" onClick={onRead}/>:<FaBookOpen className="icon can" onClick={onRead}/>}
          {book.isWrite? <FaPencilAlt className="icon penceil done" onClick={onWrite} /> :<FaPencilAlt className="icon penceil" onClick={onWrite} />}  
            
            <FaTrashAlt className="icon can" onClick={onRemove} />
        </div> 
        
      </div>
    );
};

/* BookCard.propTypes = {
    title : propTypes.string,
    author : propTypes.string,
    img : propTypes.string,
    publisher : propTypes.string,
};  */

export default BasketCard;