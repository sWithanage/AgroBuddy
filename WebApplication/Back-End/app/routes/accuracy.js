const express = require("express");
// get database connection
const mysqlConnection = require("../connection");
// router object for express
const router = express.Router();

const cron = require("node-cron");
const axios = require("axios");

// schedule tasks to be run on the server
cron.schedule("30 12 * * *", async (req, res) => {
  // data retreive from api endpoints
  // save those data into DB
  try {
    // ar model accuracy
    const arTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=temp"
    );
    const arRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=rain "
    );
    const arAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=AshPlantain"
    );
    const arBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=Brinjal"
    );
    const arCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=Cucumber"
    );
    const arladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=LadiesFinger"
    );
    const arRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=RedPumpkin"
    );

    // arima model accuracy
    const arimaTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=temp"
    );
    const arimaRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=rain"
    );
    const arimaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=market&plant=AshPlantain"
    );
    const arimaBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=market&plant=Brinjal"
    );
    const arimaCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=market&plant=Cucumber"
    );
    const arimaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=market&plant=LadiesFinger"
    );
    const arimaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arima&type=market&plant=RedPumpkin"
    );

    // arma model accuracy
    const armaTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=temp"
    );
    const armaRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=rain"
    );
    const armaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=market&plant=AshPlantain"
    );
    const armaBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=market&plant=Brinjal"
    );
    const armaCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=market&plant=Cucumber"
    );
    const armaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=market&plant=LadiesFinger"
    );
    const armaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=arma&type=market&plant=RedPumpkin"
    );

    // sarima model accracy
    const sarimaTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=temp"
    );
    const sarimaRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=rain"
    );
    const sarimaAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=market&plant=AshPlantain"
    );
    const sarimaBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=market&plant=Brinjal"
    );
    const sarimaCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=market&plant=Cucumber"
    );
    const sarimaladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=market&plant=LadiesFinger"
    );
    const sarimaRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=sarima&type=market&plant=RedPumpkin"
    );

    // rnn model accracy
    const rnnTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=rnn&type=temp"
    );
    const rnnRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=rnn&type=rain"
    );
    const rnnAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=AshPlantain"
    );
    const rnnBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=Brinjal"
    );
    const rnnCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=Cucumber"
    );
    const rnnladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=LadiesFinger"
    );
    const rnnRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=ar&type=market&plant=RedPumpkin"
    );

    // var model accracy
    const varTempAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=temp"
    );
    const varRaiFallAccuracy = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=rain"
    );
    const varAshPlantain = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=market&plant=AshPlantain	"
    );
    const varBrinjal = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=market&plant=Brinjal"
    );
    const varCucumber = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=market&plant=Cucumber"
    );
    const varladiesFingers = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=market&plant=LadiesFinger"
    );
    const varRedPumpkin = await axios.get(
      "http://127.0.0.1:8080/accuracy?model=var&type=market&plant=RedPumpkin"
    );

    // update data accuracy table temperature row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = temperature",
      [
        arTempAccuracy.data,
        arimaTempAccuracy.data,
        armaTempAccuracy.data,
        sarimaTempAccuracy.data,
        rnnTempAccuracy.data,
        varTempAccuracy.data,
      ],
      () => {}
    );

    // update data accuracy table rainfall row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = rainfall",
      [
        arRaiFallAccuracy.data,
        arimaRaiFallAccuracy.data,
        armaRaiFallAccuracy.data,
        sarimaRaiFallAccuracy.data,
        rnnRaiFallAccuracy.data,
        varRaiFallAccuracy.data,
      ],
      () => {}
    );

    // update data accuracy table ashplantain market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = ashPlantainMPrice",
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

    // update data accuracy table brinjal market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = brinjalMPrice",
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

    // update data accuracy table cucumber market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=? WHERE variables = cucumberMPrice",
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

    console.log("update accuracy");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task in every day 12.30pm");
});

// get all users details
router.get("/accuracy", (req, res) => {
  mysqlConnection.query("SELECT * FROM accuracy", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// get selected variable accuracy
router.get("/accuracy/:variables", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM accuracy WHERE variables=?",
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

// update active model
router.put("/accuracy/:variables", (req, res) => {
  mysqlConnection.query(
    "UPDATE accuracy SET activeModel=? WHERE variables=?",
    [req.body.status, req.params.variables],
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
