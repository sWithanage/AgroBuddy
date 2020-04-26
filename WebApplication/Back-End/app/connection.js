const mysql = require("mysql");

//creating connection configuration
var db_config = {
  host: "104.197.107.230",
  user: "agrobuddybackendawsnb18865",
  password: "*#e7GWr:rA/+__^<sL",
  database: "agroBuddyBackend",
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


