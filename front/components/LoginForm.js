import '../styles/LoginForm.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../modules/login';
import useInput from '../hooks/useInput';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/Link';
     

const LoginForm = ()=>{
  const {loginError} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  
  const [id,onChangeId,setId] = useInput('')
  const [pw,onChangePw,setPw] = useInput('')
  const [errorMsg,setErrorMsg] = useState('');
    
  const login = () => {  
    setId('qwe@gmail.com');
    setPw('qwe');
        if(id && pw){
      dispatch(loginRequest({id, pw}))
    }
  };


  const onEnter = useCallback((e)=>{    
    if(e.code === 'Enter'){
      login()
    }      
  },[id,pw])

  useEffect(()=>{
    if(loginError){
        setErrorMsg(loginError)   
    }
  },[loginError])

    return (
      <div className="login-section-box">
          <div className="avatar"><Avatar size={100} icon={<UserOutlined />} /></div>
          <span className="login-text">아이디</span>           
          <input type="text" onChange={onChangeId} maxLength="20"></input>          
          <span className="login-text">비밀번호</span>           
          <input type="password"  onChange={onChangePw} onKeyPress={onEnter} maxLength="30"></input>          
          <span className="error-msg">{errorMsg}</span>
          <div className="button-box">
                <Link href="/signup">
                    <a><button>회원가입</button></a>
                </Link>
              
              <button onClick={login}>로그인</button>              
          </div> 
          <div className="button-box">
            <img src="/kakao.png" />
          </div>
          
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default LoginForm;