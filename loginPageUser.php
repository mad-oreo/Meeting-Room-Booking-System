<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Meeting Room Booking System</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="index.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:500&display=swap" rel="stylesheet">
</head>
<body>
    <header class="navbar">
            <img src="img/Coat_of_Arms_of_Kuala_Lumpur.svg" 
            alt="Logo DBKL" 
            class="logo">
            <div class="logo-text">
                <h2>INSTITUT LATIHAN</h2>
                <h3>DEWAN BANDARAYA KUALA LUMPUR</h3>
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="">Laman Utama</a> |</li>
                    <li><a href="">Senarai Tempahan</a> |</li>
                    <li><a href="">Tambah Tempahan</a> </li>
                </ul>
            <nav>
        </header>

        <div class="login-page">
            <div class="login-text">
                <h1>Selamat Datang Ke Sistem Tempahan Bilik Mesyuarat</h1>
                <h4>Masukkan Maklumat Anda Untuk Log Masuk</h4>
                <form action="login_process.php" method="POST">
                    <div class="form-group">
                        <label for="username"><i class="fas fa-user"></i> Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password"><i class="fas fa-lock"></i> Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="login-btn">Login</button>
                </form>
                <?php
                if (isset($_SESSION['error'])) {
                    echo '<p class="error">' . $_SESSION['error'] . '</p>';
                    unset($_SESSION['error']);
                }
                ?>
                <p>Don't have an account? <a href="register.php">Register here</a></p>
            </div>
        </div>
</body>
</html>