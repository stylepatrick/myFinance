var express = require('express')
var app = express();

const { Client } = require('pg');
var Pool = require('pg-pool');
var dbconnection = require ('./dbconnection.js');

var auth = require('basic-auth');

var username = 'patrick'; //process.env.ENV_API_USER;
var password = 'patrick'; //process.env.ENV_API_PASS;

app.listen(3000)


app.get('/', function (req, res) {
  res.send('MyFinance API is Running! :)');
})


app.use('/api',function(req, res, callback) {
  var user = auth(req);

  if (user === undefined || user['name'] !== username || user['pass'] !== password) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
      res.end('Unauthorized');
  } else {
      callback();
  }
});


app.get('/api/entries/:user', function (req, result) {
    
    var user = req.params.user;
    
    try{
      var pool = dbconnection();
    }catch(err){
      console.log('Connect to database failed!')
      callback(null);
    }
  
    pool.connect().then(client => {
      client.query(
        "select value, crdt from MON_ENTRIES where crby = '" + user + "';"
      ).then(res => {
        if(res && res.rowCount != 0){
          result.send(res.rows);
        } else {
          var noUser = {  
            "userNotFound" : true,
           };
          result.send(noUser);
          
        }			
      })
      .catch(e => {
        console.error('query error', e.message, e.stack)
        pool.end();
        return null;
      })
      })
})

app.get('/api/new/:user/:value', function(req, result){

  try{
    var pool = dbconnection();
  }catch(err){
    console.log('Connect to database failed!')
    callback(null);
  }

  if(req.params.value && req.params.user)
  {
    pool.connect().then(client => {
      client.query(
        "INSERT INTO MON_ENTRIES (value, crby) VALUES (" + req.params.value + ", '" + req.params.user + "');"
      ).then(res => {
        var rowCreated = {  
          "rowCreated" : true,
         };
        result.send(rowCreated);			
      })
      .catch(e => {
        console.error('query error', e.message, e.stack)
        pool.end();
      })
      })
  } else{
    var wrongInput = {  
      "wrongInput" : true,
     };
    result.send(rowCreated);
  }
})
