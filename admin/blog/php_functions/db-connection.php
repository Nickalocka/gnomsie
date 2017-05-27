<?php

//TODO: path - connection string
$servername = "localhost";
// $username = "strifest_strife";
$username = "root";
// $password = "SimbaD054125!";
$password = "";
$dbname = "strifest_gnomsie";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }
?>