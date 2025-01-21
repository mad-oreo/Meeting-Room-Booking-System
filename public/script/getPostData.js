// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get Firestore
const db = getFirestore(app);

/* -------------------- ADD DATA -------------------- */
export async function addUserData(userData) {
  try {
    const docRef = await addDoc(collection(db, 'userInfo'), userData);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

/* -------------------- GET DATA -------------------- */
// Example login function
export async function loginUser(username, password) {
  try {
    
    // Query userInfo collection for matching username and password
    const q = query(
      collection(db, "userInfo"),
      where("username", "==", username),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    // If querySnapshot is not empty, a matching user was found
    if (!querySnapshot.empty) {
      console.log("Login successful!");
      return true;
    } else {
      console.log("Invalid username or password.");
      return false;
    }
  } catch (err) {
    console.error("Error checking login:", err);
    return false;
  }
}

/* -------------------- GET ALL DATA -------------------- */
export async function getAllUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'userInfo'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

/* -------------------- POST BOOKING DETAILS -------------------- */
export async function postBooking(bookingData) {
  try {
    const docRef = await addDoc(collection(db, 'bookingDetails'), bookingData);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
