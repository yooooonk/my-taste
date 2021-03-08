import { useDispatch,useSelector } from "react-redux";
import {useEffect} from 'react'
import { getBookBasketRequest } from "../modules/book";
import { getDashboardDataRequest } from "../modules/login";

const Dashboard = ()=>{
    const dispatch = useDispatch();
    const {user, dashboardData} = useSelector(state=>state.user)
    
    console.log(dashboardData)
    useEffect(()=>{
      
      dispatch(getBookBasketRequest())
      dispatch(getDashboardDataRequest())
    },[])

    return (
      <div className="dashboard-part">
        대시보드
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default Dashboard;