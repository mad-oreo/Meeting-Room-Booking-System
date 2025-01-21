<?php
// Database connection details
$servername = "localhost:3307"; // Replace with your server name if different
$username = "root";            // Replace with your database username
$password = "";                // Replace with your database password
$dbname = "bilik_mesy_db";     // Replace with your database name

// Create connection
$connect = mysqli_connect($servername, $username, $password, $dbname);

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";
?>

            