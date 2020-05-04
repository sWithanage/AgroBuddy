const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = 8080;

// routing of all js file in the routes folder
const users = require("./routes/user");
const contact = require("./routes/contact");
const crops = require("./routes/crop");
const diseases = require("./routes/disease");
const predictions = require("./routes/prediction");
const accuracy = require("./routes/accuracy");
const forecast = require("./routes/forecast");
const buyer = require("./routes/buyer");
const agrodata = require("./routes/agrodata");

const app = express();
// enable CORS with various options
app.use(cors());

app.use(users);
app.use(contact);
app.use(crops);
app.use(diseases);
app.use(predictions);
app.use(accuracy);
app.use(forecast);
app.use(buyer);
app.use(agrodata);

// get best crop
app.get("/bestcrop", async (req, res) => {
  try {
    const bestcrop = await axios.get(
      "https://agrobuddy-models.an.r.appspot.com/bestPlant"
    );
    res.send({
      bestcrop: bestcrop.data,
    });
  } catch (error) {
    console.log(error);
  }
});

// get log page details
app.get("/log", async (req, res) => {
  try {
    const logdata = await axios.get(
      "https://agrobuddy-models.an.r.appspot.com/log/json"
    );
    res.send({
      logdata: logdata.data,
    });
  } catch (error) {
    console.log(error);
  }
});

// client enter location and date pass to datascience project
app.post("/details", async (req, res) => {
  try {
    const location = await axios.get(req.body.location);
    const date = await axios.get(req.body.date);
    res.send({
      location: location.data,
      date: date.data,
    });
  } catch (error) {
    console.log(error);
  }
});

//starting the server
app.listen(PORT, () => {
  console.log("App has started on Port: " + PORT);
});