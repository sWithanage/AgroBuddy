const express = require('express');
const router = express();
const mysqlConnection = require("../connection");

//get all buyer 
router.get("/buyers", (req, res) => {
    mysqlConnection.query("SELECT * from buyers", 
    (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get a selected buyer details
router.get("/buyers/:id", (req, res) => {
    mysqlConnection.query("SELECT * from buyers WHERE buyerId=?", 
    [req.params.id], 
    (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete a buyer
router.delete("/buyers", async (req, res) => {
    mysqlConnection.query("DELETE FROM buyers WHERE buyerId=?", 
    [req.body.cropId], 
    (err, rows, fields) => {
        if(!err){
            res.send("Crop deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

//inserting a buyer
router.post("/buyers", async (req, res) => {
    let data = {
        buyerName: req.body.buyer_Name,
        buyerAddress: req.body.buyer_Address,
        buyerContactNumber: req.body.buyer_ContactNumber
    };
    mysqlConnection.query("INSERT INTO buyers SET ?", 
    data, 
    (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        console.error(err);
        res.send(err);
      }
    });
});

//update crop details
router.put("/buyers", async (req, res) => {
    mysqlConnection.query(
        "UPDATE buyers SET buyerName='" + req.body.buyerName + "', " +
        "buyerAddress='"+req.body.buyerAddress+"'," +
        "buyerContactNumber='"+req.body.buyerContactNumber+"'" +
        "WHERE buyerId= '"+req.body.buyerId+"'",
        (err, rows) => {
          if (!err) {
            res.send(true);
          } else {
            res.send(err);
          }
        }
    );
});

module.exports = router;