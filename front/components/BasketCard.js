import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailBook, setSelectedCard } from '../modules/book';
import { FaPencilAlt,FaTrashAlt } from "react-icons/fa"; 

const BasketCard = ({book})=>{
    const dispatch = useDispatch();
    const {selectedCard} = useSelector((state)=>state.book)
    let card = null;    
    
  
    const changeCardStyle = useCallback(()=>{
      
      if(selectedCard){
        selectedCard.classList.toggle('selected')}
      card.classList.toggle('selected')
      
      dispatch(setSelectedCard(card))
    })

    const onClickCard = useCallback(e=>{
        console.log(book.url)
    })
    const onWrite = useCallback(e=>{
        console.log('쓰기')
    })

    const onRemove = useCallback(e=>{
        console.log('삭제',book.isbn)
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
            <FaPencilAlt className="icon penceil" onClick={onWrite} />
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