import '../styles/LoginForm.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../modules/login';
import useInput from '../hooks/useInput';
import { useCallback } from 'react';
import Link from 'next/Link';
                

const LoginForm = ()=>{
  const dispatch = useDispatch();
  
  const [id,onChangeId] = useInput('')
  const [pw,onChangePw] = useInput('')
  
  const idErrorMsg = 'ID를 입력해주세요'
  const pwErrorMsg = '비밀번호를 입력해주세요'

  let idError = false;
  let pwError = false;

  const login = () => {  
        if(id && pw){
      dispatch(loginRequest({id:id, pw:pw}))
    }
  };


  const onEnter = useCallback((e)=>{    
    if(e.code === 'Enter'){
      login()
    }      
  },[id,pw])

    return (
      <div className="login-section-box">
          <div className="avatar"><Avatar size={100} icon={<UserOutlined />} /></div>
          <span className="login-text">아이디</span>           
          <input type="text" onChange={onChangeId} maxLength="20"></input>          
          <span className="login-text">비밀번호</span>           
          <input type="password"  onChange={onChangePw} onKeyPress={onEnter} maxLength="30"></input>          
          <div className="button-box">
                <Link href="/signup">
                    <a><button>회원가입</button></a>
                </Link>
              
              <button onClick={login}>로그인</button>
          </div> 
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default LoginForm;