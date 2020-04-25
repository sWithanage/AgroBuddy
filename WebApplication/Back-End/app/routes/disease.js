const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../connection");

//get all diseases of a crop
Router.get("/diseases/:cid", (req, res) => {
    mysqlConnection.query("SELECT * from disease WHERE crop_id=?", [req.params.cid], 
    (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

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
Router.get("/disease/:id", (req, res) => {
    mysqlConnection.query("SELECT * from disease WHERE disease_id=?", 
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
Router.post("/diseases", async (req, res) => {
    let data = {
    crop_id: req.body.id,
    disease_name: req.body.name,
    disease_image: req.body.image,
    disease_Scientific_name: req.body.scientific_name,
    disease_symptoms: req.body.symptoms
    };
    mysqlConnection.query("INSERT INTO disease SET ?", data, (err, rows) => {
      if (!err) {
        res.send(true);
      } else {
        console.error(err);
        res.send(err);
      }
    });
  });

//update disease details
Router.put("/diseases/:id", async (req, res) => {
    let data = {
        crop_id: req.body.id,
        disease_name: req.body.name,
        disease_image: req.body.image,
        disease_Scientific_name: req.body.scientific_name,
        disease_symptoms: req.body.symptoms
    };
    mysqlConnection.query(
        "UPDATE disease SET crop_id= ?, disease_name=?, disease_image=?,disease_Scientific_name, disease_symptoms=? where disease_id= ?",
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

module.exports = Router;