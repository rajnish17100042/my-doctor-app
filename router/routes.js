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

// create route for Admin registration
router.post("/admin/adminRegistration", (req, res) => {
  // console.log(req.user);
  // console.log(req.role);
  const adminData = req.body;
  // console.log(adminData);
  if (false) {
    return res.status(400).json({ success: false, error: "Error! Try agiain" });
  } else {
    // destructuring the data
    let {
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      joining_date,
      password,
    } = req.body;

    //   server side validation
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !joining_date ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the data properly" });
    }

    // before registration check if admin already present
    db.query(
      "select email from admin_registration where email=?",
      email,
      (err, result) => {
        if (err) {
          // throw err;
          return res.status(400).json({
            success: false,
            message: "Some error occured please register again",
          });
        }
        //   console.log(result, result.length);
        if (result.length > 0) {
          // console.log("helo hello hello");
          return res.status(400).json("Admin is already registered");
        } else {
          // password hashing using bcrypt
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              // throw err;
              return res.status(400).json({
                success: false,
                message: "Some error occured please register again",
              });
            }
            password = hash;
            // console.log(password);
            let sql = "insert into admin_registration set ?";
            let data = {
              name,
              email,
              phone,
              address,
              city,
              state,
              pincode,
              joining_date,
              password,
            };

            // insert the data to database
            db.query(sql, data, (err, result) => {
              if (err) {
                //   throw err;
                return res.status(400).json({
                  success: false,
                  message: "Some error occured please register again",
                });
              }
              //   console.log(result);
              // send email
              //   passwordMailer(email, name);
              return res.status(200).json({
                success: true,
                message: "Admin registedred Successfully",
              });
            });
          });
        }
      }
    );
  }
});

module.exports = router;
