import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { checkIdMultipleRequest, checkIdMultipleSuccess, resetSignupState, signUpRequest } from '../modules/login';
import '../styles/signup.scss'
import Router from "next/router";

const Signup = ()=>{
    const dispatch = useDispatch()
    const {checkIdMultipleError, signUpSuccess, checkIdMultipleSuccess} = useSelector((state)=>state.user)

    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')
    const [pwCheck, onChangePwCheck, setPwCheck] = useInput('')
    const [nickname, onChangeNickname] = useInput('')

    const [idMsg, setIdMsg] = useState('')
    const [pwMsg, setPwMsg] = useState('')
    const [pwChkMsg, setpwChkMsg] = useState('')
    const [nicknameMsg, setNicknameMsg] = useState('')
    
    let pwChkInput = null;
    const onClick = useCallback(()=>{
       if(id && (pw === pwCheck) && nickname &&checkIdMultipleSuccess){
            dispatch(signUpRequest({id,pw,nickname}))
       }        
    })
    const checkId = useCallback((e)=>{   
        const id = e.target.value     
        if(!id){
            setIdMsg('아이디를 입력해주세요')                        
            return;
        }     
        
        dispatch(checkIdMultipleRequest({id}))        
        setIdMsg('')
               
    })
    
    const checkPw = useCallback((e)=>{        
        if(!e.target.value){
            setPwMsg('비밀번호를 입력해주세요');
            return;
        }
        pwChkInput.value = '';
        setPwMsg('')                        
             
    })

    const checkPwIdentity = useCallback((e)=>{       
        if(!e.target.value){
            setpwChkMsg('비밀번호를 입력해주세요')                        
            return;
        }
        
        if(pw !== e.target.value){
            setpwChkMsg('입력한 비밀번호와 다릅니다')                        
            return;
        }        
        setpwChkMsg('')
        
    })

    const checkNickname = useCallback((e)=>{        
        if(!e.target.value){
            setNicknameMsg('닉네임을 입력해주세요')                        
            return;
        }
        
        setNicknameMsg('')                        
             
    })

    useEffect(()=>{
        if(checkIdMultipleError){
            setIdMsg(checkIdMultipleError) 
        }

    },[checkIdMultipleError])

    useEffect(()=>{
        if(signUpSuccess){
            alert('가입이 완료되었습니다')
            dispatch(resetSignupState())
            Router.replace('/');
        }
    },[signUpSuccess])

    return (
        <div className="signup">
            <div className="title">회원가입</div>
            <div className="block">
                <span className="label">아이디</span> 
                <input type="text" onChange={onChangeId}  onBlur={checkId}></input>                
                <span className="msg">{idMsg}</span>
            </div>
            <div className="block">
                <span className="label">비밀번호</span>
                <input type="password" onChange={onChangePw} onBlur={checkPw}></input>  
                <span className="msg">{pwMsg}</span>              
            </div>
            <div className="block">
                <span className="label">비밀번호 확인</span>
                <input type="password" onChange={onChangePwCheck} onBlur={checkPwIdentity} ref={ref=>{pwChkInput = ref}}></input>
                <span className="msg">{pwChkMsg}</span>
            </div>
            <div className="block">
                <span className="label">닉네임</span>
                <input type="text" onChange={onChangeNickname} onBlur={checkNickname}></input>
                <span className="msg">{nicknameMsg}</span>
            </div>

            <button onClick={onClick}>가입하기</button>
        </div>
    )
};

export default Signup;