var Pool = require('pg-pool');

function dbconnection(){
    //console.log('Connected to Database!')
    var pool = new Pool({
        user: 'myfinance',
        host: '192.168.0.254',
        database: 'myfinance',
        password: 'money1234#',
        port: 5432
    });
    return pool;
}
module.exports = dbconnection;