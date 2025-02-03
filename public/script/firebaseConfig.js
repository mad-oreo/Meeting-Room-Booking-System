// You can find the Firebase config in the Firebase console
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyCQVsAHCr3iOSQsxPlreLjLdjAecOm0KiI",
          authDomain: "meeting-room-booking-sys-87514.firebaseapp.com",
          databaseURL: "https://meeting-room-booking-sys-87514-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "meeting-room-booking-sys-87514",
          storageBucket: "meeting-room-booking-sys-87514.firebasestorage.app",
          messagingSenderId: "661257476243",
          appId: "1:661257476243:web:cb11b739721f71ecb49566",
          measurementId: "G-JRYMBJZSFV"
        };
      
        // Initialize Firebase
        export const app = initializeApp(firebaseConfig);
        export const analytics = getAnalytics(app);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        