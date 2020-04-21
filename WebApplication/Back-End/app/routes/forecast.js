const express = require("express");
// get database connection
const mysqlConnection = require("../connection");
// router object for express
const router = express.Router();

const cron = require("node-cron");
const axios = require("axios");

// schedule tasks to be run on the server
cron.schedule("59 23 * * *", async (req, res) => {
  // data retreive from api endpoints
  // save those data into DB
  try {
    // ar model for forecast
    const arTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=temp"
    );
    const arRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=rain"
    );
    const arAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=AshPlantain"
    );
    const arBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=Brinjal"
    );
    const arCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=Cucumber"
    );
    const arladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=LadiesFinger"
    );
    const arRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=RedPumpkin"
    );

    // arima model
    const arimaTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=temp"
    );
    const arimaRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=rain"
    );
    const arimaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=market&plant=AshPlantain"
    );
    const arimaBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=market&plant=Brinjal"
    );
    const arimaCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=market&plant=Cucumber"
    );
    const arimaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=market&plant=LadiesFinger"
    );
    const arimaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arima&type=market&plant=RedPumpkin"
    );

    // arma model for forecast
    const armaTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=temp"
    );
    const armaRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=rain"
    );
    const armaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=market&plant=AshPlantain"
    );
    const armaBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=market&plant=Brinjal"
    );
    const armaCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=market&plant=Cucumber"
    );
    const armaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=market&plant=LadiesFinger"
    );
    const armaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=arma&type=market&plant=RedPumpkin"
    );

    // sarima model forecast
    const sarimaTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=temp"
    );
    const sarimaRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=rain"
    );
    const sarimaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=market&plant=AshPlantain"
    );
    const sarimaBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=market&plant=Brinjal"
    );
    const sarimaCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=market&plant=Cucumber"
    );
    const sarimaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=market&plant=LadiesFinger"
    );
    const sarimaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=sarima&type=market&plant=RedPumpkin"
    );

    // rnn model forecast
    const rnnTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=rnn&type=temp"
    );
    const rnnRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=rnn&type=rain"
    );
    const rnnAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=AshPlantain"
    );
    const rnnBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=Brinjal"
    );
    const rnnCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=Cucumber"
    );
    const rnnladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=LadiesFinger"
    );
    const rnnRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=ar&type=market&plant=RedPumpkin"
    );

    // var model forecast
    const varTemp = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=temp"
    );
    const varRaiFall = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=rain"
    );
    const varAshPlantain = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=market&plant=AshPlantain"
    );
    const varBrinjal = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=market&plant=Brinjal"
    );
    const varCucumber = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=market&plant=Cucumber"
    );
    const varladiesFingers = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=market&plant=LadiesFinger"
    );
    const varRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/forecast?model=var&type=market&plant=RedPumpkin"
    );

    // update data forecast table temperature row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = temperature",
      [
        arTemp.data,
        arimaTemp.data,
        armaTemp.data,
        sarimaTemp.data,
        rnnTemp.data,
        varTemp.data,
      ],
      () => {}
    );

    // update data forecast table rainfall row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = rainfall",
      [
        arRaiFall.data,
        arimaRaiFall.data,
        armaRaiFall.data,
        sarimaRaiFall.data,
        rnnRaiFall.data,
        varRaiFall.data,
      ],
      () => {}
    );

    // update data forecast table ashplantain market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = ashPlantainMPrice",
      [
        arAshPlantain.data,
        arimaAshPlantain.data,
        armaAshPlantain.data,
        sarimaAshPlantain.data,
        rnnAshPlantain.data,
        varAshPlantain.data,
      ],
      () => {}
    );

    // update data forecast table brinjal market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = brinjalMPrice",
      [
        arBrinjal.data,
        arimaBrinjal.data,
        armaBrinjal.data,
        sarimaBrinjal.data,
        rnnBrinjal.data,
        varBrinjal.data,
      ],
      () => {}
    );

    // update data forecast table cucumber market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = cucumberMPrice",
      [
        arCucumber.data,
        arimaCucumber.data,
        armaCucumber.data,
        sarimaCucumber.data,
        rnnCucumber.data,
        varCucumber.data,
      ],
      () => {}
    );

    // update data forecast table brinjal market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = ladiesFingersMPrice",
      [
        arladiesFingers.data,
        arimaladiesFingers.data,
        armaladiesFingers.data,
        sarimaladiesFingers.data,
        rnnladiesFingers.data,
        varladiesFingers.data,
      ],
      () => {}
    );

    // update data forecast table brinjal market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = redPumpkinMPrice",
      [
        arRedPumpkin.data,
        arimaRedPumpkin.data,
        armaRedPumpkin.data,
        sarimaRedPumpkin.data,
        rnnRedPumpkin.data,
        varRedPumpkin.data,
      ],
      () => {}
    );

    console.log("update forecast");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task in every day night 11.59pm");
});

// get all forecast details
router.get("/forecast", (req, res) => {
  mysqlConnection.query("SELECT * FROM forecast", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// get selected variable forecast
router.get("/forecast/:variables", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM forecast WHERE variables=?",
    [req.params.variables],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
