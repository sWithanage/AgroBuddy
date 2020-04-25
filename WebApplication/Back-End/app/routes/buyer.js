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

//inserting a crop
router.post("/buyers", async (req, res) => {
    let data = {
        buyerId: req.body.buyerId,
        buyerName: req.body.buyerName,
        buyerAddress: req.body.buyerAddress,
        buyerContactNumber: req.body.ContactNumber
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
router.put("/buyers/:id", async (req, res) => {
    let data = {
        buyerId: req.body.buyerId,
        buyerName: req.body.buyerName,
        buyerAddress: req.body.buyerAddress,
        buyerContactNumber: req.body.ContactNumber
    };
    mysqlConnection.query(
        "UPDATE buyers SET crop_id?, crop_name= ?, crop_image=?, crop_description=?, scientific_name=?, nutrition=?, cultivated_area=?, duration=?, temperature=?, cultivated_area_percentage=? where crop_Id= ?",
        [data, req.params.id],
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