import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MultilevelSideNav.css';
import styled from 'styled-components';
import Axios from 'axios';
import Helsinki from './Companies/Helsinki';

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
        const station_data =stations.map((sid) => sid.CID)
        console.log(station_data)



const teststa = (e) =>{
    //     parentcompany.map((item, index) => {
    //     const pid_n = item.ID;
    //     setpid(pid_n);
    // })
        previousStack.push(parentcompany);
        setPreviousStack(previousStack);
        debugger;
        setCurrentMenus(parentcompany);
        
        debugger;

    
return (
                        
<div style={{ display: hide ? "block" : "none" }}>
<Helsinki pid={pid} />
</div>
                        
                    )
}
debugger;
console.log(pid);
debugger;

        
    const renderMenuItems = data => {

        return parentcompany.map((item, index) =>
    
       
        (item)? (

            <Nav>
            <Link key={item.ID}
                
                onClick={e => {
                    //path: window.location
                    
                    teststa();
                    setpid(item.ID);
                    window.location.href="/helsinki_p/" + item.ID 
                    }}
                    
                
                to={"/helsinki_p/" + item.ID  }>{item.Name} &gt; </Link></Nav>

        ) : <Nav><Link key={index}>{item.Name}</Link></Nav>
        
       
    )

   


    }
   
  
    return data && (
        <>
         
        <div style={{ width: (sideNavState) ? '250px' : '0' }} className="multilevelSideNav">
            <Link to={"#"} className="closebtn" onClick={e => sideNavHandler(false)}>&times;</Link>
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