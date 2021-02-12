import { Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { bookSearchRequest } from '../modules/book';


const { Search } = Input;

const SearchBar = ()=>{
    const dispatch = useDispatch();
    const onSearch = (value)=>{
        dispatch(bookSearchRequest(value));
    }

    return (
      <div className="SearchBar">
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default SearchBar;