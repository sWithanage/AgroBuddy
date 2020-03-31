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
  // data retreive from api endpoints 3
  // save those data into DB
  try {
    const arimaTempAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=temp"
    );
    const arimaRaiFallAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=rainfall"
    );
    const arimaMarketPriceAccuracy = await axios.get(
      "https://agrobuddy-prediction.appspot.com/accuracy?model=arima&type=market"
    );

    mysqlConnection.query(
      "UPDATE marketprice_prediction SET model_accuracy = ? WHERE model_id = 1",
      [arimaMarketPriceAccuracy.data],
      () => {}
    );

    mysqlConnection.query(
      "UPDATE temperature_prediction SET model_accuracy = ? WHERE model_id = 1",
      [arimaTempAccuracy.data],
      () => {}
    );

    mysqlConnection.query(
      "UPDATE rainfall_prediction SET model_accuracy = ? WHERE model_id = 1",
      [arimaRaiFallAccuracy.data],
      () => {}
    );
    console.log("update accuracy");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task every minute");
});

//starting the server
app.listen(PORT, () => {
  console.log("App has started on Port: " + PORT);
});
