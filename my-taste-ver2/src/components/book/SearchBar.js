import { useDispatch } from 'react-redux';
//import { bookSearchRequest } from '../modules/book';
import { FaSearch } from 'react-icons/fa';
import useInput from '../../shared/useInput';
import { useCallback } from 'react';
import styled from 'styled-components';
import { bookActions } from '../../redux/modules/book';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, onChangeQuery] = useInput('');

  const searchBook = (value) => {
    dispatch(bookActions.fetchBookList({ page: 1, keyword: value }));
  };

  const onEnter = useCallback(
    (e) => {
      if (e.code === 'Enter' && query) {
        searchBook(query);
      }
    },
    [query]
  );

  const onClickSearchBtn = useCallback(
    (e) => {
      searchBook(query);
    },
    [query]
  );

  return (
    <Bar>
      <FaSearch className="icon" onClick={onClickSearchBtn} />
      <input type="text" onKeyPress={onEnter} onChange={onChangeQuery}></input>
    </Bar>
  );
};

const Bar = styled.div`
  position: fixed;
  width: 100%;

  & input {
    position: absolute;
    left: 5%;
    top: 10px;
    height: 40px;
    width: 40vw;
    background-color: white;
    padding-left: 5%;
    @include rounded;
    box-shadow: $shadow rgba(32, 32, 32, 0.329);
    font-size: 17px;
  }

  & .icon {
    position: relative;
    top: 21px;
    left: 7%;
    color: rgb(177, 177, 177);
    z-index: 1;
    cursor: pointer;
  }
`;

export default SearchBar;
