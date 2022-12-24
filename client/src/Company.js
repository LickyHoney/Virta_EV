
// // import Customer from './components/Customer';
// //import CustomerAdd from './components/CustomerAdd';
// import './App.css';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import React,{useState,useEffect} from 'react'
// import Axios from 'axios'



// function Company() {

// const [parentcompany,setParentCompany]=useState([]);
// const [childcompany, setChildCompany]=useState([]);


// useEffect(()=>{
// Axios.get('/api/company').then((data, key)=>{

// let parent_companies = [];
// let child_companies =[];

// data.data.forEach((com) => {
//   if (com.Parent_ID === null) {
//       parent_companies.push(com);
//    }
//    else {
//     child_companies.push(com);
//    }
// });
// setParentCompany([...parentcompany, ...parent_companies]);
// setChildCompany([...childcompany, ...child_companies]);
// });


// },[])


  
// return (
//     <div className="MainPage">
//      <div className="PostContainer">
//      <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>

//        {parentcompany.map((val,key)=>{
//          return (
          
//             <h4>{val.Name}{val.ID}</h4>

//            )  })}  

// </TableRow>
//             </TableHead>
              
//           </Table>
//         </Paper>

//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>

//        {childcompany.map((val,key)=>{
//          return (
          
//             <h4>{val.Name}{val.ID}</h4>

//            )  })}  

// </TableRow>
//             </TableHead>
              
//           </Table>
//         </Paper>
//           </div>
//         </div>
//     )}

// export default Company
