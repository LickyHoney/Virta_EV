import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "../../index.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
//import MultilevelSideNav  from '../MultilevelSideNav
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';

import "bootstrap/dist/js/bootstrap.min.js";

import {CanvasJSChart} from 'canvasjs-react-charts'


//Declarations

const Stations = (props) => {
const [stations, setStations] = useState([]);
const [comname, setComname]= useState([]);
const [sid, setSid] = useState("");
const [stsid, setStsid]= useState();
const [stationtypes, setStationtypes] = useState([])
const [searchTerm, setSearchTerm] = useState("")
const [isAddOpen, setIsAddOpen] = useState(false);
const [stedit, setStedit] = useState(false);
const [sta_id, setSta_id] = useState("");
const [com_id, setCom_id] = useState(0);
const [name, setName] = useState("");
const [uname, setUname] = useState("");
const [ucid, setUcid] = useState(0);
const [show, setShow] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [stid, setStid] = useState("");
const [stname, setStname] = useState("");
const [mpower, setMpower] = useState("");
const [st_name, setSt_name]= useState("");
const [st_sid, setSt_sid]= useState("");
const [stmpower, setStmpower]= useState("");
const [subcom, setSubcom]=useState("");
const [company, setCompany]= useState("");
const [sta, setSta]= useState("");
const [stasid, setStasid]= useState("");
const [stastid, setStastid]= useState("");
const [status, setStatus]= useState([]);

const [stampower, setStampower]= useState("");
const [stastime, setStastime]= useState("");
const history = useHistory();

const [statypename, setStatypename] = useState("");
const cid = props.match.params.id;


//Initilization
useEffect(()=>{

 //Getting station by company id 
const results = stations.filter(station =>
    (JSON.stringify(station).toLowerCase().includes(searchTerm.toLocaleLowerCase())


    )
    );
  setStations(results);
  if (searchTerm === "") {
    Axios.get('/api/station/cid/' + cid).then((data, key)=>{
      const sta_data = data.data[0]
      console.log(sta_data);
      setStations(sta_data) 
})
  }

  //Api call for getting company name by company id to display in UI

  Axios.get('/api/company/id/' + cid).then ((data, key) => {
     if(data.data[0].Parent_ID===null){
    const company_name = data.data[0].Name;
    setComname(company_name);
  }else{
    const subcomname = data.data[0].Name;
    setSubcom(subcomname);
    Axios.get('/api/company/id/' + data.data[0].Parent_ID).then((data, key) => {
      const company_name = data.data[0].Name;
    setComname(company_name);
    })
  }
  
  });
},[searchTerm])

//Getting station types data by its station id 

const handleStatype = (e) => {
  
  Axios.get('/api/stationtype/sid/' + sid).then((data, key)=>{

const statype_data = data.data[0][0]
if(data.data[0][0]!==undefined){
  setStationtypes(statype_data);
  // setStasid(statype_data.STID);
  // setStampower(statype_data.MPOWER)
  }else{
    setStationtypes([]);
  }
});
}
const onChangeSearch = (e) => {
  const val = e.target.value;
  setSearchTerm(val);
}
const handleStasid = (e) => {
  setStasid(e.target.value);
}
const handleStampower = (e) => {
  setStampower(e.target.value);
}
const handleStastime = (e) => {
  setStastime(e.target.value);
}
const handleSt_name = (e) => {
  setSt_name(e.target.value);
}
const handleStsid = (e) => {
  setSt_sid(e.target.value);
}
const handleStmpower = (e) => {
  setStmpower(e.target.value);
}
const handleUpdateCID = (e) => {
  setUcid(e.target.value);
};
const handleUpdateName = (e) => {
  setUname(e.target.value);
};

const handleSID = (e) => {
  setSta_id(e.target.value);
};
const handleCID = (e) => {
  setCom_id(e.target.value);
};
const handleName = (e) => {
  setName(e.target.value);
};
const handleSTID = (e) => {
  setStid(e.target.value);
};

const handleStname = (e) => {
  setStname(e.target.value);
};
const handleMpower = (e) => {
  setMpower(e.target.value);
};
const openAddModal = () => setIsAddOpen(true);
const closeAddModal = () => setIsAddOpen(false);

//Updates a station

const handleUpdate = (id) => {
  
 

  Axios.put('/api/station/update/' + id, {
      
      CID: ucid,
      Name: uname
  })
  alert("station is created")
  window.location.href="/helsinki_p/" + cid
  
  


}

console.log(sta)

//updates a station types
const handleStUpdate = (id) => {
  
 

  Axios.put('/api/station_type/update/' + id, {
      
      SID: st_sid,
      NAME: st_name,
      MPOWER: stmpower
  })
  alert("station is created")
  window.location.href="/helsinki_p/" + cid
  
  


}

const Stationdata = []

const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2", // "light1", "dark1", "dark2"
  title:{
    text: "POWER Consumption"
  },
  axisY: {
    title: "MPower",
    suffix: "KW"
  },
  axisX: {
    title: "timeline",
    interval: 2
  },
  data: [{
    type: "line",
    toolTipContent: "Day {x}: {y}KW",
    yValueFormattingString: "KW",
    edgeLablePlacement: "shift",
    minnimum:new Date(2022, 1, 1), Maximum: new Date(2025, 31, 12),
    dataPoints: Stationdata
  }]
}

