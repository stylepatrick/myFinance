var express = require('express')
var app = express();

var dbconnection = require ('./dbconnection.js');

var auth = require('basic-auth');
var _ = require('lodash');

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
        "select value, to_char(crdt, 'DD.MM.YYY  HH12:MI:SS') as crdt, note from MFI_BILLS where crby = '" + user + "' and extract (month FROM crdt) = extract (month FROM CURRENT_DATE) order by crdt desc;"
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
      "select value, to_char(crdt, 'DD.MM.YYY  HH12:MI:SS') as crdt, note from MFI_BILLS where crby = '" + user + "' and crdt between to_date('" + month + "." + year + "', 'MM.YYYY') and to_date('" + monthTo + "." + year + "', 'MM.YYYY');"
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
app.get('/api/new/bill/:user/:value/:note', function(req, result, callback){

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
        "INSERT INTO MFI_BILLS (value, crby, note) VALUES (" + req.params.value + ", '" + req.params.user + "', '" + req.params.note + "');"
      ).then(res => {
          const rowCreated = [{
          "rowCreated" : true,
         }];
        result.send(rowCreated);			
      })
      .catch(e => {
        console.error('query error', e.message, e.stack)
        pool.end();
      })
      })
  } else{
    const wrongInput = [{
      "wrongInput" : true,
     }];
    result.send(wrongInput);
  }
});

//ToDo find better solution for post with note and post without note
app.get('/api/new/bill/:user/:value', function(req, result, callback){

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
        "INSERT INTO MFI_BILLS (value, crby) VALUES (" + req.params.value + ", '" + req.params.user + "');"
      ).then(res => {
          const rowCreated = [{
          "rowCreated" : true,
         }];
        result.send(rowCreated);			
      })
      .catch(e => {
        console.error('query error', e.message, e.stack)
        pool.end();
      })
      })
  } else{
    const wrongInput = [{
      "wrongInput" : true,
     }];
    result.send(wrongInput);
  }
});


app.get('/api/new/salary/:user/:value', function(req, result, callback){

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
        "select * from MFI_SALARY where crby = '" +  req.params.user + "' and extract (month FROM crdt) = extract (month FROM CURRENT_DATE);"
      ).then(res => {
        if(res && res.rowCount == 0){
          client.query(
            "INSERT INTO MFI_SALARY (value, crby) VALUES (" + req.params.value + ", '" + req.params.user + "');"
          ).then(res => {
              const rowCreated = [{
              "rowCreated" : true,
             }];
            result.send(rowCreated);			
          })
          .catch(e => {
            console.error('query error', e.message, e.stack)
            pool.end();
          })

        } else {
          var salaryExistForThisMonth = [{
            "salaryExistForThisMonth" : true,
           }];
          result.send(salaryExistForThisMonth);
        }			
      })
      .catch(e => {
        console.error('query error', e.message, e.stack)
        pool.end();
        return null;
      })
      })
  } else{
    const wrongInput = [{
      "wrongInput" : true,
     }];
    result.send(wrongInput);
  }
});

app.get('/api/chartBills/:user/:month/:year', function (req, result, callback) {

  var user = req.params.user;
  var month = req.params.month;
  var year = req.params.year;
  
  try{
    var pool = dbconnection();
  }catch(err){
    console.log('Connect to database failed!')
    callback(null);
  }

  pool.connect().then(client => {
    client.query(
      "select month_name, year, amount, crby from V_mfi_bills_grouped where crby in (select slave_user from mfi_groups where master_user = '" + user + "') and month_index = '" + month +"' and year = '" + year + "' union select month_name, year, amount, crby from V_mfi_bills_grouped where crby = '" + user +"' and month_index = '" + month + "' and year = '" + year + "';"
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


app.get('/api/chartSalary/:user', function (req, result, callback) {

  var user = req.params.user;
  
  try{
    var pool = dbconnection();
  }catch(err){
    console.log('Connect to database failed!')
    callback(null);
  }

  pool.connect().then(client => {
    client.query(
      "select month_name, year, value, crby from V_mfi_salary_grouped where crby = '" + user + "' and year = extract (year FROM CURRENT_DATE) order by month_index;"
    ).then(res => {
      if(res && res.rowCount != 0){
        values = [];
        _.forEach(res.rows, function(row){
          values.push(row.value)
				})
        result.send(values);
      } else {
        var noUser = [{
          "userNotFound" : true,
         }];
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

app.get('/api/slaveUser/:user', function (req, result, callback) {

  var user = req.params.user;
  
  try{
    var pool = dbconnection();
  }catch(err){
    console.log('Connect to database failed!')
    callback(null);
  }

  pool.connect().then(client => {
    client.query(
      "select slave_user from mfi_groups where master_user = '" + user + "' union select master_user from mfi_groups where master_user = '" + user + "';"
    ).then(res => {
      if(res && res.rowCount != 0){
        users = [];
        _.forEach(res.rows, function(row){
          users.push(row.slave_user)
				})
        result.send(users);
      } else {
        var noUser = [{
          "userNotFound" : true,
         }];
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