import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCQVsAHCr3iOSQsxPlreLjLdjAecOm0KiI",
    authDomain: "meeting-room-booking-sys-87514.firebaseapp.com",
    projectId: "meeting-room-booking-sys-87514",
    storageBucket: "meeting-room-booking-sys-87514.firebasestorage.app",
    messagingSenderId: "661257476243",
    appId: "1:661257476243:web:cb11b739721f71ecb49566",
    measurementId: "G-JRYMBJZSFV"
});

const auth = getAuth(firebaseApp);

// Detect auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in");
    } else {
        console.log("User is signed out");
    }
});