const express = require("express");
//router object for express
const router = express(); 
const mysqlConnection = require("../connection");

//get previous rainfall data
router.get("/trainingdata/precipitation", (req, res) => {
    mysqlConnection.query("SELECT date , rainFall AS value FROM weatherdata WHERE date > '2017-01-01'", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous temperature data
router.get("/trainingdata/temp", (req, res) => {
    mysqlConnection.query("SELECT date , avgTemp AS value FROM weatherdata", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous ashplantain data
router.get("/trainingdata/AshPlantain", (req, res) => {
    mysqlConnection.query("SELECT yearWithWeek AS date , AshPlantain AS value FROM marketprice", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous brinjal data
router.get("/trainingdata/Brinjal", (req, res) => {
    mysqlConnection.query("SELECT yearWithWeek AS date , Brinjal AS value FROM marketprice", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous cucumber data
router.get("/trainingdata/Cucumber", (req, res) => {
    mysqlConnection.query("SELECT yearWithWeek AS date , Cucumber AS value FROM marketprice", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous ladiesFinger data
router.get("/trainingdata/LadiesFinger", (req, res) => {
    mysqlConnection.query("SELECT yearWithWeek AS date , LadiesFinger AS value FROM marketprice", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// get previous redPumpkin data
router.get("/trainingdata/RedPumpkin", (req, res) => {
    mysqlConnection.query("SELECT yearWithWeek AS date , RedPumpkin AS value FROM marketprice", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;