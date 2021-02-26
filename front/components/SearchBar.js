import { Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { bookSearchRequest } from '../modules/book';
import { FaSearch } from "react-icons/fa"; 
import '../styles/bookSearch.scss'
import useInput from '../hooks/useInput';
import { useCallback } from 'react';


const SearchBar = ()=>{
    const dispatch = useDispatch();
    const [query,onChangeQuery] = useInput('')
    
    const searchBook = (value)=>{
        dispatch(bookSearchRequest({page:1, keyword:value}));
    }

    const onEnter = useCallback((e)=>{
      if(e.code === 'Enter' && query){
        searchBook(query)
      }      
    },[query])

    const onClickSearchBtn = useCallback((e)=>{
      searchBook(query)
    },[query])

    return (
      <div className="search-bar">
        
        <FaSearch className="icon" onClick={onClickSearchBtn}/><input type="text" onKeyPress={onEnter} onChange={onChangeQuery}></input>
        
      </div>
    );
};



export default SearchBar;