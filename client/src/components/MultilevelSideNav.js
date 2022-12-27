import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MultilevelSideNav.css';
import styled from 'styled-components';
import Axios from 'axios';
import Helsinki from './Companies/Stations';
import { common } from '@material-ui/core/colors';
import Modal from 'react-modal';


const MultilevelSideNav = ({ data, sideNavState, sideNavHandler }) => {

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
    const [uname, setUname] = useState("");
    const [searchTerm, setSearchTerm] = useState([])
    const [q, setQ] = useState("")
    const [companies, setCompanies]= useState([]);

    useEffect(()=>{
        Axios.get('/api/company').then((data, key)=>{
         const data1 = data.data;
         setCompanies(data1);
        let parent_companies = [];
       
      console.log(JSON.stringify(data.data));
      
        data.data.forEach((com) => {
          if (com.Parent_ID === null) {
              parent_companies.push(com);
           }
        
        });

        // const results = parent_companies.filter(com =>
        //   (JSON.stringify(com).toLowerCase().includes(searchTerm)
      
      
        //   )
        //   );
        
        setParentCompany([...parentcompany, ...parent_companies]);
        console.log(parent_companies)
        });
        


        Axios.get('/api/station').then((data, key)=>{

            const stations_data = data.data;
            console.log(data.data);
            setStations(stations_data);
        });
        
        
        },[])
        const handleUname = (e) => {
            setUname(e.target.value);
        }
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
          const handleUpdate = (id) => {
            debugger;
           
          
            Axios.put('/api/company/update/' + id, {
                
               
                Name: uname
            })
            alert("station is created")
            window.location.href="/" ;
            debugger;
            
          
          
          }

          const handleDelete = (id) => {
            debugger;
            Axios.delete('/api/company/delete/' + id ).then((data, key) => {
            
              setStations(
                stations.filter((company) => {
                  return company.ID !== id;
                })
               
              );
             alert ("station is deleted")
             window.location.href="/" 
              if (data.data[0].status === 200) 
          debugger;
              alert("Success!");
          
            });
          };
        const onChangeSearch = (e) => {
debugger;
            const val = e.target.value.toLowerCase();
          
            setSearchTerm(val);
          
          }

const menuItems = (e) =>{

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

        
data = companies

const results = data.filter(com =>
  (JSON.stringify(com.Name).toString().toLowerCase().indexOf(searchTerm)> -1


  )
  );
        return results.map((item, index) =>
    
       
        (item) ? (

            <Nav>
            <Link key={item.ID}
                
                onClick={(e) => {
                
                    
                  menuItems();
                    setpid(item.ID);
                    window.location.href="/helsinki_p/" + item.ID 
                    
                    }}
                    
                
                to={"/helsinki_p/" + item.ID  }>{item.Name}</Link>
                 <button class="btn btn-success"onClick={() => setShowEdit(true)}><i class="fa fa-edit"></i></button>
               <Modal 
           isOpen={showEdit}
           contentLabel="Minimal Modal Example"
           className="Modal_STA"
           overlayClassName="Overlay"
        >
          <div>
          <form>
              <label>
                Name:
                <input type="text" name="name" onChange={handleUname} />
              </label>
              <br />
              
              
            </form>
          </div>
          
          <button onClick={() => {setShowEdit(false); handleUpdate(item.ID);}}>save</button>
          <button onClick={() => setShowEdit(false)}>cancel</button>
        
        </Modal>
        <button class="btn btn-danger" onClick={(e)=> {handleDelete(item.ID);}}><i class="fa fa-trash"></i></button></Nav> 
                

        ) : <Nav><Link key={index}>{item.Name}</Link></Nav>
        
       
    )

   


    }

    
    return data && (
        <>
         
        <div style={{ width: (sideNavState) ? '300px' : '0' }} className="multilevelSideNav">
        <Link to={"/"}style={{float: "left"}} onClick={e => {
                    const prevState = previousStack.pop();
                    setPreviousStack(previousStack);
                    setCurrentMenus(prevState);
                    window.location.href="/" 

                }}><i class="fa fa-home"></i></Link>
        <div style={{display: "inline-flex"}}>
        
        <input type="text" name="title" id="exampleEmail"
          placeholder="Search Company"
          className="form-control mb-8 font-weight-bold " value={searchTerm} onChange={onChangeSearch} style={{ margin: "1rem", width: "70%" }}
        />
          <button className="btn btn-success" style={{ margin: "1rem"}}onClick={() => setShowAdd(true)}>+</button></div>
          
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
            
                
               
            {
                renderMenuItems(currentMenus)
            }

            
        </div>
       
       
        
        </>
        
    );

    
}

export default MultilevelSideNav;  