require("dotenv").config();
const mysql = require("mysql2");

// Develop Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASS
})

module.exports = connection;