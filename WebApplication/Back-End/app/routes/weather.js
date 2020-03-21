const express = require('express');
const Router = express.Router();    //router object for express
const mysqlConnection = require("../agroDataConnection");

//get all weather details
Router.get("/weather", (req, res) => {
    mysqlConnection.query("SELECT * from weatherdata", (err, rows, fields) => {
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