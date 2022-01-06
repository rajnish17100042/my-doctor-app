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

// create route for  registration for admins,doctors and patients
router.post("/registration/:role", authenticate, (req, res) => {
  const roleFromFrontend = req.params.role;
  req.roleFromFrontend = req.params.role;
  // console.log(req.role);//role we get from the cookies
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "do not have the right permission",
    });
  } else {
    // calling function for input validation
    const isInputValidated = validateInput(req);

    // console.log(isInputValidated);
    if (!isInputValidated) {
      res.json({ success: false, message: "Please fill the data properly" });
    } else {
      //proceed forward after the  input validation
      // first based on the role get table name
      const tableName = getTableName(roleFromFrontend);
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
            return res.json({
              success: false,
              message: "user is already registered",
            });
          } else {
            // password hashing using bcrypt
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              if (err) {
                // throw err;
                return res.json({
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
                  return res.json({
                    success: false,
                    message: "Some error occured please registered again",
                  });
                }
                // console.log(result);

                return res.json({
                  success: true,
                  message: "User registedred Successfully",
                });
              });
            });
          }
        }
      );
    }
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
  // console.log(data);

  // server side validation
  if (!email || !password || !role) {
    return res.json({
      success: false,
      message: "please fill the data properly",
    });
  }
  // now based on the role choose the table for student,teacher or admin
  tableName = getTableName(role);
  // console.log(tableName);

  //  first  search the user in the database with the help of email and take only email and password, will need later to generate payload for jwt and passowrd verification
  const sql = `select email,password from ${tableName} where email=?`;
  db.query(sql, email, async (err, result) => {
    // if user is not found then the result will be an empty array
    // console.log(result);
    if (err) {
      //  throw err;
      // console.log(err);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    }
    if (!result.length) {
      // console.log(result.length);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    } else if (result.length) {
      dbpassword = result[0].password;
      dbemail = result[0].email;
    }

    // console.log("User found checking password");
    try {
      // use the password retrieved from the database in the above query
      // console.log(dbpassword);
      // now compare the password using bcrypt  ...password===dbpassword
      const passwordMatch = await bcrypt.compare(password, dbpassword); //returns true or false
      // console.log(passwordMatch);
      if (!passwordMatch) {
        // console.log("invalid credentials");
        return res.json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // if every thing is fine then genetate a  token for the user ...jwt authentication and store it in the cookie for access the protected routed

      // checking if role variable is accessed here
      // console.log(role);
      const payload = {
        email: dbemail,
        password: dbpassword,
        role,
      };
      // console.log(payload);
      jwt.sign({ payload }, secretKey, (err, token) => {
        if (err) {
          // throw err;
          // console.log(err);
          return res.json({
            success: false,
            message: "Some error occured please try again",
          });
        }
        // console.log(token);

        res.cookie("accessToken", token, {
          expiresIn: "15min",
          httpOnly: true,
        });

        //if cookie is not workig the store token in the browser local storage
        // window.localStorage.setItem("token", token);
        // console.log(token);
        return res.status(200).json({
          success: true,
          token: token,
          role: role,
        });
      });
    } catch (err) {
      // console.log(err);
      return res.json({
        success: false,
        message: "Some error occured please try again",
      });
    }
  });

  // console.log(result);
});

//check if the user is already logged in
router.get("/checkAlreadyLogin", authenticate, (req, res) => {
  if (req.role !== "admin" && req.role !== "doctor" && req.role !== "patient") {
    return res.json({ success: false, message: "Fill the details to log in" });
  } else {
    return res.json({ success: true, role: req.role });
  }
});

// route for admin dashboard
router.get("/adminDashboard", authenticate, (req, res) => {
  // console.log("Hello");
  // double checking
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "Page can't be rendered! Login First",
    });
  } else {
    const adminData = req.user;
    // console.log(adminData[0]);
    return res.json({ success: true, adminData: adminData[0] });
  }
});

// route to get data for doctor dashboard
router.get("/doctorDashboard", authenticate, (req, res) => {
  // console.log("Hello");
  // double checking
  if (req.role !== "doctor") {
    return res.json({
      success: false,
      message: "Page can't be rendered! Login First",
    });
  } else {
    const doctorData = req.user;
    // console.log(doctorData[0]);
    return res.json({ success: true, doctorData: doctorData[0] });
  }
});

