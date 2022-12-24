import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
//import MultilevelSideNav  from '../MultilevelSideNav'






const Helsinki = (props) => {
const [stations, setStations] = useState([]);
const [comname, setComname]= useState([]);
const [sid, setSid] = useState("");
const [stationtypes, setStationtypes] = useState([])

const cid = props.match.params.id;

useEffect(()=>{
  

  


  Axios.get('/api/station/cid/' + cid).then((data, key)=>{

  
     
        const sta_data = data.data[0]
        
        console.log(sta_data);
        setStations(sta_data) 
 });

    Axios.get('/api/company/id/' + cid).then ((data, key) => {
     
      const company_name = data.data[0].Name;
      setComname(company_name);
    });

    

  
  },[])

const handleStatype = (e) => {
  
  




  Axios.get('/api/stationtype/sid/' + sid).then((data, key)=>{

  
     
    const statype_data = data.data[0][0]
    setStationtypes(statype_data);
    console.log(stationtypes);
   
   
   
});


}


 

  return (
    <div className="container">
      {/* <p>test</p> */}

  
      {/* <button class="btn"><i class="fa fa-add"></i> Add</button> */}
     
{/* <div className= "split left"><div className="centered"> */}

  
      <div class="text-left" style={{marginTop: '5%'}} >
      <h3><b>Company</b>: {comname} </h3>
      <button class="btn btn-success">Create Station</button>{'  '}
      {/* <button class="btn btn-success">Create Station type</button> */}
      </div>
      
      <div className='table-wrapper' align="left">
    
    
      <table className="list"  style={{float: 'left'}} id= "tableId">
         
         <thead>
           <tr
             className="colhead"
             
           >
             
              <th>Name</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
             
           </tr>
         </thead>
          {stations.map((station, i) => (
           <tbody>
             <tr>

             <td>
              <Link key={station.SID}
                
                onClick={(e) => { handleStatype(); 
                                    setSid(station.SID)}}
                    
                
                to={"#" }>
                {station.Name}
                </Link>
                </td> 

                
               <td>status</td>
               <td><button class="btn"><i class="fa fa-edit"></i></button></td>
               <td><button class="btn"><i class="fa fa-trash"></i></button></td> 
              
            
              
           </tr>
           </tbody>
         ))} 
       </table>
       </div>
       {/* </div></div> */}
        
       <table className="list"  style={{float: 'center'}}>
         
         <thead>
           <tr
             className="colhead"
             
           >
             
              <th>Name</th>
             
           </tr>
         </thead>
          {/* {stationtypes.map((stype, i) => ( */}
           <tbody>
             <tr>
               <td>{stationtypes.NAME}</td>
            
              
           </tr>
           </tbody>
         {/* ))}  */}
       </table>
    </div>
  )
}

export default Helsinki
