<?php
session_start();
?>

<?php include 'header.php'; ?>

        <div class="login-page">
            <div class="login-text">
                <h1>Selamat Datang </h1>
                <h4>Masukkan Maklumat Anda Untuk Log Masuk</h4>
            </div>
            <div class="login-box">
                <form action="login_process.php" method="POST">
                    <div class="form-group">
                        <label for="username"><i class="fas fa-user"></i> Nama Pengguna:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password"><i class="fas fa-lock"></i> Kata Laluan:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" name="login" class="login-btn">LOG MASUK</button>
                </form>
                <?php
                if (isset($_SESSION['error'])) {
                    echo '<p class="error">' . $_SESSION['error'] . '</p>';
                    unset($_SESSION['error']);
                }
                ?>
                <p>Pengguna Baharu? <a href="registerUser.php">Daftar Disini</a></p>
            </div>
        </div>

<?php include 'footer.php'; ?>

<?php 

  if(isset($_POST["login"])){
    $hostname = "localhost:3307";
    $username = "root";
    $password = "";
    $dbname = "anokmie1";

    $connect = mysqli_connect($hostname, $username, $password, $dbname) OR DIE ("Connection failed");

    $user = $_POST["username"];
    $pass = $_POST["pass"];

    
        $sql = "SELECT * FROM logins WHERE w_username = '$user' AND w_password = '$pass'";
        $sendsql = mysqli_query($connect, $sql);

        if($sendsql){
            if(mysqli_num_rows($sendsql) > 0){
                $_SESSION['username'] = $user;
                echo "<script>alert('Successfully Login');</script>";
                echo "<script>window.location.replace('booking.php');</script>";
                exit; // Ensure script stops execution after redirect
            } else {
                echo "<script>alert('Username or password incorrect');</script>";
                echo "<script>window.location.replace('anokmielogin.php');</script>";
                exit; // Ensure script stops execution after redirect
            }
        } else {
            echo "Query failed!";
        }
    }