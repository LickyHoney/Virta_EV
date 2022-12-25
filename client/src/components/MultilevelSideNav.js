import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MultilevelSideNav.css';
import styled from 'styled-components';
import Axios from 'axios';
import Helsinki from './Companies/Helsinki';
import { common } from '@material-ui/core/colors';

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
        Axios.get('/api/station').then((data, key)=>{

            const stations_data = data.data;
            console.log(data.data);
            setStations(stations_data);
            
              
              
            
              
              
              
              
              });
        
        
        },[])
debugger;
       
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
                    
                
                to={"/helsinki_p/" + item.ID  }>{item.Name}</Link></Nav>

        ) : <Nav><Link key={index}>{item.Name}</Link></Nav>
        
       
    )

   


    }
   
    
    return data && (
        <>
         
        <div style={{ width: (sideNavState) ? '250px' : '0' }} className="multilevelSideNav">
        <input type="text" name="title" id="exampleEmail"
          placeholder="Search Station"
          className="form-control mb-8 font-weight-bold " value={searchTerm} onChange={onChangeSearch} style={{ margin: "1rem" }}
        />
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