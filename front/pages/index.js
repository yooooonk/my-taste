import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import NoLoginMain from "../components/NoLoginMain";
import { useDispatch, useSelector } from "react-redux";
import '../styles/index.scss'
import { useEffect } from "react";
import { loadMyInfoRequest } from "../modules/login";

const Home = ()=>{
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
    const dispatch = useDispatch()
    
    useEffect(()=>{        
        dispatch(loadMyInfoRequest())
    })
    
    return(
        <div className="dashboard-page">         
            <div className="login-section">
                {isLoggedIn?  <Profile /> : <LoginForm /> }
            </div>       
            <div className="dashboard-section">
                {isLoggedIn?  <Dashboard /> : <NoLoginMain /> }
                
            </div>  
        </div>
        
    )
}

export default Home;