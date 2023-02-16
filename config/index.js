require("dotenv").config();
const { createPool } = require("mysql");

//  CREATE CONNECTION VARIABLE

let connection = createPool({
  host: process.env.dbHost,
  database: process.env.dbName,
  user: process.env.dbUser,
  password: process.env.dbPwd,
  port: process.env.dbPort,
  multipleStatements: true,
});

module.exports = connection;
