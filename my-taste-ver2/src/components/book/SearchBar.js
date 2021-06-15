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

  const searchBook = () => {
    if (!query) return;
    dispatch(bookActions.fetchBookList({ page: 1, keyword: query }));
  };

  const onEnter = useCallback(
    (e) => {
      if (e.code === 'Enter' && query) {
        searchBook();
      }
    },
    [query]
  );

  const onClickSearchBtn = useCallback((e) => {
    searchBook();
  }, []);

  return (
    <Bar>
      <FaSearch onClick={onClickSearchBtn} />
      <Input type="text" onKeyPress={onEnter} onChange={onChangeQuery} />
    </Bar>
  );
};

const Bar = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem 1.5rem;

  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};

  & svg {
    position: absolute;
    color: ${(props) => props.theme.color.navy};
    z-index: 1;
    cursor: pointer;
    padding: 0.7rem;
  }

  @media ${(props) => props.theme.desktop} {
    height: 10%;
  }
`;

const Input = styled.input`
  ${(props) => props.theme.border_box};
  position: relative;
  height: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 1rem;
  border: none;
  padding-left: 2rem;
`;

export default SearchBar;
