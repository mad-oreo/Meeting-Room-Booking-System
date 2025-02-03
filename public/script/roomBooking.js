import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { postBooking } from "./getPostData.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebaseConfig.js';

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

          const isValidDate = validateDate(tarikh);
          if (!isValidDate) {
            return;
          }

          const isAvailable = await checkAvailability(tarikh, sesi);
          if (!isAvailable) {
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
        alert("Tempahan gagal. Sila cuba lagi.");
    }

async function checkAvailability(tarikh, sesi) {
  const bookingRef = collection(db, "bookingDetails");
  const q = query(bookingRef, where("tarikh", "==", tarikh), where("sesi", "==", sesi));
  const snapshot = await getDocs(q);

  console.log("Query snapshot:", snapshot.docs); 
  if (!snapshot.empty) {
    alert("Tarikh dan sesi ini telah ditempah. Sila pilih sesi atau tarikh lain.");
    return false;
  }
  return true;
}

export function validateDate() {
    // Disable today's date and past dates
    const dateInput = document.getElementById('tarikh');
    const today = new Date();
    // Move one day ahead so today's date is not selectable
    today.setDate(today.getDate() + 1);

    // Format date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    // Apply the min attribute to disable today and past dates
    dateInput.setAttribute('min', minDate);

    // Check if the selected date is valid
  const selectedDate = new Date(dateInput.value);
  const minDateObj = new Date(minDate);
  return selectedDate >= minDateObj;
}