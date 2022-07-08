var mysql = require('mysql');

var db =  mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "",
    database : "users_db"
});

module.exports = db;