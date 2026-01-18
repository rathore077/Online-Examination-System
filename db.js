// const mysql= require("mysql2");

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"online_exam"
// });

// db.connect(err=>{
//     if (err) throw err;
//     console.log("MySQL Connected");
// });

// module.exports =db;
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) console.error("DB error:", err);
  else console.log("MySQL Connected");
});

module.exports = db;
