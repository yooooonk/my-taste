import { useEffect, useState } from 'react';
import { FaHeart, FaPencilAlt,FaBookReader} from "react-icons/fa";
const DashboardCard = ({data, type})=>{
    const [title, setTitle] = useState('')
    
    useEffect(()=>{
        if(type==='basketCount'){
            setTitle('Basket')
        }else if(type==='isReadCount'){
          setTitle('Read')
        }else{
          setTitle('Diary')
        }
    })
    
    

    return (
      <div className="dashboard-card">
        {type==='basketCount' && <span className="icon-back heart"><FaHeart className="icon heart"/></span>}
        {type==='isReadCount' && <span className="icon-back basket"><FaBookReader className="icon basket"/></span>}
        {type==='diaryCount' && <span className="icon-back write"><FaPencilAlt className="icon write"/></span>}
        <span className="name">{title}</span>
        <span className="data">{data}</span>
        
      </div>
    );
};


export default DashboardCard;