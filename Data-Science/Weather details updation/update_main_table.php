<?php
    //Getting sql connection.
    include 'connection.php';
    date_default_timezone_set("Asia/Colombo");

    $sql = "SELECT 'date',`temp`, `pressure`, `humidity`, `wind_speed`, `rain_1h`, `clouds_all`, `weather_main`, `weather_description` FROM `tempWeatherData` WHERE 1";
    $result = $conn->query($sql);

    $temp = 0;
    $date = "";
    $pressure = 0;
    $humidity = 0;
    $wind_speed = 0;
    $rain_1h = 0;
    $clouds_all = 0;
    $weather_main = array();
    $weather_description = array();

    $avgTemp = 0;
    $minTemp = 100000;
    $maxTemp = 0;
    $avgPres = 0;
    $minPres = 1000000;
    $maxPres = 0;
    $avgHumidity = 0;
    $minHumidity = 1000000;
    $maxHumidity = 0;
    $avgWindSpeed = 0;
    $minWindSpeed = 1000000;
    $maxWindSpeed = 0;
    $rainFall = 0;
    $cloudCover = 0;
    $mainWeather = "";
    $weatherDescription = "";

    $totalTemp = 0;
    $totalPressure = 0;
    $totalHumidity = 0;
    $totalWind_speed  = 0;
    $totalRain_1h = 0;
    $totalClouds_all = 0;

    $totalRows=0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

            $temp = $row["temp"];
            $pressure = $row["pressure"];
            $humidity = $row["humidity"];
            $wind_speed = $row["wind_speed"];
            $rain_1h = $row["rain_1h"];
            $clouds_all = $row["clouds_all"];


            
            $totalTemp += $row["temp"];
            $totalPressure += $row["pressure"];
            $totalHumidity += $row["humidity"];
            $totalWind_speed += $row["wind_speed"];
            $totalRain_1h += $row["rain_1h"];
            $totalClouds_all += $row["clouds_all"];

        
            
            array_push($weather_main,$row["weather_main"]);
            array_push($weather_description,$row["weather_description"]);
            $totalRows++;

            if($minTemp > $temp){
                $minTemp = $temp;
            }

            if($maxTemp < $temp){
                $maxTemp = $temp;
            }

            if($minPres > $pressure){
                $minPres = $pressure;
            }

            if($maxPres < $pressure){
                $maxPres = $pressure;
            }

            if($minHumidity > $humidity){
                $minHumidity = $humidity;
            }

            if($maxHumidity < $humidity){
                $maxHumidity = $humidity;
            }

            if($minWindSpeed > $wind_speed){
                $minWindSpeed = $wind_speed;
            }

            if($maxWindSpeed < $wind_speed){
                $maxWindSpeed = $wind_speed;
            }

        }



        $rainFall = $totalRain_1h;
        $avgTemp = $totalTemp / $totalRows;
        $avgPres = $totalPressure / $totalRows;
        $avgHumidity = $totalHumidity / $totalRows;
        $avgWindSpeed = $totalWind_speed / $totalRows;
        $cloudCover = $totalClouds_all / $totalRows;


        // new array containing frequency of values of $arr 
        $arr_freq = array_count_values($weather_main);     
        
        // arranging the new $arr_freq in decreasing order  
        // of occurrences 
        arsort($arr_freq); 
        
        // $new_arr containing the keys of sorted array 
        $weatherMain = array_keys($arr_freq); 

        

        // new array containing frequency of values of $arr 
        $arr_freq1 = array_count_values($weather_description);     
        
        // arranging the new $arr_freq in decreasing order  
        // of occurrences 
        arsort($arr_freq1); 
        
        // $new_arr containing the keys of sorted array 
        $weatherDescription = array_keys($arr_freq1); 


        $sql = "INSERT INTO `weatherdata`(`date`, `avgTemp`, `minTemp`, `maxTemp`, `avgPres`, `minPres`, `maxPres`, `avgHumidity`, `minHumidity`, `maxHumidity`, `avgWindSpeed`, `minWindSpeed`, `maxWindSpeed`, `rainFall`, `cloudCover`, `mainWeather`, `weatherDescription`) VALUES ('".date("Y-m-d")."','".round($avgTemp,2)."','".round($minTemp,2)."','".round($maxTemp,2)."','".round($avgPres,2)."','".round($minPres,2)."','".round($maxPres,2)."','".round($avgHumidity,2)."','".round($minHumidity,2)."','".round($maxHumidity,2)."','".round($avgWindSpeed,2)."','".round($maxWindSpeed,2)."','".round($minWindSpeed,2)."','".round($rainFall,2)."','".round($cloudCover,2)."','".$weatherMain[0]."','".$weatherDescription[0]."')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";

            // sql to delete a record
            $sql = "DELETE FROM `tempWeatherData` WHERE 1";

            if ($conn->query($sql) === TRUE) {

                ini_set('max_execution_time', 300);

                $token = "1036993918:AAHc0_GGwtL-N_NFKvHmQNUUwCvrTa370ac";
                $phoneNumber ='703976962';
                // panchi : 723858619  
                // Sasa : 703976962  
                
                //Hello message.
                $greerting ="weather Update Done.";
                $greertingM1 = [
                    'text' => $greerting,
                    'chat_id' => $phoneNumber
                ];
                
                file_get_contents("https://api.telegram.org/bot$token/sendMessage?".http_build_query($greertingM1));

            } else {
                echo "Error deleting record: " . $conn->error;
            }

        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    } else {
        echo "0 results";
    }

?>