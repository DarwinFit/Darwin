const mysql = require('mysql');

const config = {
                host: 'localhost', 
                user: 'root', 
                password: '', 
                database: 'russell'
               }; 

const db = mysql.createConnection(config);

module.exports;