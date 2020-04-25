const express = require("express");
// router object for express
const router = express();
// get database connection
const mysqlConnection = require("../connection");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// for POST-Support
// access inside request body
let bodyParser = require("body-parser");
let multer = require("multer");
let upload = multer();

//for being able to read request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((cli, res, next) => {
  res.setHeader("Allow", "*");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Date", Date());
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Allow-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//post sign up details
router.post("/users", async (req, res) => {
  try {
    const userpassword = req.body.password;
    const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
    let data = {
      user_Fname: req.body.name,
      user_Lname: req.body.lname,
      user_Dob: req.body.dob,
      user_NIC: req.body.nic,
      user_Email: req.body.email,
      user_Username: req.body.user,
      user_Password: hashedPassword,
      user_AddressNo: req.body.no,
      user_Street1: req.body.st1,
      user_Street2: req.body.st2,
      user_City: req.body.city,
      user_TelNo: req.body.telephoneNo,
      user_PhoneNo: req.body.phoneNo,
    };
    mysqlConnection.query("INSERT INTO user SET ?", data, (err) => {
      if (!err) {
        res.send(true);
      } else {
        console.error(err);
        res.send(err);
      }
    });
  } catch {
    res.status(500).send();
  }
});

// get all users details
router.get("/usersDetails", (req, res) => {
  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//update only user type
router.put("/users", async (req, res) => {
  mysqlConnection.query(
    "UPDATE user SET user_Type= ?  where user_Id= ?",
    [req.body.user_Type, req.body.user_Id],
    (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(err);
      }
    }
  );
});

// get selected user details
router.get("/users/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM user WHERE user_Id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// delete selected user details
router.delete("/usersDetails", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM user WHERE user_Id=?",
    [req.body.user_Id],
    (err, rows, fields) => {
      if (!err) {
        res.send("user deleted successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//rest api to update record into mysql database
router.put("/usersDetails", async (req, res) => {
  let data = {
    user_Type: req.body.userType,
    user_Fname: req.body.firstName,
    user_Lname: req.body.lastName,
    user_Username: req.body.userName,
    user_Email: req.body.email,
    user_NIC: req.body.nic,
    user_Dob: req.body.dob,
    user_Password: req.body.pass,
    user_AddressNo: req.body.address,
    user_Street1: req.body.str1,
    user_Street2: req.body.str2,
    user_City: req.body.city,
    user_PhoneNo: req.body.phone,
    user_TelNo: req.body.tele,
  };
  mysqlConnection.query(
    "UPDATE user SET user_Type= ?, user_Fname=?, user_Lname=?, user_Username=?, user_Email=?, user_NIC=?, user_Dob=?, user_Password=?, user_AddressNo=?, user_Street1=?, user_Street2=?, user_City=?, user_PhoneNo=?, user_TelNo=? where user_Id= ?",
    [data, req.body.userId],
    (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(err);
      }
    }
  );
});

// initialize express-session to allow us track the logged-in user across sessions.
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// check login credentials
router.post("/authentication", (request, response) => {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    mysqlConnection.query(
      "SELECT * FROM user WHERE user_Username = ? AND user_Password = ?",
      [username, password],
      async (error, results, fields) => {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            request.session.loggedin = true;
            request.session.username = username;
            response.send(true);
          } else {
            response.send(false);
          }
        }
        response.end();
      }
    );
  } else {
    response.send(false);
    response.end();
  }
});

//logout user
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Could not log out.");
    } else {
      res.send("Successfully logged out!");
    }
  });
});

module.exports = router;