// route to get data for patient dashboard
router.get("/patientDashboard", authenticate, (req, res) => {
  // console.log("Hello");
  // double checking
  if (req.role !== "patient") {
    return res.json({
      success: false,
      message: "Page can't be rendered! Login First",
    });
  } else {
    const patientData = req.user;
    // console.log(patientData[0]);
    return res.json({ success: true, patientData: patientData[0] });
  }
});
//route to get appointment details for doctor
router.get("/appointmentDetails", authenticate, (req, res) => {
  // only allow  doctor to access this data
  if (req.role !== "doctor") {
    return res.json({
      success: false,
      message: "you do not have the proper permission",
    });
  } else if (req.role === "doctor") {
    // console.log("current role and user is ");
    // console.log(req.role);
    // console.log(req.user[0], req.user[0].name);
    const tableName = "patient_registration";
    const sql = `select * from ${tableName} where doctor=? and visited=? and rejected=? order by appointment_date desc `;
    db.query(sql, [req.user[0].name, 0, 0], (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (!result) {
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (result) {
        // console.log(result);
        return res.json({
          success: true,
          results: result,
        });
      }
    });
  }
});

//route to store appointment request data
router.post("/bookAppointment", (req, res) => {
  // console.log(req.body);
  req.roleFromFrontend = "patient";

  // calling function for input validation
  const isInputValidated = validateInput(req);

  // console.log(isInputValidated);
  if (!isInputValidated) {
    res.json({ success: false, message: "Please fill the data properly" });
  } else {
    //proceed forward after the  input validation

    const tableName = "appointment_request";
    // console.log(tableName);

    // before request check if user  already has made a request
    db.query(
      `select email from ${tableName} where email=?`,
      req.body.email,
      (err, result) => {
        if (err) {
          // throw err;
          return res.json({
            success: false,
            message: "Some error occured please registered again",
          });
        }
        // console.log(result, result.length);
        if (result.length > 0) {
          // console.log("helo hello hello");
          return res.json({
            success: false,
            message: "Appointment request already sent",
          });
        } else {
          // password hashing using bcrypt
          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
              // throw err;
              return res.json({
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
                return res.json({
                  success: false,
                  message: "Some error occured please registered again",
                });
              }
              // console.log(result);

              return res.json({
                success: true,
                message: "Appointment request is successful",
              });
            });
          });
        }
      }
    );
  }
});

//route to get the appointment request to display on admin dashboard
router.get("/appointmentRequests", authenticate, (req, res) => {
  // only allow  admin to access this data
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "you do not have the proper permission",
    });
  } else if (req.role === "admin") {
    // console.log("current role and user is ");
    // console.log(req.role);
    // console.log(req.user[0], req.user[0].name);
    const tableName = "appointment_request";
    const sql = `select * from ${tableName} order by appointment_date asc `;
    db.query(sql, (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (!result) {
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (result) {
        // console.log(result);
        return res.json({
          success: true,
          results: result,
        });
      }
    });
  }
});

//route to handle the appointment request  ...will be done by admin only
router.patch(
  "/handleAppointmentRequest/:status/:id",
  authenticate,
  (req, res) => {
    console.log(req.params);
    const { status, id } = req.params;

    //allow only admin to access this route
    if (req.role !== "admin") {
      return res.json({
        success: false,
        message: "Sorry! You do not have the proper perrmission",
      });
    } else if (req.role === "admin") {
      //based on the status make changes to the database
      if (status === "reject") {
        const tableName = "appointment_request";
        //delete the entry from the appointment_request table
        const sql = `DELETE FROM ${tableName} WHERE id=?`;
        db.query(sql, id, (err, result) => {
          if (err || !result) {
            return res.json({
              success: false,
              message: "Opps!! Something went wrong",
            });
          } else if (result) {
            return res.json({
              success: true,
              message: "Appointment Request Rejected Successfully",
            });
          }
        });
      } else if (status === "approve") {
        //first get the data from the appointment_request table and check in the patient_registration if user is already present ... if not then add
        // const tableName = "appointment_request";
        // const sql = `SELECT * FROM ${tableName} WHERE id=?`;
        return res.json({
          success: false,
          message: "Work in Progress",
        });
      }
    }
  }
);

//route to update the status of appointment marked by the Doctor
router.patch(
  "/updateAppointmentStatus/:status/:id",
  authenticate,
  (req, res) => {
    //get the status from sent in the request parameter
    const { status, id } = req.params;
    // console.log(status, id);
    let statusFlag = {
      appointment: 0,
      visited: 0,
      rejected: 0,
    };

    //allow only doctor to access this feature
    if (req.role !== "doctor" && req.role !== "patient") {
      return res.json({
        success: false,
        message: "you do not have the proper permission!!",
      });
    } else if (req.role === "doctor" || req.role === "patient") {
      //check the status and accordingly change the status flag
      // console.log("status is : " + status);
      if (status === "confirmed") {
        statusFlag.appointment = 1;
      } else if (status === "visited") {
        statusFlag.rejected = 0;
        statusFlag.appointment = 1;
        statusFlag.visited = 1;
      } else if (status === "rejected") {
        statusFlag.rejected = 1;
        statusFlag.appointment = 0;
        statusFlag.visited = 0;
      } else if (status === "book_again" || status === "withdraw") {
        statusFlag.rejected = 0;
        statusFlag.appointment = 0;
        statusFlag.visited = 0;
      } else {
        return res.json({
          success: false,
          message: "Some error occured !!",
        });
      }

      const tableName = "patient_registration";
      const sql = `update ${tableName} set ? where id=?`;
      db.query(sql, [statusFlag, id], (err, result) => {
        if (err) {
          // console.log(err);
          return res.json({
            success: false,
            message: "Some error occured !!",
          });
        } else if (!result) {
          return res.json({
            success: false,
            message: "Some error occured !!",
          });
        } else if (result) {
          // console.log(result);
          return res.json({
            success: true,
            message: "Appointment Status Updated Successfully !!",
          });
        }
      });
    }
  }
);

