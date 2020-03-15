const mysql = require('mysql');

//creating connection configuration
var mysqlConnection = mysql.createConnection({
    host : 'sql172.main-hosting.eu',
    user : 'u499244451_agrobackEnd',
    password : 'agrobackEnd',
    database : 'u499244451_agrobackEnd',
   // multipleStatements: true
});

//connect
mysqlConnection.connect((err) => {
    if(err){
        console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        throw err;
    }
    else{
        console.log('Database connection succeeded.');
    }
});

module.exports = mysqlConnection;