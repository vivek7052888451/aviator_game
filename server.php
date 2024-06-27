<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "aviator_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Send timer value to client
$timerValue = getTimerValue($conn);

if($timerValue){

    $val =  $timerValue-1;
   echo updateTimerValue($conn,$val);
}else{
    if(updateTable($conn,10) == true){
        
         echo "Game Start";
    }
   
}


// Get timer value from the database
function getTimerValue($conn) {
    $sql = "SELECT value FROM timer";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['value'];
    } else {
       return false;
    }
}

// Update timer value in the database
function updateTimerValue($conn, $timerValue) {
    if($timerValue >= 0){
            $sql = "UPDATE timer SET value = $timerValue";
        if ($conn->query($sql) === TRUE) {
            return $timerValue;
        } else {
            return false;
        }
    }else{
        return false;
    }
    
}

function updateTable($conn, $Value) {
    
            $sql = "UPDATE timer SET value = $Value";
            if ($conn->query($sql) === TRUE) {
                return true;
            } else {
                return false;
            }
   
    
}


$conn->close();
?>
