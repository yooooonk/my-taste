import { useDispatch,useSelector } from "react-redux";
import {useEffect} from 'react'
import { getBookBasketRequest } from "../modules/book";
import { getDashboardDataRequest } from "../modules/login";
import DashboardCard from "./DashboardCard";
import '../styles/Dashboard.scss'
import RandomPhraseBox from "./RandomPhraseBox";

const Dashboard = ()=>{
    const dispatch = useDispatch();
    const {user, dashboardData} = useSelector(state=>state.user)
   
    useEffect(()=>{      
      dispatch(getBookBasketRequest())
      dispatch(getDashboardDataRequest())
    },[])

    return (
      <div className="dashboard-part">                
        <section className="top">          
          <span className="section-title">Over View</span>
            <div className="cards-wrapper">
                <DashboardCard data={dashboardData.basketCount} type={'basketCount'} />
                <DashboardCard data={dashboardData.isReadCount} type={'isReadCount'} />
                <DashboardCard data={dashboardData.diaryCount} type={'diaryCount'} />
            </div>
          
        </section>
        <section className="bottom">
            <span className="section-title">Today's Phrase</span>
            <RandomPhraseBox phrases={dashboardData.randomPhrase}/>
        </section>
        
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default Dashboard;