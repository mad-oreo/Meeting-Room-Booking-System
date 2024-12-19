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
            <form action="register_process.php" method="POST">
                <div class="form-group">
                    <label for="username"><i class="fas fa-user"></i> Nama Pengguna:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password"><i class="fas fa-lock"></i> Kata Laluan:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <!-- Future Fields Can Be Added Here -->
                <button type="submit" class="login-btn">DAFTAR</button>
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