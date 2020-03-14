const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const users = require("./routes/user")

const app = express();

app.use("/user" , users);
//creating connection configuration
var db = mysql.createConnection({
    host : 'sql172.main-hosting.eu',
    user : 'u499244451_agrobackEnd',
    password : 'agrobackEnd',
    database : 'u499244451_agrobackEnd'
});

//connect
db.connect((err) => {
    if(err){
        console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        throw err;
    }
    else{
        console.log('Database connection succeeded.');
    }
});

//starting the server
const PORT = process.env.PORT || 5000;
app.listen(5000 , () => {
    console.log(`listening on port ${PORT}`)
});



