import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Axios from 'axios';
import MultilevelSideNav  from '../MultilevelSideNav'

import { PinDropRounded } from '@material-ui/icons';




const Helsinki = (props) => {
const [stations, setStations] = useState([]);
const [comname, setComname]= useState([]);

const cid = props.match.params.id;

useEffect(()=>{

  Axios.get('/api/station/cid/' + cid).then((data, key)=>{

  
      debugger;
      
        const sta_data = data.data[0]
        console.log(sta_data);
        setStations(sta_data) 
  
    
   
    });

    Axios.get('/api/company/id/' + cid).then ((data, key) => {
      debugger;
      const company_name = data.data[0].Name;
      setComname(company_name);
    });
    
  debugger;
  
  },[])
  debugger;

debugger;


  return (
    <div className="container">
      {/* <p>test</p> */}

     
      <div className='add'>
      <button class="btn"><i class="fa fa-add"></i> Add</button>
      <h3><b>Company Name</b>: {comname} </h3>
    
    
    
      <table className="list">
         
         <thead>
           <tr
             className="colhead"
             
           >
             <th>SID</th>
              <th>Type</th>
             <th>Maxpower</th>
             <th>Status</th>
             <th>Edit</th>
             <th>Delete</th>
           </tr>
         </thead>
          {stations.map((station, i) => (
           <tbody>
             <tr>
               <td>{station.ID}</td>
            
               <td>
                {station.TYPE}
               </td>
               <td>{station.MPOWER}</td>
               <td>status</td>
               <td><button class="btn"><i class="fa fa-edit"></i></button></td>
               <td><button class="btn"><i class="fa fa-trash"></i></button></td>
           </tr>
           </tbody>
         ))} 
       </table>
       </div>
    </div>
  )
}

export default Helsinki
