const mysql = require('mysql');
let DBUSER, DBPASSWORD, DBHOST, DBNAME;
try {
  DBUSER = require('../../config.js').DBUSER;
  DBPASSWORD = require('../../config.js').DBPASSWORD;
  DBHOST = require('../../config.js').DBHOST;
  DBNAME = require('../../config.js').DBNAME;
} catch (err) {
  DBUSER = process.env.DBUSER;
  DBPASSWORD = process.env.DBPASSWORD;
  DBHOST = process.env.DBHOST;
  DBNAME = process.env.DBNAME;
}

const config = {
  host: DBHOST,
  user: DBUSER,
  password: DBPASSWORD,
  database: DBNAME
};

const db = mysql.createConnection(config);

module.exports.db = db;
