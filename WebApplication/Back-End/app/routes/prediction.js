const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../agroDataConnection");

//get current market price prediction
Router.get("/prediction/marketprice", (req, res) => {
    mysqlConnection.query("SELECT * FROM `marketprice` ORDER BY date DESC limit 1", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get rainfall prediction
Router.get("/prediction/rainfall", (req, res) => {
    mysqlConnection.query("SELECT * from disease WHERE disease_id=?", [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get current weather details
Router.get("/prediction/weather", (req, res) => {
    mysqlConnection.query("SELECT * FROM `tempWeatherData` ORDER BY date DESC limit 1", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//get yesterday weather data
Router.get("/weatherdata", (req, res) => {
    //SELECT * FROM weatherdata WHERE DATE(date) = CURDATE()
    mysqlConnection.query("SELECT date ,avgPres,avgHumidity,avgWindSpeed,cloudCover,avgTemp,maxTemp,minTemp FROM weatherdata WHERE DATE(date) = SUBDATE(CURDATE(),1)",  (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});


module.exports = Router;