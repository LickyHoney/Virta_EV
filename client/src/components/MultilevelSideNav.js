import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MultilevelSideNav.css';
import styled from 'styled-components';
import Axios from 'axios';
import Helsinki from './Companies/Helsinki';
import { common } from '@material-ui/core/colors';
import Modal from 'react-modal';


const MultilevelSideNav = ({ data, sideNavState, sideNavHandler, searchTerm, onChangeSearch }) => {

    const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
    const [pid,setpid]=useState();
    const [currentMenus, setCurrentMenus] = useState(data);
    const [previousStack, setPreviousStack] = useState([]);
    const [parentcompany,setParentCompany]=useState([]);
    const [stations, setStations]=useState([]);
    const [hide, setHide]=useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(0);
    const [parentid, setParentid] = useState();
    const [name, setName] = useState("");
    //const [searchTerm, setSearchTerm] = useState([])
    const [q, setQ] = useState("")
    useEffect(()=>{
        Axios.get('/api/company').then((data, key)=>{
        
        let parent_companies = [];
       
      
      
        data.data.forEach((com) => {
          if (com.Parent_ID === null) {
              parent_companies.push(com);
           }
        
        });
        setParentCompany([...parentcompany, ...parent_companies]);
       
        });
        // const results = parentcompany.filter(com =>
        //     (JSON.stringify(com).toLowerCase().includes(searchTerm)
        
        
        //     )
        //     );


        Axios.get('/api/station').then((data, key)=>{

            const stations_data = data.data;
            console.log(data.data);
            setStations(stations_data);
            
              
              
            
              
              
              
              
              });
        
        
        },[])
        const handleId = (e) => {
            setId(e.target.value);
          }
          const handleParentid = (e) => {
            // var p_id = e.target.value;
            // if(!p_id){
            //     p_id="";
            // }
            setParentid(e.target.value);

          }
          const handleName = (e) => {
            setName(e.target.value);
          }
          const handleSubmit = () => {
            debugger;
           
          // if(!stations.SID){
            Axios.post('/api/company/create', {
                ID: id,
                Parent_ID: parentid,
                Name: name
            }).then((res) => {
              
                previousStack.push(res.data);
                setPreviousStack(previousStack);
                debugger;
                setCurrentMenus(res.data);
                console.log(res.data);
                
            })
           
          
          
            window.location.href="/"
          
          
          }
//         const onChangeSearch = (e) => {
// debugger;
//             const val = e.target.value;
          
//             setSearchTerm(val);
          
//           }

const teststa = (e) =>{

debugger;
    // const results = parentcompany.filter(com =>
    //     (com.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    
    
    //     )
    //     );


        previousStack.push(parentcompany);
        setPreviousStack(previousStack);
        debugger;
        setCurrentMenus(parentcompany);
        
        // const results = currentMenus.filter(com =>
        //     (JSON.stringify(com).toLowerCase().includes(searchTerm.toLocaleLowerCase())
        
        
        //     )
        //     );
        
    
return (
                        
<div style={{ display: hide ? "block" : "none" }}>
<Helsinki pid={pid} />
</div>
                        
                    )
}
debugger;
console.log(pid);
debugger;

        
    const renderMenuItems =data => {

        
data = parentcompany
        return data.map((item, index) =>
    
       
        (item) ? (

            <Nav>
            <Link key={item.ID}
                
                onClick={(e) => {
                
                    
                    teststa();
                    setpid(item.ID);
                    window.location.href="/helsinki_p/" + item.ID 
                    
                    }}
                    
                
                to={"/helsinki_p/" + item.ID  }>{item.Name}</Link>
                 <button className="btn btn-success"><i class="fa fa-edit"></i></button>
                 <button className="btn btn-danger"><i class="fa fa-trash"></i></button> </Nav> 
                

        ) : <Nav><Link key={index}>{item.Name}</Link></Nav>
        
       
    )

   


    }
   
    
    return data && (
        <>
         
        <div style={{ width: (sideNavState) ? '280px' : '0' }} className="multilevelSideNav">
        <div style={{display: "inline-flex"}}>
        <input type="text" name="title" id="exampleEmail"
          placeholder="Search Company"
          className="form-control mb-8 font-weight-bold " value={searchTerm} onChange={onChangeSearch} style={{ margin: "1rem", width: "70%" }}
        />
          <td><button className="btn btn-success" style={{ margin: "1rem"}}onClick={() => setShowAdd(true)}>+</button></td> </div>
          
        <Modal 
           isOpen={showAdd}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                ID:
                <input type="text" name="name" onChange={handleId} />
              </label>
              <br />
              <label>
                Parent_ID:
                <input type="text" name="name" onChange={handleParentid} />
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
          <button onClick={() => {setShowAdd(false); handleSubmit();}}>save</button>
          <button onClick={() => setShowAdd(false)}>cancel</button>
          {/* </div> */}
        </Modal>

            {/* <Link to={"#"} className="closebtn" onClick={e => sideNavHandler(false)}>&times;</Link> */}
            {(previousStack.length) ?
                <Link to={"#"} onClick={e => {
                    const prevState = previousStack.pop();
                    setPreviousStack(previousStack);
                    setCurrentMenus(prevState);

                }}>&lt; Back</Link>
                : null
            }
            {
                renderMenuItems(currentMenus)
            }

            
        </div>
       
       
        
        </>
        
    );

    
}

export default MultilevelSideNav;  