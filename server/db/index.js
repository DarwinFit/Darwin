const mysql = require('mysql');

const config = {
	host: 'russel.cfjtr9fufcj4.us-east-1.rds.amazonaws.com',
	user: 'teamRussell',
	password: 'teamRuSSell',
	database: 'russell'
};

const db = mysql.createConnection(config);

module.exports.db = db;
