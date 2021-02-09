import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers';
import '../styles/pageLayout.scss'

const Profile = ()=>{
    const dispatch = useDispatch();
    const onClickLogoutBtn = ()=>{
      dispatch(logoutAction())
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