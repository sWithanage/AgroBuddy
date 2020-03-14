const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

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
    }
    else{
        console.log('Database connection succeeded.');
    }
});

//starting the server
app.listen('3000', () => {
    console.log('Server starting on port 3000');
});