const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

// const cron = require("node-cron");
// const axios = require("axios");

//const mysqlConnection = require("./connection");
const PORT = 8080;

const users = require("./routes/user");
const contact = require("./routes/contact");
const crops = require("./routes/crop");
const diseases = require("./routes/disease");
const predictions = require("./routes/prediction");
const accuracy = require("./routes/accuracy");
const forecast = require("./routes/forecast");
const buyer = require("./routes/buyer");
const app = express();
// enable CORS with various options
app.use(cors());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

app.use(users);
app.use(contact);
app.use(crops);
app.use(diseases);
app.use(predictions);
app.use(accuracy);
app.use(forecast);
app.use(buyer);

// get best crop
app.get("/bestcrop", async (req, res) => {
  try {
    const bestcrop = await axios.get(
      "https://agrobuddytk.an.r.appspot.com/bestPlant"
    );
    res.send({
      bestcrop: bestcrop.data,
    });
  } catch (error) {
    console.log(error);
  }
});

//starting the server
app.listen(PORT, () => {
  console.log("App has started on Port: " + PORT);
});
