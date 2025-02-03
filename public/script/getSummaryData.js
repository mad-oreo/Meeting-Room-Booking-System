import { getDocs, collection, query, where, orderBy, limit, documentId } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { db } from "./firebaseConfig.js";

/**
 * Returns a Promise that resolves to the currentUser
 * once the onAuthStateChanged event fires.
 */
export function getCurrentUser() {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Return both uid and email
        resolve({ uid: currentUser.uid, email: currentUser.email });
      } else {
        resolve(null);
      }
    });
  });
}

export async function getUserData() {
  try {
    // 1) Wait for the authenticated user object.
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log("No user found.");
      return [];
    }

    // 2) Query Firestore by the user’s UID
    const userRef = collection(db, "userInfo");
    const q = query(userRef, where(documentId(), "==", currentUser.uid));

    // 3) Use the authenticated user’s email
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      email: currentUser.email  // Attach the user’s email
    }));
  } catch (err) {
    console.error("Error fetching user data:", err);
    return [];
  }
}

export async function getBookingData() {
  try {
    // 1) Wait for the authenticated user to be available.
    const user = await getCurrentUser();
    if (!user) {
      console.log("No user found.");
      return [];
    }

    // 2) Make the Firestore query now that user.uid is valid.
    const bookingRef = collection(db, "bookingDetails");
    const q = query(bookingRef, where("userID", "==", user.uid), orderBy("createdAt", "desc"), limit(1));

    // 3) Get documents.
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc =>({
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching booking data:", err);
    return [];
  }
}

export function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}