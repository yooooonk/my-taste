import { useDispatch,useSelector } from "react-redux";
import {useEffect} from 'react'
import { getBookBasketRequest } from "../modules/book";

const Dashboard = ()=>{
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user)
    
    useEffect(()=>{
      dispatch(getBookBasketRequest())
    },[user])

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