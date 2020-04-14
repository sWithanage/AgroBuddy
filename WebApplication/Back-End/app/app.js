const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const cron = require("node-cron");
const mysqlConnection = require("./connection");
const axios = require("axios");

//const mysqlConnection = require("./connection");
const PORT = 8080;

const users = require("./routes/user");
const admins = require("./routes/admin");
const crops = require("./routes/crop");
const diseases = require("./routes/disease");
const predictions = require("./routes/prediction");
const accuracy = require("./routes/accuracy");

const app = express();

app.use(users);
app.use(admins);
app.use(crops);
app.use(diseases);
app.use(predictions);
app.use(accuracy);

// schedule tasks to be run on the server
cron.schedule("* 12 * * *", async (req, res) => {
  // data retreive from api endpoints 
  // save those data into DB
  try {
    // arima model accuracy
    const arimaTempAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=temp"
    );
    const arimaRaiFallAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=rainfall"
    );
    const arimaMarketPriceAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=market"
    );

    // arma model accuracy
    const armaTempAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arma&type=temp"
    );
    const armaRaiFallAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arma&type=rainfall"
    );
    const armaMarketPriceAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arma&type=market"
    );

    // sarima model accracy
    const sarimaTempAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=sarima&type=temp"
    );
    const sarimaRaiFallAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=sarima&type=rainfall"
    );
    const sarimaMarketPriceAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=sarima&type=market"
    );

    // update data accuracy table temperature row
    mysqlConnection.query(
      "UPDATE accuracy SET ARIMA = ?, ARMA = ?, SARIMA=? WHERE variables = temperature",
      [
        arimaTempAccuracy.data,
        armaTempAccuracy.data,
        sarimaTempAccuracy.data
      ],
      () => {}
    );

    // update data accuracy table rainfall row
    mysqlConnection.query(
      "UPDATE accuracy SET ARIMA = ?, ARMA = ?, SARIMA=? WHERE variables = rainfall",
      [
        arimaRaiFallAccuracy.data,
        armaRaiFallAccuracy.data,
        sarimaRaiFallAccuracy.data
      ],
      () => {}
    );

    // update data accuracy table marketprice row
    mysqlConnection.query(
      "UPDATE accuracy SET ARIMA = ?, ARMA = ?, SARIMA=? WHERE variables = marketprice",
      [
        arimaMarketPriceAccuracy.data,
        armaMarketPriceAccuracy.data,
        sarimaMarketPriceAccuracy.data
      ],
      () => {}
    );

    console.log("update accuracy");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task in every day 12pm");
});

//starting the server
app.listen(PORT, () => {
  console.log("App has started on Port: " + PORT);
});
