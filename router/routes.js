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

const validateInput = require("../validation/input_data_validation");
const getTableName = require("../validation/get_table_name");
const authenticate = require("../middleware/authentication");

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
    // console.log(tableName);

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
        // console.log(result, result.length);
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
            // console.log(req.body);
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

//route for user login
router.post("/login", (req, res) => {
  // global variables
  // based on the role will select the table
  let tableName = "";
  let dbpassword = "";
  let dbemail = "";

  // destructuring of data
  // console.log(req);
  let { email, password, role } = req.body;
  const data = req.body;
  console.log(data);

  // server side validation
  if (!email || !password || !role) {
    return res.json({
      success: false,
      message: "please fill the data properly",
    });
  }
  // now based on the role choose the table for student,teacher or admin
  tableName = getTableName(role);
  console.log(tableName);

  //  first  search the user in the database with the help of email and take only email and password, will need later to generate payload for jwt and passowrd verification
  const sql = `select email,password from ${tableName} where email=?`;
  db.query(sql, email, async (err, result) => {
    // if user is not found then the result will be an empty array
    console.log(result);
    if (err) {
      //  throw err;
      console.log(err);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    }
    if (!result.length) {
      console.log(result.length);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    } else if (result.length) {
      dbpassword = result[0].password;
      dbemail = result[0].email;
    }

    console.log("User found checking password");
    try {
      // use the password retrieved from the database in the above query
      console.log(dbpassword);
      // now compare the password using bcrypt  ...password===dbpassword
      const passwordMatch = await bcrypt.compare(password, dbpassword); //returns true or false
      console.log(passwordMatch);
      if (!passwordMatch) {
        console.log("invalid credentials");
        return res.json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // if every thing is fine then genetate a  token for the user ...jwt authentication and store it in the cookie for access the protected routed

      // checking if role variable is accessed here
      console.log(role);
      const payload = {
        email: dbemail,
        password: dbpassword,
        role,
      };
      console.log(payload);
      jwt.sign({ payload }, secretKey, (err, token) => {
        if (err) {
          // throw err;
          console.log(err);
          return res.json({
            success: false,
            message: "Some error occured please try again",
          });
        }
        console.log(token);

        res.cookie("accessToken", token, {
          expiresIn: "15min",
          httpOnly: true,
        });

        //if cookie is not workig the store token in the browser local storage
        // window.localStorage.setItem("token", token);
        console.log(token);
        return res.status(200).json({
          success: true,
          token: token,
          role: role,
        });
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    }
  });

  // console.log(result);
});

router.get("/adminDashboard", authenticate, (req, res) => {
  console.log("Hello");
  // double checking
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "Page can't be rendered! Login First",
    });
  } else {
    const adminData = req.user;
    console.log(adminData);
    return res.json({ success: true, adminData });
  }
});

module.exports = router;
