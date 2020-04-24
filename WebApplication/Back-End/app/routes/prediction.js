const express = require("express");
const router = express.Router(); //router object for express
const mysqlConnection = require("../agroDataConnection");
const nodemailer = require("nodemailer");

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
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//get temperature last 9 days
router.get("/prediction/temperature", (req, res) => {
  mysqlConnection.query(
    "SELECT avgTemp FROM weatherdata ORDER BY date DESC limit 9",
    [req.params.id],
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

Router.post("/sendmail", (req, res) =>{
    console.log("request came");
    let user = req.body;
    main(user).catch(console.error);
});

// async..await is not allowed in global scope, must use a wrapper
async function main(user) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
            user: "admin@agrobuddy.tk", // generated ethereal user
            pass: "awsnb18865" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "admin@agrobuddy.tk", // sender address
        to: user.uemail, // list of receivers
        subject: "Re: Receiving the inquiry.", // Subject line
        html: "Hi "+user.uname+", we have received your inquiry.Thank you for contacting us.</br>" +
            "<p>Message Details: </p></br>" + "<p>Name: "+user.uname +"</p></br>"+ "<p>Email: "+user.uemail +"</p></br>"+ "<p>Message: "+user.umessage+"</p>"
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

module.exports = router;
