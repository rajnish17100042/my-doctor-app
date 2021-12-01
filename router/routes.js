const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
// saltRound for password hashing
const saltRounds = 12;

// requiring database connection
const db = require("../db/conn");

const validateInput = require("../validation/input_data_validation.js");
const getTableName = require("../validation/get_table_name.js");

// create route for Admin registration
router.post("/registration/:role", (req, res) => {
  const role = req.params.role;
  req.role = role;
  // console.log(req.role);

  // calling function for input validation
  const isInputValidated = validateInput(req);

  console.log(isInputValidated);
  if (!isInputValidated) {
    res
      .status(400)
      .json({ success: false, message: "Please fill the data properly" });
  } else {
    //proceed forward after the  input validation
    // first based on the role get table name
    const tableName = getTableName(role);
    console.log(tableName);

    // before registration check if user already present
    db.query(
      `select email from ${tableName} where email=?`,
      req.body.email,
      (err, result) => {
        if (err) {
          // throw err;
          return res.status(400).json({
            success: false,
            message: "Some error occured please registered again",
          });
        }
        //   console.log(result, result.length);
        if (result.length > 0) {
          // console.log("helo hello hello");
          return res
            .status(400)
            .json({ success: false, message: "user is already registered" });
        } else {
          // password hashing using bcrypt
          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
              // throw err;
              return res.status(400).json({
                success: false,
                message: "Some error occured please registered again",
              });
            }
            req.body.password = hash;
            // console.log(req.body.password);
            let sql = `insert into ${tableName} set ?`;
            // delete cpassword property from req.body object
            delete req.body.cpassword;
            console.log(req.body);
            // insert the data to database
            db.query(sql, req.body, (err, result) => {
              if (err) {
                //   throw err;
                return res.status(400).json({
                  success: false,
                  message: "Some error occured please registered again",
                });
              }
              // console.log(result);

              return res.status(200).json({
                success: true,
                message: "User registedred Successfully",
              });
            });
          });
        }
      }
    );
  }
});

module.exports = router;
