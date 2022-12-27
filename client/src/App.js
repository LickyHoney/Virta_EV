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


const Nav = styled.div`
background: #15171c;
background-size: contain;
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
const [searchTerm, setSearchTerm] = useState([]);
const [companies, setCompanies]= useState([]);



useEffect(()=>{
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
    debugger;
                const val = e.target.value;
              
                setSearchTerm(val);
              
              }
              const res1 = childcompany.filter(com =>
                (JSON.stringify(com).toLowerCase().includes(searchTerm)
            
            
                )
                );

              const results = companies.filter(com =>
                (JSON.stringify(com.Name).toString().toLowerCase().includes(searchTerm)
            
            
                )
                );

debugger;
const resultArray1 = JSON.stringify(results.map((menu_item) => menu_item.ID).reduce((res, item, idx) => {
  return [...res, { id: item, name: results.map((menu_item) => menu_item.Name)[idx] }];
}, []));
console.log(resultArray1);

// const res4 = JSON.stringify(res1.map((menu_item) => menu_item.ID).reduce((res, item, idx) => {
//   return [...res, { id: item, name: res1.map((menu_item) => menu_item.Name)[idx] }];
// }, []));


// console.log(res4)
// debugger;
// const resultArray2 = JSON.stringify(results.filter((id) => id.ID ===)results.map((menu_item) => menu_item.ID).reduce((res, item, idx) => {
//   return [...res, { id: item, name: results.map((menu_item) => menu_item.Name)[idx],
//   children: res4 }];
// }, []));
// debugger
// console.log(resultArray2);
 
  
  // const menuData = [
    
  //   {
  //     name: "Helsinki",
  //     children: [
  //       {
  //         name: "Parent_company",
  //         url: "/helsinki_p",

  //       },
       
  //       {
  //         name: "Susidiary_companies",
  //         children: [
  //           {
  //             name: "subcompany1",
  //             url: "/page/helsinki_sub1"
  //           },
  //           {
  //             name: "subcompany2",
  //             url: "/page/helsinki_sub2"
  //           },
  //         ]
  //       }
  //     ]
  //   },
    
  //   {
  //     name: "Turku",
  //     children: [
  //       {
  //         name: "Parent_company",
  //         url: "/page/turku_p"
  //       },
        
  //       {
  //         name: "Susidiary_companies",
  //         children: [
  //           {
  //             name: "subcompany1",
  //             url: "/page/turku_sub1"
  //           },
  //           {
  //             name: "subcompany2",
  //             url: "/page/turku_sub2"
  //           },
  //         ]
  //       }
  //     ]
    
  //   },
  //   {
  //     name: "Espoo",
  //     children: [
  //       {
  //         name: "Parent_company",
  //         url: "/page/espoo_p"
  //       },
        
  //       {
  //         name: "Susidiary_companies",
  //         children: [
  //           {
  //             name: "subcompany1",
  //             url: "/page/espoo_sub1"
  //           },
  //           {
  //             name: "subcompany2",
  //             url: "/page/espoo_sub2"
  //           },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: "Vanta",
  //     url: "/page/menu-3-3-1"
  //    },
    
  // ]


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
