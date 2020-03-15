const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
//const mysqlConnection = require("./connection");
const PORT = 5000;

const users = require("./routes/user");
const admins = require("./routes/admin");
const crops = require("./routes/crop");
const diseases = require("./routes/disease");

const app = express();

app.use("/user",users);
app.use(admins);
app.use(crops);
app.use(diseases);

//starting the server
app.listen(PORT , () => {
    console.log("App has started on Port: "+PORT)
});

