<?php
// Connecting to the database with credentials.
$servername = "sql219.main-hosting.eu";
$tempAllHolder = "u178617662_agroData";
$username = $tempAllHolder;
$password = "agroData";
$dbname = $tempAllHolder;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>