const mysql = require('mysql');

//creating connection configuration
var connection = mysql.createConnection({
    host : 'sql219.main-hosting.eu',
    user : 'u178617662_agroData',
    password : 'agroData',
    database : 'u178617662_agroData',
   // multipleStatements: true
});

//connect
connection.connect((err) => {
    if(err){
        console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        //setTimeout(connection, 2000);
        throw err;
    }
    else{
        console.log('Weather database connection succeeded.');
    }
});

module.exports = connection;
