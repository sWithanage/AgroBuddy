const express = require("express");
// get database connection
const mysqlConnection = require("../connection");
// router object for express
const router = express.Router();

// get all users details
router.get("/accuracy", (req, res) => {
  mysqlConnection.query("SELECT * FROM accuracy", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// get selected variable accuracy
router.get("/accuracy/:variables", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM accuracy WHERE variables=?",
    [req.params.variables],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