//Inserting status info based on click 
const handleStatus = (status) => {
  
  
  Axios.get('/api/stationtype/sid/' + sid).then((data, key)=>{
    
    const statype_data = data.data[0][0]
    if(data.data[0][0]!==undefined){
     
      setStastid(statype_data.STID);
      setStampower(statype_data.MPOWER)
      }else{
        setStationtypes([]);
      }
    });

  if (sta==="c"){
    
      
     
    // if(!stations.SID){
      Axios.post('/api/company/station_status/c', {
          SID: sid,
          STID: stastid,
          MPOWER: stampower,
          STIME: Date().toLocaleString()
      }).then((res) => {
        
          setStatus(res.data)
          console.log(res.data);
          
      })
     
    
    
      window.location.href="/helsinki_p/" + cid
    
    
  
}}
const changestatus = (e) => {
  if ( console.log( e.target.checked ) ) {
    setSta("a")
    console.log(sta)
  } else {
    setSta( "c")
    console.log(sta)
  }
}

//Creates a station

const handleSubmit = () => {
  
 
// if(!stations.SID){
  Axios.post('/api/station/create', {
      SID: sta_id,
      CID: com_id,
      Name: name
  }).then((res) => {
    
      setStations(res.data)
      console.log(res.data);
      
  })
 


  window.location.href="/helsinki_p/" + cid


}

console.log(sta);

//Creates a station type

const handleStSubmit = () => {
  
 
// if(!stations.SID){
  Axios.post('/api/stationtype/create', {
      STID: stid,
      SID: sid,
      NAME: stname,
      MPOWER: mpower
  }).then((res) => {
    
      setStationtypes(res.data)
      console.log(res.data);
      
  })
 
 

  window.location.href="/helsinki_p/" + cid


}

//deletes a station 

const handleDelete = (id) => {
  
  Axios.delete('/api/station/delete/' + id ).then((data, key) => {
  
    setStations(
      stations.filter((station) => {
        return station.SID !== id;
      })
     
    );
   alert ("station is deleted")
    if (data.data[0].status === 200) 

    alert("Success!");

    window.location.href="/helsinki_p/" + cid
  });
};

//deletes a station type

const handlestDelete = (id) => {
  
  Axios.delete('/api/stationtype/delete/' + id ).then((data, key) => {
  
    setStations(
      stations.filter((station) => {
        return station.STID !== id;
      })
     
    );
   alert ("station is deleted")
   window.location.href="/helsinki_p/" + cid
    if (data.data[0].status === 200) 

    alert("Success!");

    
  });
};

//Rendering
return (
    <div >



<div>
  
<fieldset style={{width: "50%"}}>
<h3><b>Company</b>: {comname} </h3>
      { subcom &&
        <h3><b>Subcompany</b>: {subcom} </h3>
      }
      <div class="text-left" style={{marginTop: '5%'}} >
      <div className="btn-group">
      <input type="text" name="title" id="exampleEmail"
          placeholder="Search Station"
          
          className="form-control mb-8 font-weight-bold " value={searchTerm} onChange={onChangeSearch} style={{ margin: "1rem", width: "40%"}}
        />
        <button className="btn btn-success" style={{margin: "1rem"}} onClick={() => setIsAddOpen(true)}>Create Station</button>
        <Modal 
           isOpen={isAddOpen}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                SID:
                <input type="text" name="name" onChange={handleSID} />
              </label>
              <br />
              <label>
                CID:
                <input type="text" name="name" onChange={handleCID} />
              </label>
              <br />
              <label>
               Name:
                <input type="text" name="name" onChange={handleName} />
              </label>
              <br />
            </form>
          </div>
          <button onClick={() => {setIsAddOpen(false); handleSubmit();}}>save</button>
          <button onClick={() => setIsAddOpen(false)}>cancel</button>
        
        </Modal>
</div>

     
      </div>
     
      
    
    
      <table className="list"  style={{float: 'left', marginTop: '2rem'}} id= "tableId">
         
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
                  
                                    setSid(station.SID)
                                    setStatypename(station.Name)}}
                    
                
                to={"#" }>
                {station.Name}
                </Link>
                </td> 

                
                <td>
                
                  <label class="switch">
 <input type="checkbox" onChange={ changestatus } onClick={(e)=> handleStatus(sta)} id="togBtn" />
 <div class="slider round">
 
  <span class="on" >Charging</span>
  <span class="off">Available</span>
 
 </div>

 
