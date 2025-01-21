<?php include 'header.php'; ?>

    <div class="page">
        <div class="bilik-content">
            <div class="bilik-info-container">
                <section class="bilik-pic">
                    <img src="img/lebronsunshinecover.jpg" alt="Gambar zamrud" class="bilik-img">
                </section>
                <section class="bilik-info">
                    <h2>Bilik Zamrud</h2>
                    <p>RM 100</p>
                    <p>Tempoh Sewaan: 2 jam</p>
                    <p>Kapasiti: 10 orang</p>
                    <p>Perabot: Meja, kerusi, projektor</p>
                    <p>Wifi: Ya</p>
                </section>
            </div>
            <section class="bilik-form">
                <h1>Booking Details</h1>
                <form action="" method="post">
                    <div class="input-box">
                        <label for="nama">Nama:</label>
                        <input type="text" id="nama" name="nama" required>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="tarikh">Tarikh:</label>
                        <input type="date" id="tarikh" name="tarikh" required>
                    </div>
                    <label for="sesi">Sesi:</label>
                    <select id="sesi" name="sesi" required>
                        <option value="pilih" selected>Pilih Sesi...</option>
                        <option value="pagi">Sesi Pagi</option>
                        <option value="petang">Sesi Petang</option>
                    </select>
                    <label for="catatan">Catatan:</label>
                    <textarea id="catatan" name="catatan"></textarea>
                    <button type="submit" class="tempah-btn">TEMPAH</button>
                </form>
            </section>
        </div>
    </div>
<?php include 'footer.php'; ?>