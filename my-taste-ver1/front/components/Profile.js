import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import '../styles/pageLayout.scss'
import { logoutRequest } from '../modules/login';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = ()=>{
    const dispatch = useDispatch();
    const onClickLogoutBtn = ()=>{
      dispatch(logoutRequest())
    }
    return (
      <div className="login-section-box">
        <div className="avatar"><Avatar size={100} icon={<UserOutlined />} /></div>
        <div className="button-box">
          <button onClick={onClickLogoutBtn}>로그아웃</button>                      
        </div>
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default Profile;