const express = require("express");
// router object for express
const router = express();
// get database connection
const mysqlConnection = require("../connection");


// For POST-Support
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((cli, res, next) => {
  res.setHeader('Allow', "*")
  res.setHeader('Connection', "keep-alive")
  res.setHeader("Date", Date())
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Allow-Control-Allow-Methods', "*")
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
//post login details
router.post('/authentication', function (req, res) {
  console.log(req.body.name)
  res.send(true)
})
//post sign up details
router.post('/users', function (req, res) {
  console.log(req.body.name)
  res.send(true)
})

// get all users details
router.get("/usersDetails",  async function (req, res) {
  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
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

// POST method route
router.post('/sasa', function (req, res) {

  console.log(req.body.name)
})


// insert an user details

// router.post("/users", (req, res) => {
//   let data ={
//    user_Type : req.body.user_Type,
//    user_Fname : req.body.user_Fname,
//    user_Lname : req.body.user_Lname,
//    user_UserName : req.body.user_UserName,
//    user_NIC : req.body.user_NIC,
//    user_Dob : req.body.user_Dob,
//    user_Password : req.body.user_Password,
//    user_AddressNo : req.body.user_AddressNo,
//    user_Street1 : req.body.user_Street1,
//    user_Street2 : req.body.user_Street2,
//    user_City : req.body.user_City,
//    user_PhoneNo : req.body.user_PhoneNo,
//    user_TelNo : req.body.user_TelNo
//   };

//   let sql = "INSERT INTO user SET ?";
//   let query = mysqlConnection.query(sql, data,(err, rows) => {
//       if (!err) {
//         res.send("User Table Update Successfully");
//         res.send(rows)
//       } else {
//         console.log(err);
//       }
//     }
//   )
// });

// router.post("/users", function(req, res) {
//   var user = req.body;
//   mysqlConnection.query("INSERT INTO user SET ?", user, function(err, rows) {
//     if (err) {
//       console.error(err);
//       return res.send(err);
//     } else {
//       res.send(rows);
//       return res.send("user details added successfully!");
//     }
//   });
// });
// update user details
// router.post("/user/update", (req, res) => {
//   const userId = req.body.id;
//   let sql =
//     "update user SET name='" +
//     req.body.name +
//     "',  email='" +
//     req.body.email +
//     "',  phone_no='" +
//     req.body.phone_no +
//     "' where id =" +
//     userId;
//   let query = mysqlConnection.query(sql, (err, rows) => {
//     if (!err) {
//       res.send("user details update successfully");
//     } else {
//       console.error(err);
//       return res.send(err);
//     }
//   });
// });


module.exports = router;
