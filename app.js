// include express module in our app
const express = require("express");
const path = require("path");
// new create the express server
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// dotenv.config({ path: "./config.env" });
// require("./db/conn");
const port = process.env.PORT || 5000;

//adding middleware so that the application can understand the json data recieved at the endpoint(/register)
app.use(express.json());

//adding middleware for the cookie parser to use the cookies

app.use(cookieParser());

// use cors to send the data from one port to other
//no need to use cors if proxy is used in the frontend
app.use(cors());

//using middleware to use the route we created

// app.use(require("./router/routes"));

// app.get("/", (req, res) => {
//   res.send("Hello From the Home side");
// });

// app.get("/login", (req, res) => {
//   res.send("Hello from the login side");
// });
//for production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/dist/client"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "dist", "client", "index.html")
    );
  });
}
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running at the port ${port}`);
});