//route to get all the patients who visited to the Doctor
router.get("/visitedPatients", authenticate, (req, res) => {
  // only allow  doctor to access this data
  if (req.role !== "doctor") {
    return res.json({
      success: false,
      message: "you do not have the proper permission",
    });
  } else if (req.role === "doctor") {
    // console.log("current role and user is ");
    // console.log(req.role);
    // console.log(req.user[0], req.user[0].name);
    const tableName = "patient_registration";
    const sql = `select * from ${tableName} where doctor=? and visited=? order by appointment_date desc `;
    db.query(sql, [req.user[0].name, 1], (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (!result) {
        return res.json({
          success: false,
          message: "some error occured!!",
        });
      } else if (result) {
        // console.log(result);
        return res.json({
          success: true,
          results: result,
        });
      }
    });
  }
});
// route to protect the registration page done by the admin
router.get("/registrationRoute", authenticate, (req, res) => {
  // console.log("Hello");
  // double checking
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "Page can't be rendered! Login First",
    });
  } else {
    return res.json({ success: true, message: "rendering the page" });
  }
});

// get all the registration details of admin,doctor and patient
router.get("/registrationDetails", authenticate, (req, res) => {
  var results = []; //global variable
  // console.log(req.role);
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "Do not have proper permission",
    });
  } else {
    // get all patients
    const sql1 =
      "select id,name,email,phone,symptoms,doctor from patient_registration";
    db.query(sql1, (err, result1) => {
      if (err) {
        //  throw err
        return res.json({ success: false, message: "Error occured" });
      } else {
        // console.log(result1);
        results.push(result1);
        // console.log(results);
        // return res.status(200).json({ result });
      }
    });

    // get all doctor
    const sql2 =
      "select id,name,email,phone,specialisation,experience from doctor_registration";
    db.query(sql2, (err, result2) => {
      if (err) {
        //  throw err
        return res.json({ success: false, message: "Error occured" });
      } else {
        // console.log(result2);
        results.push(result2);
        // console.log(results);
        // return res.status(200).json({ result });
      }
    });

    // get all admins
    const sql3 = "select id,name,email,phone from admin_registration";
    db.query(sql3, (err, result3) => {
      if (err) {
        //  throw err
        return res.json({ success: false, message: "Error occured" });
      } else {
        // console.log(result3);
        results.push(result3);
        // console.log(results);
        // return res.status(200).json({ results });
      }
      // console.log(results);

      // send all the results to the client
      return res.json({ success: true, results });
    });
  }
});

//route to get list of all Doctors
router.get("/getDoctorsList", (req, res) => {
  const tableName = "doctor_registration";
  const sql = `select name,email from ${tableName}`;
  db.query(sql, (err, result) => {
    if (err) {
      // console.log(err);
      return res.json({
        success: false,
        message: "Opps!! something went wrong",
      });
    } else if (!result) {
      return res.json({
        success: false,
        message: "Opps!! something went wrong",
      });
    } else if (result) {
      // console.log(result);
      return res.json({ success: true, doctorsList: result });
    }
  });
});

//route to get the details doctor, patient, admin to display on th eupdation page
router.get(
  "/updationDetails/:id/:roleFromFrontend",
  authenticate,
  (req, res) => {
    // console.log(req.role);
    const id = req.params.id;
    const roleFromFrontend = req.params.roleFromFrontend;
    // console.log(req.role, id);
    let tableName;

    // give access only to patients,doctors and admins to get the details for the updation
    if (
      req.role !== "admin" &&
      req.role !== "doctor" &&
      req.role !== "patient"
    ) {
      return res.json({
        success: false,
        message: "don't have the proper access",
      });
    } else {
      // get the table name based on the data whether the update is for admin,doctor or patient
      tableName = getTableName(roleFromFrontend);
      const sql = `select * from ${tableName} where id=?`;
      db.query(sql, id, (err, result) => {
        if (err || !result.length) {
          // console.log(err);
          return res.json({
            success: false,
            message: "some error occured",
          });
        } else if (result.length) {
          // console.log(result[0]);
          return res.json({ success: true, result: result[0] });
        }
      });
    }
  }
);

