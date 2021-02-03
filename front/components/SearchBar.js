import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ()=>{
    const onSearch = ()=>{

    }

    return (
      <div className="SearchBar">
        <input type="text" className="searchInput"/>
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default SearchBar;