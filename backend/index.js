var express = require('express')
var app = express();

var dbconnection = require ('./dbconnection.js');

var auth = require('basic-auth');

var username = 'patrick'; //process.env.ENV_API_USER;
var password = 'patrick'; //process.env.ENV_API_PASS;

app.listen(3000);


app.get('/', function (req, res) {
  res.send('MyFinance API is Running! :)');
});

//ToDo add keycloak to backend. Basic Auth is not secure.
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


app.get('/api/currentBills/:user', function (req, result, callback) {

    var user = req.params.user;
    
    try{
      var pool = dbconnection();
    }catch(err){
      console.log('Connect to database failed!')
      callback(null);
    }
  
    pool.connect().then(client => {
      client.query(
        "select value, to_char(crdt, 'DD.MM.YYY  HH12:MI:SS') as crdt, note from MON_ENTRIES where crby = '" + user + "' and extract (month FROM crdt) = extract (month FROM CURRENT_DATE) order by crdt desc;"
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
});

app.get('/api/historyBills/:user/:month/:year', function (req, result, callback) {

  var user = req.params.user;
  var month = req.params.month;
  var monthTo = parseInt(month) + 1;
  var year = req.params.year;

  
  try{
    var pool = dbconnection();
  }catch(err){
    console.log('Connect to database failed!')
    callback(null);
  }

  pool.connect().then(client => {
    client.query(
      "select value, to_char(crdt, 'DD.MM.YYY  HH12:MI:SS') as crdt, note from MON_ENTRIES where crby = '" + user + "' and crdt between to_date('" + month + "." + year + "', 'MM.YYYY') and to_date('" + monthTo + "." + year + "', 'MM.YYYY');"
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
});

//ToDo find better solution for post with note and post without note
app.get('/api/new/:user/:value/:note', function(req, result, callback){

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
        "INSERT INTO MON_ENTRIES (value, crby, note) VALUES (" + req.params.value + ", '" + req.params.user + "', '" + req.params.note + "');"
      ).then(res => {
          const rowCreated = {
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
    const wrongInput = {
      "wrongInput" : true,
     };
    result.send(wrongInput);
  }
});

//ToDo find better solution for post with note and post without note
app.get('/api/new/:user/:value', function(req, result, callback){

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
          const rowCreated = {
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
    const wrongInput = {
      "wrongInput" : true,
     };
    result.send(wrongInput);
  }
});
