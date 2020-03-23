const mysql = require('mysql');

//creating connection configuration
var mysqlConnection = mysql.createConnection({
    host : 'sql219.main-hosting.eu',
    user : 'u178617662_agrobackEnd',
    password : 'agrobackEnd',
    database : 'u178617662_agrobackEnd',
   // multipleStatements: true
});

//connect
mysqlConnection.connect((err) => {
    if(err){
        console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        //setTimeout(mysqlConnection, 2000);
        throw err;
    }
    else{
        console.log('Database connection succeeded.');
    }
});

module.exports = mysqlConnection;