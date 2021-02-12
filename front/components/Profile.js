import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import '../styles/pageLayout.scss'
import { logoutRequest } from '../modules/login';

const Profile = ()=>{
    const dispatch = useDispatch();
    const onClickLogoutBtn = ()=>{
      dispatch(logoutRequest())
    }
    return (
      <div className="login-section">
        프로필
        <Button type="primary" onClick={onClickLogoutBtn}>
          로그아웃
        </Button>
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default Profile;