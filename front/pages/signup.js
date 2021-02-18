import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { signUpRequest } from '../modules/login';
import '../styles/signup.scss'

const Signup = ()=>{
    const dispatch = useDispatch()
    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')
    const [nickname, onChangeNickname] = useInput('')

    const onClick = ()=>{
        dispatch(signUpRequest({id,pw,nickname}))
    }

    return (
        <div className="signup">
            회원가입
            <input type="text" onChange={onChangeId}></input>
            <input type="text" onChange={onChangePw}></input>
            <input type="text" onChange={onChangeNickname}></input>

            <button onClick={onClick}>회원가입</button>
        </div>
    )
};

export default Signup;