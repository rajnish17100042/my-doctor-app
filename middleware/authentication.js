const jwt = require("jsonwebtoken");
// requiring database connection
const db = require("../db/conn");
const getTableName = require("../validation/get_table_name");

const secretKey = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  let tableName = "";
  // console.log("inside authenticate function");

  try {
    //   get the access token from the cookie
    // console.log("inside try block of authenticate middleware");
    // console.log(req);
    const token = req.cookies.accessToken;
    // console.log(token);

    // let's verify the token and get the user details
    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);

    // //now check in the database if the user is present with the valid role
    let { email, password, role } = verifyToken.payload;

    tableName = getTableName(role);
    // console.log(tableName);

    const sql = `select * from ${tableName} where email=? and password=? `;
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        // throw err;
        // console.log(err);
        return res.json({
          success: false,
          message: "Something missing Please try again!",
        });
      }
      // console.log(result);

      if (!result.length) {
        // means authentication failed
        // console.log("inside condition checking for result length");
        return res.json({ success: false, message: "Something is missing" });
      }
      //if everything is fine then call next function which will do the registration process
      // console.log(req);
      req.user = result; //explicitly adding user property to req object ... so that we can use it in other get routes after authentication
      req.role = role;
      next();
    });
  } catch (err) {
    // console.log(err);
    return res.json({ success: false, message: "Something is missing" });
  }
};

// export the authenticate function so that wew can use it in other file also
module.exports = authenticate;
