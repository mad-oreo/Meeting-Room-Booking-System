import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { postBooking } from "./getPostData.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

let currentUserId = null;

// Detect the signed-in user
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    console.log("User ID:", currentUserId);
  } else {
    console.log("User is signed out");
  }
});


  const tempahButton = document.getElementById('bilik-tempah-btn');

  try {
    if (tempahButton) {
        tempahButton.addEventListener('click', async (event) => {
          event.preventDefault();
    
          const nama = document.getElementById('nama-bilik').value;
          const tajuk = document.getElementById('tajuk').value;
          const tarikh = document.getElementById('tarikh').value;
          const sesi = document.getElementById('sesi').value;
          const sebab = document.getElementById('sebab').value;
          const makan = document.getElementById('makan-checkbox').checked;
          const minum = document.getElementById('minum-checkbox').checked;
    
          if (!nama || !tajuk || !tarikh || !sesi || !sebab || sesi === 'pilih') {
            alert('Sila lengkapkan semua ruangan!');
            return;
          }
    
          const bookingData = {
            userID: currentUserId, // Use the captured UID
            namaBilik: nama,
            tajuk : tajuk,
            tarikh : tarikh,
            sesi : sesi,
            sebab : sebab,
            makan : makan,
            minum : minum,
            createdAt: serverTimestamp(),
          };
    
          await postBooking(bookingData);
          alert("Tempahan berjaya!");
          window.location.href = 'summary.html';
        });
     }
  }
    catch (error) {
        console.error("Error adding document: ", error);
    }
  