//route to update the general details excluding password of patients, doctors and admins
router.patch(
  "/updateRegistrationDetails/:roleFromFrontend/:id",
  authenticate,
  (req, res) => {
    //  console.log(req.body, req.params, req.role);
    const id = req.params.id;
    const roleFromFrontend = req.params.roleFromFrontend;

    // console.log(req.body);
    //first based on the token stored in the cookie check the role only patient, doctor and admin roles are allowed
    if (
      req.role !== "admin" &&
      req.role !== "doctor" &&
      req.role !== "patient"
    ) {
      return res.json({
        success: false,
        message: "you do not have permission!!",
      });
    } else {
      // server side validation
      req.roleFromFrontend = roleFromFrontend;
      // calling function for input validation
      const isInputValidated = validateInput(req);
      if (!isInputValidated) {
        res.json({ success: false, message: "Please fill the data properly" });
      } else {
        //proceed forward after the  input validation
        //  delete password and registered_at property from req.body object
        delete req.body.password;
        delete req.body.registered_at;
        // first based on the role get table name
        const tableName = getTableName(roleFromFrontend);
        // console.log(tableName);
        const sql = `update ${tableName} set ? where id=?`;
        db.query(sql, [req.body, id], (err, result) => {
          if (err) {
            // console.log(err);
            return res.json({
              success: false,
              message: "some error occured!!",
            });
          } else if (!result) {
            return res.json({
              success: false,
              message: "some error occured!!",
            });
          } else {
            return res.json({
              success: true,
              message: "details updated successfully!!",
            });
          }
        });
      }
    }
  }
);

//route to update password of patients , doctors and admins
router.patch(
  "/updatePassword/:roleFromFrontend/:id",
  authenticate,
  async (req, res) => {
    const data = req.body;
    const { roleFromFrontend, id } = req.params;
    const tableName = getTableName(roleFromFrontend);

    // console.log(data);
    const { currentPassword, newPassword } = data;
    try {
      // first check if the password saved in the database matches with the current password
      const sql = `select password from ${tableName} where id=${id}`;
      db.query(sql, async (err, result) => {
        if (err) {
          // throw err
          return res.json({ success: false, message: "Some Error Occured!" });
        } else {
          // console.log(result);
          const dbpassword = result[0].password;
          // console.log(dbpassword);
          // now compare the current password and the password stored in database
          const passwordMatch = await bcrypt.compare(
            currentPassword,
            dbpassword
          );
          // console.log(passwordMatch);
          if (!passwordMatch) {
            return res.json({ success: false, message: "Some Error Occured!" });
          } else {
            // update the password
            // first password hashing  is done
            const hash = await bcrypt.hash(newPassword, saltRounds);
            // console.log(hash);
            if (!hash) {
              return res.json({
                success: false,
                message: "Some Error Occured!",
              });
            } else {
              // store hash in database with proper id matching
              const sql = `update ${tableName} set password=? where id=${id}`;
              db.query(sql, hash, (err, result) => {
                if (err) {
                  // throw err
                  return res.json({
                    success: false,
                    message: "Some Error Occured!",
                  });
                } else if (!result) {
                  return res.json({
                    success: false,
                    message: "Some Error Occured!",
                  });
                } else {
                  return res.json({
                    success: true,
                    message: "Password Updated Successfully!!",
                  });
                }
              });
            }
          }
        }
      });
    } catch (err) {
      // throw err
      return res.status(400).json({ error: "Some Error Occured!" });
    }
  }
);

//route to delete user
router.delete("/deleteUser/:roleFromFrontend/:id", authenticate, (req, res) => {
  // get the role and id sent from the front-end
  const { roleFromFrontend, id } = req.params;
  // get the current role who is logged in
  // console.log(req.role);
  // delete feature is only available for admin
  if (req.role !== "admin") {
    return res.json({
      success: false,
      message: "you do not have the proper permission",
    });
  } else if (req.role === "admin") {
    // get the table name
    let tableName = getTableName(roleFromFrontend);
    // console.log("TableNAme is:");
    // console.log(tableName);
    const sql = `delete from ${tableName} where id=?`;
    db.query(sql, id, (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({
          success: false,
          message: "Some error occured!!",
        });
      } else if (!result) {
        return res.json({
          success: false,
          message: "Some error occured!!",
        });
      } else if (result) {
        // console.log(result);
        return res.json({
          success: true,
          message: "User Successfully Deleted !!",
        });
      }
    });
  }
});
//route for Logout
router.get("/logout", authenticate, (req, res) => {
  // console.log("reaching to logout route");
  res.clearCookie("accessToken");
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
