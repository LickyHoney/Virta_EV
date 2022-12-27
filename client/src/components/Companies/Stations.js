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
const history = useHistory();

const [statypename, setStatypename] = useState("");
const cid = props.match.params.id;

useEffect(()=>{

  
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
  debugger;
  });
},[searchTerm])

const handleStatype = (e) => {
  
  Axios.get('/api/stationtype/sid/' + sid).then((data, key)=>{
debugger;
const statype_data = data.data[0][0]
if(data.data[0][0]!==undefined){
  setStationtypes(statype_data);
  }else{
    setStationtypes([]);
  }
});
}

const onChangeSearch = (e) => {
  const val = e.target.value;
  setSearchTerm(val);
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

const handleUpdate = (id) => {
  debugger;
 

  Axios.put('/api/station/update/' + id, {
      
      CID: ucid,
      Name: uname
  })
  alert("station is created")
  window.location.href="/helsinki_p/" + cid
  debugger;
  


}

const handleStUpdate = (id) => {
  debugger;
 

  Axios.put('/api/station_type/update/' + id, {
      
      SID: st_sid,
      NAME: st_name,
      MPOWER: stmpower
  })
  alert("station is created")
  window.location.href="/helsinki_p/" + cid
  debugger;
  


}

const handleSubmit = () => {
  debugger;
 
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

const handleStSubmit = () => {
  debugger;
 
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

const handleDelete = (id) => {
  debugger;
  Axios.delete('/api/station/delete/' + id ).then((data, key) => {
  
    setStations(
      stations.filter((station) => {
        return station.SID !== id;
      })
     
    );
   alert ("station is deleted")
    if (data.data[0].status === 200) 
debugger;
    alert("Success!");

    window.location.href="/helsinki_p/" + cid
  });
};

const handlestDelete = (id) => {
  debugger;
  Axios.delete('/api/stationtype/delete/' + id ).then((data, key) => {
  
    setStations(
      stations.filter((station) => {
        return station.STID !== id;
      })
     
    );
   alert ("station is deleted")
   window.location.href="/helsinki_p/" + cid
    if (data.data[0].status === 200) 
debugger;
    alert("Success!");

    
  });
};


  return (
    <div >
      {/* <p>test</p> */}

  
      {/* <button class="btn"><i class="fa fa-add"></i> Add</button> */}
     
{/* <div className= "split left"><div className="centered"> */}



<div>

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
          {/* <div className="btn-group"> */}
          <button onClick={() => {setIsAddOpen(false); handleSubmit();}}>save</button>
          <button onClick={() => setIsAddOpen(false)}>cancel</button>
          {/* </div> */}
        </Modal>
</div>

      {/* <button class="btn btn-success">Create Station type</button> */}
      </div>
     
      
      
    <fieldset style={{width: "50%"}}>
    <h3><b>Company</b>: {comname} </h3>
      { subcom &&
        <h3><b>Subcompany</b>: {subcom} </h3>
      }
    
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
                  debugger;
                                    setSid(station.SID)
                                    setStatypename(station.Name)}}
                    
                
                to={"#" }>
                {station.Name}
                </Link>
                </td> 

                
                <td><label class="switch">
 <input type="checkbox" id="togBtn" />
 <div class="slider round">
 
  <span class="on">Charging</span>
  <span class="off">Available</span>
 
 </div>
</label></td>
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
       {/* </div> */}
       {/* </div></div> */}
       {/* <div className= "split right"><div className="centered"> */}

       <button className="btn btn-success" style={{margin: "1rem"}} disabled={(stationtypes.STID)?true:false} onClick={() => setShow(true)}>Create StationType</button>
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
          {/* <div className="btn-group"> */}
          <button onClick={() => {setShow(false); handleStSubmit();}}>save</button>
          <button onClick={() => setShow(false)}>cancel</button>
          {/* </div> */}
        </Modal>
       <fieldset style={{width: "50%", float:"right"}} >
       <h3><b>Station</b>: {statypename} </h3>
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
       </fieldset>
      

       {/* <Modal show={isAddOpen} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleSubmit();
              closeAddModal();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal> */}
      </div>
      </div>  
    //   </div>
    // </div>
  )
}

export default Stations
