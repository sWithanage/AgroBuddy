const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
//const mysqlConnection = require("./connection");
const PORT = 5000;

const users = require("./routes/user");
const admins = require("./routes/admin");

const app = express();

app.use("/user",users);
app.use(admins);

//starting the server
app.listen(PORT , () => {
    console.log("App has started on Port: "+PORT)
});

