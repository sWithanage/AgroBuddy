<?php
//Database Connection Details.
$host = 'sql219.main-hosting.eu';
$user = 'u178617662_agroData';
$password = 'agroData';
$database = 'u178617662_agroData';

//Connect to the database using this query.
$connectionLink = new PDO("mysql:host=$host;dbname=$database", $user, $password);

//Create our SQL query.
$sql = "";

//Update sql query using get query as wanted.
$type =  $_GET['type'];
if($type=='rnn'){
    $sql = "SELECT `date` AS 'Date Time', `avgTemp` AS 'T (degC)', `minTemp`, `maxTemp`, `avgPres`, `minPres`, `maxPres`, `avgHumidity`, `minHumidity`, `maxHumidity`, `avgWindSpeed`, `minWindSpeed`, `maxWindSpeed`, `rainFall`, `cloudCover`, `mainWeather`, `weatherDescription` FROM `weatherdata` WHERE 1";           //Sql query that want to retrieve from the database.
    $fileName = 'weatherdataa.csv';
}else if($type=='ann'){
    $sql = "SELECT `avgTemp` as 'temp(c)' ,`avgPres` as 'pressure(mb)' ,`avgHumidity` as 'humidity()' , `cloudCover` as 'cloud cover()', `avgWindSpeed` as 'wind speed(mph)' ,`maxWindSpeed` as 'maxWindSpeed', `rainFall` as 'precip.(mm)' FROM `weatherdata` WHERE 1";
    $fileName = 'data1modify.csv';
}else if($type=='arima-model-temperature-dataset'){
    $sql = "SELECT `date` as 'date', `avgTemp` as 'temp' FROM `weatherdata` WHERE `date`>'2005-01-01'";
    $fileName = 'daily-minimum-temperatures.csv';
}else if($type=='arima-model-precipitation-dataset'){
    $sql = "SELECT `date` as 'date', `rainFall` as 'rainFall' FROM `weatherdata` WHERE `date`>'2017-01-01'";
    $fileName = 'daily-minimum-temperatures.csv';
}else if($type=='ash-plantain'){
    $sql = "SELECT `yearWithWeek`,`AshPlantain` FROM `marketprice` WHERE 1";
    $fileName = 'daily-minimum-temperatures.csv';
}else if($type=='time-Series'){
    $sql = "SELECT `yearWithWeek`,`AshPlantain` FROM `marketprice` WHERE 1";
    $fileName = 'daily-minimum-temperatures.csv';
}else if($type=='sarima'){
    $sql = "SELECT `date` as 'dt' , `avgTemp` as 'AverageTemperature' FROM `weatherdata` WHERE 1";
    $fileName = 'SarimaModel.csv';
}

//Prepare our SQL query.
$statement = $connectionLink->prepare($sql);

//Execute our SQL query.
$statement->execute();

//Fetch all of the rows from our MySQL table.
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

//Get the column names.
$columnNames = array();
if(!empty($rows)){
    $firstRow = $rows[0];
    foreach($firstRow as $colName => $val){
        $columnNames[] = $colName;
    }
}

//Set the Content-Type and Content-Disposition headers to force the download.
//With bellow commented files we can download the excel from the browser.
header('Content-Type: application/excel');
header('Content-Disposition: attachment; filename="' . $fileName . '"');

//Open up a file pointer & set file name.
//$fp = fopen($fileName , 'w');

//If We downloading this we have to use this.
$fp = fopen('php://output', 'w');

//Start off by writing the column names to the file.
fputcsv($fp, $columnNames);

//Then, loop through the rows and write them to the CSV file.
foreach ($rows as $row) {
    fputcsv($fp, $row);
}

//Close the file pointer.
fclose($fp);

?>