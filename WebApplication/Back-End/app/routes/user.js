const express = require("express");
// router object for express
const router = express();
// get database connection
const mysqlConnection = require("../connection");

// for POST-Support
let bodyParser = require("body-parser");
let multer = require("multer");
let upload = multer();

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
  let data = {
    user_Fname: req.body.name,
    user_Lname: req.body.lname,
    user_Dob: req.body.dob,
    user_NIC: req.body.nic,
    user_Email: req.body.email,
    user_Username: req.body.user,
    user_Password: req.body.password,
    user_AddressNo: req.body.no,
    user_Street1: req.body.st1,
    user_Street2: req.body.st2,
    user_City: req.body.city,
    user_TelNo: req.body.telephoneNo,
    user_PhoneNo: req.body.phoneNo,
  };
  mysqlConnection.query("INSERT INTO user SET ?", data, (err, rows) => {
    if (!err) {
      res.send(true);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

//post login details
router.post("/authentication", function (req, res) {
  console.log(req.body.name);
  res.send(true);
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
        console.error(err);
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
router.delete("/users/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM user WHERE user_Id=?",
    [req.params.id],
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

// router.put("/update/user", function(req, res) {
//   connection.query(
//     "UPDATE user SET user_Fname=?, user_Lname=?, user_Email=? where user_Id=?",
//     [
//       req.body.user_Fname,
//       req.body.user_Lname,
//       req.body.user_Email,
//       req.body.user_Id
//     ],
//     function(error, results, fields) {
//       if (error) throw error;
//       res.end(JSON.stringify(results));
//     }
//   );
// });

module.exports = router;
