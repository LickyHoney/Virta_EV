import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import './App.css';
import Home from './components/Home';
import MultilevelSideNav from './components/MultilevelSideNav';
import Page from './components/Page';
import styled from 'styled-components';
import Company from './Company';
import Helsinki from './components/Companies/Helsinki';


const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const App = () => {

const [sideNavState,setSideNavState] = useState(false);
const [parentcompany,setParentCompany]=useState([]);
const [menuitems, setMenuitems]= useState([]);
const [childcompany, setChildCompany]=useState([]);


useEffect(()=>{
  Axios.get('/api/company').then((data, key)=>{
  
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



const resultArray1 = JSON.stringify(parentcompany.map((menu_item) => menu_item.ID).reduce((res, item, idx) => {
  return [...res, { id: item, name: parentcompany.map((menu_item) => menu_item.Name)[idx] }];
}, []));
console.log(resultArray1);


 
  
  const menuData = [
    
    {
      name: "Helsinki",
      children: [
        {
          name: "Parent_company",
          url: "/helsinki_p",

        },
       
        {
          name: "Susidiary_companies",
          children: [
            {
              name: "subcompany1",
              url: "/page/helsinki_sub1"
            },
            {
              name: "subcompany2",
              url: "/page/helsinki_sub2"
            },
          ]
        }
      ]
    },
    
    {
      name: "Turku",
      children: [
        {
          name: "Parent_company",
          url: "/page/turku_p"
        },
        
        {
          name: "Susidiary_companies",
          children: [
            {
              name: "subcompany1",
              url: "/page/turku_sub1"
            },
            {
              name: "subcompany2",
              url: "/page/turku_sub2"
            },
          ]
        }
      ]
    
    },
    {
      name: "Espoo",
      children: [
        {
          name: "Parent_company",
          url: "/page/espoo_p"
        },
        
        {
          name: "Susidiary_companies",
          children: [
            {
              name: "subcompany1",
              url: "/page/espoo_sub1"
            },
            {
              name: "subcompany2",
              url: "/page/espoo_sub2"
            },
          ]
        }
      ]
    },
    {
      name: "Vanta",
      url: "/page/menu-3-3-1"
     },
    
  ]


  return (
    <div className="App">
    
      <Router>
        <MultilevelSideNav sideNavState={sideNavState} sideNavHandler={setSideNavState} data={resultArray1} />
        <div>
          <Nav><h2><span style={{fontSize:'30px',cursor:'pointer', color:'white'}} onClick={e=>setSideNavState(true)}>&#9776; Companies</span></h2> </Nav>     
          <Switch> 
          <Route path="/page/:slug" exact component={Page} />

   
             
        
        <Route path="/helsinki_p/:id" exact component= {Helsinki} />
          <Route path="/" exact component={Home} />
            
        </Switch>
        </div>        
      </Router>
     
    </div>
  );
}



export default App;