</label>

</td>
               <td><button class="btn"onClick={() => setIsOpen(true)}><i class="fa fa-edit"></i></button></td>
               <Modal 
           isOpen={isOpen}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                Name:
                <input type="text" name="name" onChange={handleUpdateName} />
              </label>
              <br />
              <label>
                CID:
                <input type="text" name="name" onChange={handleUpdateCID} />
              </label>
              
            </form>
          </div>
          <div className="btn-group">
          <button onClick={() => {setIsOpen(false); handleUpdate(station.SID);}}>save</button>
          <button onClick={() => setIsOpen(false)}>cancel</button>
          </div>
        </Modal>

               <td><button class="btn" onClick={(e)=> {handleDelete(station.SID);setSid(station.SID) }}><i class="fa fa-trash"></i></button></td> 
              
            
              
           </tr>
           </tbody>
         ))} 
       </table>
       </fieldset>
      
      <div className="righttab">
      <fieldset style={{width: "50%", float:"right"}} >
       <h3><b>Station</b>: {statypename} </h3>
       <button className="btn btn-success" style={{margin: "2rem"}} disabled={(stationtypes.STID)?true:false} onClick={() => setShow(true)}>Create StationType</button>
        <Modal 
           isOpen={show}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                STID:
                <input type="text" name="name" onChange={handleSTID} />
              </label>
              <br />
              <label>
                SID:
                <input type="text" name="name" value={sid} />
              </label>
              <br />
              <label>
                Name:
                <input type="text" name="name" onChange={handleStname} />
              </label>
              <br />
              <label>
               MPOWER:
                <input type="text" name="name" onChange={handleMpower} />
              </label>
              <br />
            </form>
          </div>
          
          <button onClick={() => {setShow(false); handleStSubmit();}}>save</button>
          <button onClick={() => setShow(false)}>cancel</button>
         
        </Modal>
      
       <table className="list"  style={{float: 'center'}}>
         
         <thead>
           <tr
             className="colhead"
             
           >
             
              <th>Name</th>
              <th>MPOWER</th>
              <th>Edit</th>
              <th>Delete</th>
             
           </tr>
         </thead>
          {/* {stationtypes.map((stype, i) => ( */}
          
           <tbody>
             <tr>
               <td>{stationtypes.NAME}</td>
               <td>{stationtypes.MPOWER}</td>
               <td><button class="btn"onClick={() => setStedit(true)}><i class="fa fa-edit"></i></button></td>
               <Modal 
           isOpen={stedit}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                SID:
                <input type="text" name="name" onChange={handleStsid} />
              </label>
              <br />
              <label>
                NAME:
                <input type="text" name="name" onChange={handleSt_name} />
              </label>
              <br />
              <label>
                MPOWER:
                <input type="text" name="name" onChange={handleStmpower} />
              </label>
              
            </form>
          </div>
        
          <button onClick={() => {setStedit(false); handleStUpdate(stationtypes.STID);}}>save</button>
          <button onClick={() => setStedit(false)}>cancel</button>
          
        </Modal>
               <td><button class="btn" onClick={(e)=> {handlestDelete(stationtypes.STID);setStsid(stationtypes.STID)}}><i class="fa fa-trash"></i></button></td> 

              
           </tr>
           </tbody>
         {/* ))}  */}
       </table>
       <div style={{width: "80%", height: "200px"}}>
			<CanvasJSChart style={{width: "15%"}}options = {options}
				
			/>
			
		</div>
       
       </fieldset>
      
       </div>
      
      </div>
      </div>  
    
  )
}

export default Stations
