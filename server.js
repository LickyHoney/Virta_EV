const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const mysql = require('mysql');

//Mysql configuration 
const connection = mysql.createConnection({
  host: "evcharging.cedseikoqjci.us-east-1.rds.amazonaws.com",
  user:"admin",
  password: "gashapolimera",
});

connection.connect();

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
app.get('/api/station/:id', (req, res) => {
  let sql_fetchbyid = 'SELECT * FROM Company.S001 WHERE ID = ?';
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



//Create company
app.post('/api/company', (req, res) => {
    let sql_create = 'INSERT INTO Company.K001 (ID, Parent_ID, Name) VALUES ( ?, ?, ?)';
    let ID = req.body.ID;
    let Parent_ID = req.body.Parent_ID;
    let Name = req.body.Name;
    let params = [ID, Parent_ID, Name];
    connection.query(sql_create, params,
        (err, rows, fields) => {
          res.send(rows);
        }  
    );
});

//Create company
app.post('/api/station', (req, res) => {
  let sql_create = 'INSERT INTO Company.S001 (ID, CID, Name) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
    let ID = req.body.ID;
    let CID = req.body.CID;
    let Name = req.body.Name;
   
    let params = [ID, CID, Name];
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

//Update station by id

app.post('/api/station/update/:id', (req, res) => {
  
  let sql_update = 'UPDATE Company.S001 SET ? WHERE ID = ?';
  let data = req.body;
  let id = req.params.id;
  connection.query(sql_update, [data, id],  
      (err, rows, fields) => {
        res.send(rows);
      }  
  );
});

//delete company by id
app.delete('/api/company/delete/:id', (req, res) => {
  let sql_delete = 'DELETE FROM Company.K001 WHERE ID = ?';
  let id = req.params.id;
  connection.query(sql_delete, id,
      (err, rows, fields) => {
        res.send(rows);
      }
  )
});

//delete station by id
app.delete('/api/station/delete/:id', (req, res) => {
  let sql_delete = 'DELETE FROM Company.S001 WHERE ID = ?';
  let id = req.params.id;
  connection.query(sql_delete, id,
      (err, rows, fields) => {
        res.send(rows);
      }
  )
});

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