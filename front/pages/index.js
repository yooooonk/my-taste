import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";
import '../styles/pageLayout.scss'

const Home = ()=>{
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
    
    
    return(
        <div className="Dashboard">         
            <div className="login-section">
                {isLoggedIn?  <Profile /> : <LoginForm /> }
            </div>       
            <div className="dashboard-section">
                <Dashboard />
            </div>
                    
                    
        </div>
        
    )
}

export default Home;