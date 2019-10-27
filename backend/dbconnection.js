var Pool = require('pg-pool');

function dbconnection(){
    //console.log('Connected to Database!')
    var pool = new Pool({
        user: 'money-overview',
        host: '192.168.0.254',
        database: 'money-overview',
        password: 'money1234#',
        port: 5432
    });
    return pool;
}
module.exports = dbconnection;