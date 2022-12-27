import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import './App.css';
import Home from './components/Home';
import MultilevelSideNav from './components/MultilevelSideNav';
import Page from './components/Page';
import styled from 'styled-components';
import Company from './Company';
import Stations from './components/Companies/Stations';

//Style dv for Nav bar
const Nav = styled.div`
background: #15171c;
background-size: contain;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const App = () => {

//Declarations
const [sideNavState,setSideNavState] = useState(false);
const [parentcompany,setParentCompany]=useState([]);
const [menuitems, setMenuitems]= useState([]);
const [childcompany, setChildCompany]=useState([]);
const [searchTerm, setSearchTerm] = useState([]);
const [companies, setCompanies]= useState([]);


//Initialization
useEffect(()=>{

  //Getting companies data
  Axios.get('/api/company').then((data, key)=>{
  const data1 = data.data
  setCompanies(data1);
  let parent_companies = [];
  let child_companies =[];
  let menu_items =[];

  data.data.forEach((com) => {
    if (com.Parent_ID === null){
      menu_items.push(com.ID, com.Name) 
    }
  })
  setMenuitems([...parentcompany, ...menu_items]);
  data.data.forEach((com) => {
    if (com.Parent_ID === null) {
        parent_companies.push(com);
     }
     else {
      child_companies.push(com);
     }
  });
  setParentCompany([...parentcompany, ...parent_companies]);
  setChildCompany([...childcompany, ...child_companies]);
  });
  
  
  },[])


  const onChangeSearch = (e) => {
    
                const val = e.target.value;
              
                setSearchTerm(val);
              
    }
              
    
  
const results = companies.filter(com =>
  (JSON.stringify(com.Name).toString().toLowerCase().includes(searchTerm)
            
            
      )
    );


const resultArray1 = JSON.stringify(results.map((menu_item) => menu_item.ID).reduce((res, item, idx) => {
  return [...res, { id: item, name: results.map((menu_item) => menu_item.Name)[idx] }];
}, []));



//Rendering
  return (
    <div className="App">
    
      <Router>
        <MultilevelSideNav sideNavState={sideNavState} sideNavHandler={setSideNavState} data={results} value={searchTerm} onChange={onChangeSearch} />
        <div>
          <Nav><h2><span style={{fontSize:'20px',cursor:'pointer', color:"white"}} onClick={e=>setSideNavState(true)}>&#9776; Companies</span></h2> 
          </Nav> 
          <h2><b class="headertekst"> EV Charging Stations</b></h2>
          <Switch> 
          <Route path="/page/:slug" exact component={Page} />

   
             
        
        <Route path="/helsinki_p/:id" exact component= {Stations} />
          <Route path="/" exact component={Home} />
            
        </Switch>
        </div>        
      </Router>
     
    </div>
  );
}



export default App;
