const mysql = require("mysql");
const host = process.env.MYSQL_DATABASE_HOST;
const user = process.env.MYSQL_DATABASE_USER;
const password = process.env.MYSQL_DATABASE_PASSWORD;
const database = process.env.MYSQL_DATABASE_NAME;

// connect to remote database
const cred = {
  host,
  user,
  password,
  database,
};

//to use more than one query
// let db = mysql.createConnection({ multipleStatements: true });

db = mysql.createConnection(cred);
db.connect((err) => {
  if (err) {
    // throw err;
    console.log(err);
  } else {
    console.log("Mysql connected...");
  }
});
module.exports = db;
