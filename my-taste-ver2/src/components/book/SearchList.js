import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import book from '../../redux/modules/book';
import BookCard from './BookCard';
import NoResult from './NoResult.js';

const SearchList = () => {
  const dispatch = useDispatch();
  const { searchList, is_end, loading } = useSelector((state) => state.book);

  const mapToComponent = searchList?.map((book) => {
    return <BookCard book={book} key={book.isbn} />;
  });

  const onScroll = useCallback((e) => {
    const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );

    if (scrollPer > 70) {
      if (!is_end && !loading) {
        const page = searchList.length / 10 + 1;
        //dispatch(book.bookSearchRequest({ page, keyword }));
      }
    }
  });

  return (
    <div className="BookSearchList" onScroll={onScroll}>
      {searchList.map((book, idx) => {
        return <BookCard key={idx} book={book} key={book.isbn} />;
      })}
      {searchList.length === 0 && (
        <NoResult msg="검색결과가 없습니다. &#128166;" />
      )}
    </div>
  );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default SearchList;
