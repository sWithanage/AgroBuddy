const express = require("express");
const axios = require("axios");

const Router = express.Router();

//get all weather details
Router.get("/arima_accuracy", async (req, res) => {
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

    res.send({
      arima: {
        temp: arimaTempAccuracy.data,
        rain: arimaRaiFallAccuracy.data,
        market: arimaMarketPriceAccuracy.data
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;