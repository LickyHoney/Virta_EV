const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const mysql = require('mysql');
const { Console } = require('console');

//Mysql configuration 
const connection = mysql.createConnection({
  host: "evcharging.cedseikoqjci.us-east-1.rds.amazonaws.com",
  user:"admin",
  password: "gashapolimera",
});

connection.connect();


//COMPANIES API
//get all companies
app.get('/api/company', (req, res) => {
  let sql_fetch = 'SELECT * FROM Company.K001';
  connection.query(sql_fetch, (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
  });

//get company by id
app.get('/api/company/id/:id', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.K001 WHERE ID = ?';
  let id = req.params.id;
  connection.query(sql_fetchbyid, id,
      (err, rows, fields) => {
        res.send(rows);
      }
  )
})

//Create company
app.post('/api/company/create/', (req, res) => {
  let sql_create = 'INSERT INTO Company.K001 (ID, Parent_ID, Name) VALUES ( ?, ?, ?)';
  let id = req.body.ID;
  let parent_id = req.body.Parent_ID;
  let name = req.body.Name;
  let params = [id, parent_id, name];
  connection.query(sql_create, params,
      (err, rows, fields) => {
      
        res.send(rows);
      }  
  );
});

//Update Company by id
app.post('/api/company/update/:id', (req, res) => {
  
  let sql_update = 'UPDATE Company.K001 SET ? WHERE ID = ?';
  let data = req.body;
  let id = req.params.id;
  connection.query(sql_update, [data, id],  
      (err, rows, fields) => {
        res.send(rows);
      }  
  );
});

// //delete company by id
// app.delete('/api/company/delete/:id', (req, res) => {
//   let sql_delete = 'DELETE FROM Company.K001 WHERE ID = ?';
//   let id = req.params.id;
//   connection.query(sql_delete, id,
//       (err, rows, fields) => {
//         res.send(rows);
//       }
//   )
// });

//delete company by id
app.delete('/api/company/delete/:id', (req, res) => {
  let sql_delete =  'DELETE Company.K001, Company.S001 , Company.ST001  FROM Company.K001  INNER JOIN Company.S001 INNER JOIN Company.ST001 WHERE Company.K001.ID = Company.S001.CID and Company.S001.SID = Company.ST001.SID AND Company.K001.ID = ?';
  //let sql_delete = 'DELETE FROM Company.K001 WHERE ID = ?';
  let id = req.params.id;
  connection.query(sql_delete, id,
      (err, rows, fields) => {
        res.send(rows);
      }
  )
});


//STATIONS API
//Create station
app.post('/api/station/create', (req, res) => {
  let sql_create = 'INSERT INTO Company.S001 (SID, CID, Name) VALUES ( ?, ?, ?)';
    let sid = req.body.SID;
    let cid = req.body.CID;
    let name = req.body.Name;
   
    let params = [sid, cid, name];
    connection.query(sql_create, params,
        (err, rows, fields) => {
          res.send(rows);
        }  
    );
  
});

//get all stations 
app.get('/api/station', (req, res) => {
  let sql_fetch = 'SELECT * FROM Company.S001';
  connection.query(sql_fetch, (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
  });

//get station by id
app.get('/api/station/sid/:sid', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.S001 WHERE SID = ?';
  let id = req.params.id;
  connection.query(sql_fetchbyid, id,
      (err, rows, fields) => {
        if(err) throw err;
  
    console.log('Stations data received from Db:');
    console.log(id);
   
        res.send(rows);
      }
  )
})

//get station by CID
app.get('/api/station/cid/:cid', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.S001 WHERE CID = ?';
  
  let cid = req.params.cid;
  console.log(cid)
  connection.query(sql_fetchbyid, cid, 
      (err, rows, fields) => {
        if(err) throw err;
  
    console.log('Stations data received from Db:');
    console.log(cid)
   
   
        res.send([rows]);
       
      }
  )
})

//Update station by id

app.put('/api/station/update/:sid', (req, res) => {
  
  let sql_update = 'UPDATE Company.S001 SET ? WHERE SID = ?';
  let name = req.body
  console.log(name);
  let id = req.params.sid;
  console.log(id)
  connection.query(sql_update, [name, id],  
      (err, rows, fields) => {
        if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
        res.send(rows);
      }  
  );
});

// //delete station by id
// app.delete('/api/station/delete/:sid', (req, res) => {
//   let sql_delete = 'DELETE FROM Company.S001 WHERE SID = ?';
//   let id = req.params.sid;
//   connection.query(sql_delete, id,
//       (err, rows, fields) => {
//         if(err) throw err;
  
//         console.log('Data received from Db:');
//         console.log(rows);
//         res.send(rows);
//       }
//   )
// });

//delete station by id
app.delete('/api/station/delete/:sid', (req, res) => {

  let sql_delete =  'DELETE Company.S001 , Company.ST001  FROM Company.S001  INNER JOIN Company.ST001 WHERE Company.S001.SID= Company.ST001.SID and Company.S001.SID = ?';

  // let sql_delete = 'DELETE FROM Company.S001 WHERE SID = ?';

  let id = req.params.sid;
  connection.query(sql_delete, [id, id],
      (err, rows, fields) => {
        if(err) throw err;
  
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
      }
  )
});
//STATION TYPES API

//get all stations types
app.get('/api/station_type', (req, res) => {
  let sql_fetch = 'SELECT * FROM Company.ST001';
  connection.query(sql_fetch, (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
    res.send(rows);
  });
  });

//get station type by id
app.get('/api/station_type/stid/:stid', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.ST001 WHERE STID = ?';
  let id = req.params.id;
  connection.query(sql_fetchbyid, id,
      (err, rows, fields) => {
        if(err) throw err;
  
    console.log('Stations data received from Db:');
    console.log(id);
   
        res.send(rows);
      }
  )
})

