import propTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { selectedCard } = useSelector((state) => state.book);
  let card = null;

  const onClickBookCard = useCallback(() => {
    //dispatch(setDetailBook(book));
    changeCardStyle();
  });

  const changeCardStyle = useCallback(() => {
    if (selectedCard) {
      selectedCard.classList.toggle('selected');
    }
    card.classList.toggle('selected');

    //dispatch(setSelectedCard(card));
  });

  return (
    <div
      className="BookCard"
      onClick={onClickBookCard}
      ref={(ref) => {
        card = ref;
      }}
    >
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
