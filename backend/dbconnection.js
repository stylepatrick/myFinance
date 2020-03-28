var Pool = require('pg-pool');

function dbconnection(){
    //console.log('Connected to Database!')
    var pool = new Pool({
        user: process.env.ENV_DB_USER,
        host: process.env.ENV_DB_HOST,
        database: process.env.ENV_DB_DATABASE,
        password: process.env.ENV_DB_PASSWORD,
        port: process.env.ENV_DB_PORT,
    });
    return pool;
}
module.exports = dbconnection;
