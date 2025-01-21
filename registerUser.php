<?php
session_start();
include 'header.php';
?>

<div class="login-page">
        <div class="login-text">
            <h1>Daftar Akaun Baru</h1>
            <h4>Isi Maklumat Berikut Untuk Mendaftar</h4>
        </div>
        <div class="login-box">
            <form action="" method="POST">
                <div class="form-group">
                    <label for="username"><i class="fas fa-user"></i> Nama Pengguna:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password"><i class="fas fa-lock"></i> Kata Laluan:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <!-- Future Fields Can Be Added Here -->
                <button type="submit" name="register" class="login-btn">DAFTAR</button>
            </form>
            <?php
            if (isset($_SESSION['error'])) {
                echo '<p class="error">' . $_SESSION['error'] . '</p>';
                unset($_SESSION['error']);
            }
            ?>
            <p>Sudah Ada Akaun? <a href="loginPageUser.php">Log Masuk Di Sini</a></p>
        </div>
</div>

<?php include 'footer.php'; ?>

<?php
    if(isset($_POST["register"])){
        include 'connectDB.php';

        $username = $_POST["username"];
        $password = $_POST["password"];

        $sql = "SELECT * from userinfo where u_username='$username'";
        $sendsql = mysqli_query($connect, $sql);

        if($sendsql){
            if(mysqli_num_rows($sendsql) > 0){
                echo "<script>alert('Username already exists');</script>";
            } else {
                $insert_sql = "INSERT INTO userinfo (u_username, u_password) VALUES ('$username', '$password')";
                $insert_result = mysqli_query($connect, $insert_sql);

                if($insert_result){
                    echo "<script>
                        alert('Successfully Registered');
                        window.location.href = 'loginPageUser.php';
                    </script>";
                    exit(); // Ensure no further code is executed
                } else {
                    echo "<script>alert('Registration failed');</script>";
                }
            }
        } else {
            echo "<script>alert('Check connection');</script>";
        }
    }
?>