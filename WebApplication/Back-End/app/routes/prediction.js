const express = require("express");
const router = express.Router(); //router object for express
const mysqlConnection = require("../agroDataConnection");

//get current market price prediction
router.get("/prediction/marketprice", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM `marketprice` ORDER BY yearWithWeek DESC limit 5",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get ashplantain marketprice last 48 weeks
router.get("/marketprice/ashplantain", (req, res) => {
  mysqlConnection.query(
    "SELECT AshPlantain FROM marketprice ORDER BY yearWithWeek DESC limit 48",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// get brinjal marketprice last 48 weeks
router.get("/marketprice/brinjal", (req, res) => {
  mysqlConnection.query(
    "SELECT Brinjal FROM marketprice ORDER BY yearWithWeek DESC limit 48",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// get cucumber marketprice last 48 weeks
router.get("/marketprice/cucumber", (req, res) => {
  mysqlConnection.query(
    "SELECT Cucumber FROM marketprice ORDER BY yearWithWeek DESC limit 48",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// get ladies finger marketprice last 48 weeks
router.get("/marketprice/ladiesFinger", (req, res) => {
  mysqlConnection.query(
    "SELECT LadiesFinger FROM marketprice ORDER BY yearWithWeek DESC limit 48",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// get pumpkin marketprice last 48 weeks
router.get("/marketprice/redPumpkin", (req, res) => {
  mysqlConnection.query(
    "SELECT RedPumpkin FROM marketprice ORDER BY yearWithWeek DESC limit 48",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get rainfall details last 9 days
router.get("/prediction/rainfall", (req, res) => {
  mysqlConnection.query(
    "SELECT rainFall FROM weatherdata ORDER BY date DESC limit 9",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get temperature of last 30 days
router.get("/prediction/temperature", (req, res) => {
  mysqlConnection.query(
    "SELECT date,avgTemp FROM weatherdata ORDER BY date DESC limit 30",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get average temperature of last year
router.get("/prediction/avgrain", (req, res) => {
  mysqlConnection.query(
    "SELECT AVG(rainFall) AS avgRainfall FROM weatherdata ORDER BY date DESC limit 365",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get max temperature of last year
router.get("/prediction/maxrain", (req, res) => {
  mysqlConnection.query(
    "SELECT MAX(rainFall) AS maxRainfall FROM weatherdata ORDER BY date DESC limit 365",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get min temperature of last year
router.get("/prediction/minrain", (req, res) => {
  mysqlConnection.query(
    "SELECT MIN(rainFall) AS minRainfall FROM weatherdata ORDER BY date DESC limit 365",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get current weather details
router.get("/prediction/weather", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM `tempWeatherData` ORDER BY date DESC limit 1",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get yesterday weather data
router.get("/weatherdata", (req, res) => {
  //SELECT * FROM weatherdata WHERE DATE(date) = CURDATE()
  mysqlConnection.query(
    "SELECT date ,avgPres,avgHumidity,avgWindSpeed,cloudCover,avgTemp,maxTemp,minTemp FROM weatherdata WHERE DATE(date) = SUBDATE(CURDATE(),1)",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
