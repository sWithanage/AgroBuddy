const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../connection");

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

Router.delete("/admins/:id", (req, res) => {
    mysqlConnection.query("DELETE from admin WHERE admin_Id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Admin deleted successfully");
        }
        else{
            console.log(err);
        }
    })
});

module.exports = Router;