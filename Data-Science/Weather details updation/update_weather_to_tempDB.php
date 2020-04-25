<?php
    //Getting sql connection.
    include 'connection.php';
    date_default_timezone_set("Asia/Colombo");
    
    // Retrieving data the json file
    $url = 'http://api.openweathermap.org/data/2.5/weather?q=Monaragala,lk&APPID=491d4fcdcd84f7323338f5d11ebc4629';
    $json = file_get_contents($url);
    $json_data = json_decode($json, true);

    // Rainfall calculations.
    $rainFall = 0;
    $rainFall = $json_data['rain']['1h'];

    // Temperature Calculations.
    $tempInC = ( $json_data['main']['temp'] - 273.15);   


    // Adding data into the temporary table.
    $sql = "INSERT INTO `tempWeatherData`(`date`, `temp`, `pressure`, `humidity`, `wind_speed`, `rain_1h`, `clouds_all`, `weather_main`, `weather_description`) VALUES 
    ('".date("Y-m-d h:i:sa")."','".$tempInC."','". $json_data['main']['pressure'] ."','". $json_data['main']['humidity'] ."','". $json_data['wind']['speed'] ."','". $rainFall ."','".$json_data['clouds']['all']."','".$json_data['weather'][0]['main']."','".$json_data['weather'][0]['description']."')";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
?>