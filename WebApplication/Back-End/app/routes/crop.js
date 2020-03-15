const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../connection");

//get all plant details
Router.get("/crops", (req, res) => {
    mysqlConnection.query("SELECT * from crop", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get a crop
Router.get("/crops/:id", (req, res) => {
    mysqlConnection.query("SELECT * from crop WHERE crop_id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete a crop
Router.delete("/crops/:id", (req, res) => {
    mysqlConnection.query("DELETE FROM crop WHERE crop_id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Crop deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

//inserting a crop
Router.post("/crops", (req, res) => {
    var crop_id = req.body.crop_id;
    var crop_name = req.body.crop_name;
    var crop_image = req.body.crop_image;
    var crop_description = req.body.crop_description;

    mysqlConnection.query('INSERT INTO crop VALUES("+crop_id+","+crop_name+","+crop_image+","+crop_description+")' , (err, result) => {
        if(!err){
            res.send({"Crop":"inserted successfully"});
        }
        else{
            console.log(err);
        }
    });
});

module.exports = Router;