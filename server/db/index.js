const mysql = require('mysql');

const config = {
	host: 'russell2018.cfjtr9fufcj4.us-east-1.rds.amazonaws.com',
	user: 'teamRussell',
	password: 'teamRussell',
	database: 'teamRussell'
};

const db = mysql.createConnection(config);

module.exports.db = db;
