const express = require("express");
// get database connection
const mysqlConnection = require("../connection");
// router object for express
const router = express.Router();

const cron = require("node-cron");
const axios = require("axios");

// schedule tasks to be run on the server
cron.schedule("30 23 * * Monday", async (req, res) => {
  // data retreive from api endpoints
  // save those data into DB

  try {
    // ar model for forecast
    const arTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=temp"
    );
    const arTemp = JSON.stringify(arTempForecast.data);

    const arRainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=rain"
    );
    const arRain = JSON.stringify(arRainForecast.data);

    const arAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=market&plant=AshPlantain"
    );
    const arAshPlantain = JSON.stringify(arAshPlantainForecast.data);

    const arBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=market&plant=Brinjal"
    );
    const arBrinjal = JSON.stringify(arBrinjalForecast.data);

    const arCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=market&plant=Cucumber"
    );
    const arCucumber = JSON.stringify(arCucumberForecast.data);

    const arladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=market&plant=LadiesFinger"
    );
    const arladiesFingers = JSON.stringify(arladiesFingersForecast.data);

    const arRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=ar&type=market&plant=RedPumpkin"
    );
    const arRedPumpkin = JSON.stringify(arRedPumpkinForecast.data);
    console.log("Get AR model forecast data");

    // auto_arima model forecast
    const autoarimaTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=temp"
    );
    const autoarimaTemp = JSON.stringify(autoarimaTempForecast.data);

    const autoarimaRaiFallForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=rain"
    );
    const autoarimaRaiFall = JSON.stringify(autoarimaRaiFallForecast.data);

    const autoarimaAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=market&plant=AshPlantain"
    );
    const autoarimaAshPlantain = JSON.stringify(
      autoarimaAshPlantainForecast.data
    );

    const autoarimaBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=market&plant=Brinjal"
    );
    const autoarimaBrinjal = JSON.stringify(autoarimaBrinjalForecast.data);

    const autoarimaCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=market&plant=Cucumber"
    );
    const autoarimaCucumber = JSON.stringify(autoarimaCucumberForecast.data);

    const autoarimaladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=market&plant=LadiesFinger"
    );
    const autoarimaladiesFingers = JSON.stringify(
      autoarimaladiesFingersForecast.data
    );

    const autoarimaRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=auto_arima&type=market&plant=RedPumpkin"
    );
    const autoarimaRedPumpkin = JSON.stringify(
      autoarimaRedPumpkinForecast.data
    );
    console.log("Get AUTOARIMA model forecast data");

    // arima model
    const arimaTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=temp"
    );
    const arimaTemp = JSON.stringify(arimaTempForecast.data);

    const arimaRainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=rain"
    );
    const arimaRain = JSON.stringify(arimaRainForecast.data);

    const arimaAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=market&plant=AshPlantain"
    );
    const arimaAshPlantain = JSON.stringify(arimaAshPlantainForecast.data);

    const arimaBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=market&plant=Brinjal"
    );
    const arimaBrinjal = JSON.stringify(arimaBrinjalForecast.data);

    const arimaCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=market&plant=Cucumber"
    );
    const arimaCucumber = JSON.stringify(arimaCucumberForecast.data);

    const arimaladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=market&plant=LadiesFinger"
    );
    const arimaladiesFingers = JSON.stringify(arimaladiesFingersForecast.data);

    const arimaRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arima&type=market&plant=RedPumpkin"
    );
    const arimaRedPumpkin = JSON.stringify(arimaRedPumpkinForecast.data);
    console.log("Get ARIMA model forecast data");

    // arma model for forecast
    const armaTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=temp"
    );
    const armaTemp = JSON.stringify(armaTempForecast.data);

    const armaRainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=rain "
    );
    const armaRain = JSON.stringify(armaRainForecast.data);

    const armaAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=market&plant=AshPlantain"
    );
    const armaAshPlantain = JSON.stringify(armaAshPlantainForecast.data);

    const armaBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=market&plant=Brinjal"
    );
    const armaBrinjal = JSON.stringify(armaBrinjalForecast.data);

    const armaCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=market&plant=Cucumber"
    );
    const armaCucumber = JSON.stringify(armaCucumberForecast.data);

    const armaladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=market&plant=LadiesFinger"
    );
    const armaladiesFingers = JSON.stringify(armaladiesFingersForecast.data);

    const armaRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=arma&type=market&plant=RedPumpkin"
    );
    const armaRedPumpkin = JSON.stringify(armaRedPumpkinForecast.data);
    console.log("Get ARMA model forecast data");

    // sarima model forecast
    const sarimaTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=temp"
    );
    const sarimaTemp = JSON.stringify(sarimaTempForecast.data);

    const sarimaRainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=rain"
    );
    const sarimaRain = JSON.stringify(sarimaRainForecast.data);

    const sarimaAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=market&plant=AshPlantain"
    );
    const sarimaAshPlantain = JSON.stringify(sarimaAshPlantainForecast.data);

    const sarimaBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=market&plant=Brinjal"
    );
    const sarimaBrinjal = JSON.stringify(sarimaBrinjalForecast.data);

    const sarimaCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=market&plant=Cucumber"
    );
    const sarimaCucumber = JSON.stringify(sarimaCucumberForecast.data);

    const sarimaladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=market&plant=LadiesFinger"
    );
    const sarimaladiesFingers = JSON.stringify(
      sarimaladiesFingersForecast.data
    );

    const sarimaRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=sarima&type=market&plant=RedPumpkin"
    );
    const sarimaRedPumpkin = JSON.stringify(sarimaRedPumpkinForecast.data);
    console.log("Get SARIMA model forecast data");

    // rnn model forecast
    const rnnTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=temp"
    );
    const rnnTemp = JSON.stringify(rnnTempForecast.data);

    const rnnRainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=rain"
    );
    const rnnRain = JSON.stringify(rnnRainForecast.data);

    const rnnAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=market&plant=AshPlantain"
    );
    const rnnAshPlantain = JSON.stringify(rnnAshPlantainForecast.data);

    const rnnBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=market&plant=Brinjal"
    );
    const rnnBrinjal = JSON.stringify(rnnBrinjalForecast.data);

    const rnnCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=market&plant=Cucumber"
    );
    const rnnCucumber = JSON.stringify(rnnCucumberForecast.data);

    const rnnladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=market&plant=LadiesFinger"
    );
    const rnnladiesFingers = JSON.stringify(rnnladiesFingersForecast.data);

    const rnnRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=rnn&type=market&plant=RedPumpkin"
    );
    const rnnRedPumpkin = JSON.stringify(rnnRedPumpkinForecast.data);
    console.log("Get RNN model forecast data");

    // var model forecast
    const varTempForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=temp"
    );
    const varTemp = JSON.stringify(varTempForecast.data);

    const varRainAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=rain"
    );
    const varRain = JSON.stringify(varRainAccuracy.data);

    const varAshPlantainForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=market&plant=AshPlantain"
    );
    const varAshPlantain = JSON.stringify(varAshPlantainForecast.data);

    const varBrinjalForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=market&plant=Brinjal"
    );
    const varBrinjal = JSON.stringify(varBrinjalForecast.data);

    const varCucumberForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=market&plant=Cucumber"
    );
    const varCucumber = JSON.stringify(varCucumberForecast.data);

    const varladiesFingersForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=market&plant=LadiesFinger"
    );
    const varladiesFingers = JSON.stringify(varladiesFingersForecast.data);

    const varRedPumpkinForecast = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/forecast?model=var&type=market&plant=RedPumpkin"
    );
    const varRedPumpkin = JSON.stringify(varRedPumpkinForecast.data);
    console.log("Get VAR model forecast data");

    // update data forecast table temperature row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE fID = 1",
      [
        arTemp,
        arimaTemp,
        armaTemp,
        sarimaTemp,
        rnnTemp,
        varTemp,
        autoarimaTemp,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast temperature row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table rainfall row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE fID = 2",
      [
        arRain,
        arimaRain,
        armaRain,
        sarimaRain,
        rnnRain,
        varRain,
        autoarimaRaiFall,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast rainfall row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table ashplantain market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE fID = 3",
      [
        arAshPlantain,
        arimaAshPlantain,
        armaAshPlantain,
        sarimaAshPlantain,
        rnnAshPlantain,
        varAshPlantain,
        autoarimaAshPlantain,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast ashplantain row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table brinjal market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE fID = 4",
      [
        arBrinjal,
        arimaBrinjal,
        armaBrinjal,
        sarimaBrinjal,
        rnnBrinjal,
        varBrinjal,
        autoarimaBrinjal,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast brinjal row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table cucumber market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE variables = 5",
      [
        arCucumber,
        arimaCucumber,
        armaCucumber,
        sarimaCucumber,
        rnnCucumber,
        varCucumber,
        autoarimaCucumber,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast cucumber row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table ladiesFingers market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE variables = 6",
      [
        arladiesFingers,
        arimaladiesFingers,
        armaladiesFingers,
        sarimaladiesFingers,
        rnnladiesFingers,
        varladiesFingers,
        autoarimaladiesFingers,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast ladies fingers row");
        } else {
          console.log(err);
        }
      }
    );

    // update data forecast table red pumpkin market price row
    mysqlConnection.query(
      "UPDATE forecast SET AR = ?, AUTOARIMA = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE variables = 7",
      [
        arRedPumpkin,
        arimaRedPumpkin,
        armaRedPumpkin,
        sarimaRedPumpkin,
        rnnRedPumpkin,
        varRedPumpkin,
        autoarimaRedPumpkin,
      ],
      (err) => {
        if (!err) {
          console.log("update forecast red pumpkin row");
        } else {
          console.log(err);
        }
      }
    );

    console.log("update forecast table");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task in every Monday night 11.30pm");
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
        let newResult = rows[0];
        newResult.AR = JSON.parse(newResult.AR);
        newResult.ARIMA = JSON.parse(newResult.ARIMA);
        newResult.ARMA = JSON.parse(newResult.ARMA);
        newResult.SARIMA = JSON.parse(newResult.SARIMA);
        newResult.RNN = JSON.parse(newResult.RNN);
        newResult.VAR = JSON.parse(newResult.VAR);
        newResult.AUTOARIMA = JSON.parse(newResult.AUTOARIMA);

        res.send(newResult);
      } else {
        console.log(err);
      }
    }
  );
});

// get selected variable AR model forecast from forecast table
router.get("/forecastAR/:variables", (req, res) => {
  mysqlConnection.query(
    "SELECT AR FROM forecast WHERE variables=?",
    [req.params.variables],
    (err, rows) => {
      if (!err) {
        let newResult = rows[0];
        newResult.AR = JSON.parse(newResult.AR);

        res.send(newResult);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
