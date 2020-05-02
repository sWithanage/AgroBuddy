const express = require("express");
// get database connection
const mysqlConnection = require("../connection");
// router object for express
const router = express();

const cron = require("node-cron");
const axios = require("axios");

// schedule tasks to be run on the server
cron.schedule("30 21 * * Monday", async (req, res) => {
  // data retreive from api endpoints
  // save those data into DB
  try {
    // ar model accuracy
    const arTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=temp"
    );

    const arRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=rain"
    );

    const arAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=market&plant=AshPlantain"
    );

    const arBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=market&plant=Brinjal"
    );

    const arCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=market&plant=Cucumber"
    );

    const arladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=market&plant=LadiesFinger"
    );

    const arRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=ar&type=market&plant=RedPumpkin"
    );
    console.log("Get AR model accuracy data");

    // auto_arima model accuracy
    const autoarimaTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=temp"
    );

    const autoarimaRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=rain"
    );

    const autoarimaAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=market&plant=AshPlantain"
    );

    const autoarimaBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=market&plant=Brinjal"
    );

    const autoarimaCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=market&plant=Cucumber"
    );

    const autoarimaladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=market&plant=LadiesFinger"
    );

    const autoarimaRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=auto_arima&type=market&plant=RedPumpkin"
    );
    console.log("Get AUTO ARIMA model accuracy data");

    // arima model accuracy
    const arimaTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=temp"
    );

    const arimaRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=rain"
    );

    const arimaAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=market&plant=AshPlantain"
    );

    const arimaBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=market&plant=Brinjal"
    );

    const arimaCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=market&plant=Cucumber"
    );

    const arimaladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=market&plant=LadiesFinger"
    );

    const arimaRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arima&type=market&plant=RedPumpkin"
    );
    console.log("Get ARIMA model accuracy data");

    // arma model accuracy
    const armaTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=temp"
    );

    const armaRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=rain "
    );

    const armaAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=market&plant=AshPlantain"
    );

    const armaBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=market&plant=Brinjal"
    );

    const armaCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=market&plant=Cucumber"
    );

    const armaladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=market&plant=LadiesFinger"
    );

    const armaRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=arma&type=market&plant=RedPumpkin"
    );
    console.log("Get ARMA model accuracy data");

    // sarima model accracy
    const sarimaTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=temp"
    );

    const sarimaRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=rain"
    );

    const sarimaAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=market&plant=AshPlantain"
    );

    const sarimaBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=market&plant=Brinjal"
    );

    const sarimaCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=market&plant=Cucumber"
    );

    const sarimaladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=market&plant=LadiesFinger"
    );

    const sarimaRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=sarima&type=market&plant=RedPumpkin"
    );
    console.log("Get SARIMA model accuracy data");

    // rnn model accracy
    const rnnTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=temp"
    );

    const rnnRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=rain"
    );

    const rnnAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=market&plant=AshPlantain"
    );

    const rnnBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=market&plant=Brinjal"
    );

    const rnnCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=market&plant=Cucumber"
    );

    const rnnladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=market&plant=LadiesFinger"
    );

    const rnnRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=rnn&type=market&plant=RedPumpkin"
    );
    console.log("Get RNN model accuracy data");

    // var model accracy
    const varTempAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=temp"
    );

    const varRaiFallAccuracy = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=rain"
    );

    const varAshPlantain = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=market&plant=AshPlantain"
    );

    const varBrinjal = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=market&plant=Brinjal"
    );

    const varCucumber = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=market&plant=Cucumber"
    );

    const varladiesFingers = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=market&plant=LadiesFinger"
    );

    const varRedPumpkin = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/accuracy?model=var&type=market&plant=RedPumpkin"
    );
    console.log("Get VAR model accuracy data");

    // update data accuracy table temperature row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 1",
      [
        arTempAccuracy.data,
        arimaTempAccuracy.data,
        armaTempAccuracy.data,
        sarimaTempAccuracy.data,
        rnnTempAccuracy.data,
        varTempAccuracy.data,
        autoarimaTempAccuracy.data,
      ],
      () => {}
    );

    // update data accuracy table rainfall row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 2",
      [
        arRaiFallAccuracy.data,
        arimaRaiFallAccuracy.data,
        armaRaiFallAccuracy.data,
        sarimaRaiFallAccuracy.data,
        rnnRaiFallAccuracy.data,
        varRaiFallAccuracy.data,
        autoarimaRaiFallAccuracy.data,
      ],
      () => {}
    );

    // update data accuracy table ashplantain market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 3",
      [
        arAshPlantain.data,
        arimaAshPlantain.data,
        armaAshPlantain.data,
        sarimaAshPlantain.data,
        rnnAshPlantain.data,
        varAshPlantain.data,
        autoarimaAshPlantain.data,
      ],
      () => {}
    );

    // update data accuracy table brinjal market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 4",
      [
        arBrinjal.data,
        arimaBrinjal.data,
        armaBrinjal.data,
        sarimaBrinjal.data,
        rnnBrinjal.data,
        varBrinjal.data,
        autoarimaBrinjal.data,
      ],
      () => {}
    );

    // update data accuracy table cucumber market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 5",
      [
        arCucumber.data,
        arimaCucumber.data,
        armaCucumber.data,
        sarimaCucumber.data,
        rnnCucumber.data,
        varCucumber.data,
        autoarimaCucumber.data,
      ],
      () => {}
    );
    // update data accuracy table brinjal market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 6",
      [
        arladiesFingers.data,
        arimaladiesFingers.data,
        armaladiesFingers.data,
        sarimaladiesFingers.data,
        rnnladiesFingers.data,
        varladiesFingers.data,
        autoarimaladiesFingers.data,
      ],
      () => {}
    );

    // update data accuracy table brinjal market price row
    mysqlConnection.query(
      "UPDATE accuracy SET AR = ?, ARIMA = ?, ARMA = ?, SARIMA=?, RNN=?, VAR=?, AUTOARIMA=? WHERE aID = 7",
      [
        arRedPumpkin.data,
        arimaRedPumpkin.data,
        armaRedPumpkin.data,
        sarimaRedPumpkin.data,
        rnnRedPumpkin.data,
        varRedPumpkin.data,
        autoarimaRedPumpkin.data,
      ],
      () => {}
    );

    console.log("update accuracy");
  } catch (error) {
    console.log(error);
  }
  console.log("running a task in every Monday night 10.30pm");
});

// get all accuracy details
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
router.put("/accuracy", (req, res) => {
  mysqlConnection.query(
    "UPDATE accuracy SET activeModel=? WHERE variables=?",
    [req.body.status, req.body.variables],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );

  mysqlConnection.query(
    "UPDATE forecast SET model=? WHERE variables=?",
    [req.body.status, req.body.variables],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// update ratio value in accuracy table
router.put("/ratioUpdate", (req, res) => {
  mysqlConnection.query(
    "UPDATE accuracy SET ratio=? WHERE variables=?",
    [req.body.selectedratio, req.body.variables],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  )
});

// get ratio each model
router.get("/ratio", (req, res) => {
  mysqlConnection.query("SELECT variables,ratio from accuracy",
      (err, rows, fields) => {
          if(!err){
              res.send(rows);
          }
          else{
              console.log(err);
          }
      })
});

module.exports = router;