//get station type by SID
app.get('/api/stationtype/sid/:sid', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.ST001 WHERE SID = ?';
  
  let sid = req.params.sid;
 
  connection.query(sql_fetchbyid, sid, 
      (err, rows, fields) => {
        if(err) throw err;
  
    console.log('Stations data received from Db:');
    console.log(sid)
   
   
        res.send([rows]);
       
      }
  )
})

//create Station type by sid

app.post('/api/stationtype/create', (req, res) => {
  let sql_create = 'INSERT INTO Company.ST001 (STID, SID, NAME, MPOWER) VALUES ( ?, ?, ?, ?)';
    let stid = req.body.STID;
    let sid = req.body.SID;
    let name = req.body.NAME;
    let mpower = req.body.MPOWER;
   
    let params = [stid, sid, name, mpower];
    
    connection.query(sql_create, params,
        (err, rows, fields) => {
          if(err) throw err;
          Console.log(params);
          console.log('Stations data received from Db:');
          console.log(rows)
          res.send(rows);
        }  
    );
  
});

//Update station type by id


app.put('/api/station_type/update/:stid', (req, res) => {
  
  let sql_update = 'UPDATE Company.ST001 SET ? WHERE STID = ?';
  let data = req.body;
  let id = req.params.stid;
  connection.query(sql_update, [data, id],  
      (err, rows, fields) => {
        res.send(rows);
      }  
  );
});

//delete station type by id
app.delete('/api/stationtype/delete/:stid', (req, res) => {
  let sql_delete = 'DELETE FROM Company.ST001 WHERE STID = ?';
  let id = req.params.stid;
  connection.query(sql_delete, id,
      (err, rows, fields) => {
        res.send(rows);
      }
  )
});


//STATUS API

//api for status 
app.get('/api/company/station_status/:id', (req, res) => {
  let id = req.params.id;
  if(id == 1 ){
res.send("Charging")
}
if(id == 0){
  res.send("Available")
  }
})


app.listen(port, () => console.log(`Listening on port ${port}`));