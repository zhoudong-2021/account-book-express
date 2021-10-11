const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// Create a link to database.
const con = mysql.createConnection(MYSQL_CONF);

// Start connection.
con.connect();

// Execute sql commands.
function exec(sql){
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}


