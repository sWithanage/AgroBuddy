const mysql = require("mysql");

var db_config = {
  host: "sql219.main-hosting.eu",
  user: "u178617662_agrobackEnd",
  password: "agrobackEnd",
  database: "u178617662_agrobackEnd",
};

var connection;

// recreate the connection, since the old one cannot be reused.
function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    // the server is either down or restarting
    if (err) {
      console.log("error when connecting to db:", err);
      // introduce a delay before attempting to reconnect
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("database connection succeeded.");
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // connection to the MySQL server is usually lost due to either server restart
      handleDisconnect();
    } else {
      // connection idle timeout
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;

//creating connection configuration
// var mysqlConnection = mysql.createConnection({
//     host : 'sql219.main-hosting.eu',
//     user : 'u178617662_agrobackEnd',
//     password : 'agrobackEnd',
//     database : 'u178617662_agrobackEnd',
//    // multipleStatements: true
// });

// //connect
// mysqlConnection.connect((err) => {
//     if(err){
//         console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//         //setTimeout(mysqlConnection, 2000);
//         throw err;
//     }
//     else{
//         console.log('Database connection succeeded.');
//     }
// });

// module.exports = mysqlConnection;
