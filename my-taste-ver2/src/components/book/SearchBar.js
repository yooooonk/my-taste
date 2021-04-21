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
      <Input type="text" onKeyPress={onEnter} onChange={onChangeQuery} />
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  & .icon {
    position: relative;
    left: 30px;
    top: 3px;
    color: rgb(177, 177, 177);
    z-index: 1;
    cursor: pointer;
  }
  @media ${(props) => props.theme.desktop} {
    position: absolute;
    top: 7%;
    margin-left: 5%;
    width: 40vw;
  }
`;

const Input = styled.input`
  ${(props) => props.theme.border_box};
  position: relative;
  height: 40px;
  width: 90%;
  background-color: white;
  border-radius: 20px;
  border: none;
  padding-left: 40px;
  box-shadow: 5px 5px 20px rgba(180, 132, 132, 0.5);

  @media ${(props) => props.theme.desktop} {
    width: 30vw;
  }
`;

export default SearchBar;
