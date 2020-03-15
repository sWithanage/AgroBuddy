const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../connection");

//get all disease details
Router.get("/diseases", (req, res) => {
    mysqlConnection.query("SELECT * from disease", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get a disease
Router.get("/diseases/:id", (req, res) => {
    mysqlConnection.query("SELECT * from disease WHERE disease_id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete a disease
Router.delete("/diseases/:id", (req, res) => {
    mysqlConnection.query("DELETE FROM disease WHERE disease_id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Disease deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

//inserting a disease

module.exports = Router;