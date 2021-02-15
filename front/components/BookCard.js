import propTypes from 'prop-types';

const BookCard = ({book})=>{
    

    return (
      <div className="BookCard">
        <img src={book.thumbnail} />
        <div className="content">
            <span className="title">{book.title}</span> 
            <span className="author">{book.authors}</span> 
            <span className="publisher">{book.publisher}</span> 
      
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

export default BookCard;