const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../connection");

//get all admins
Router.get("/admins", (req, res) => {
    mysqlConnection.query("SELECT * from admin", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get an admin
Router.get("/admins/:id", (req, res) => {
    mysqlConnection.query("SELECT * from admin WHERE admin_Id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete an admin
Router.delete("/admins/:id", (req, res) => {
    mysqlConnection.query("DELETE FROM admin WHERE admin_Id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Admin deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

//insert an admin
Router.delete("/admins", (req, res) => {
    mysqlConnection.query("INSERT INTO admin", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Admin deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

module.exports = Router;