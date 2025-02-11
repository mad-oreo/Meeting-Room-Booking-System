import { auth, app, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { setDoc, doc, collection, getDocs, query, where, documentId } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { addUserData } from './getPostData.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

export async function adminRegister() {
  
  const submitButton = document.getElementById('submit-btn-admin');
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const noGaji = document.getElementById('no-gaji').value;
    const noIC = document.getElementById('no-ic').value;
    const jawatan = document.getElementById('jawatan').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !noGaji || !noIC || !jawatan || !email || !password) {
      alert('Sila lengkapkan semua ruangan!');
      return;
    }

    const formData = {
      username: username,
      noGaji: noGaji,
      noIC: noIC,
      jawatan: jawatan
    };

    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Admin created successfully:', userCredential.user);

      // After successful user creation:
      const uid = userCredential.user.uid;

      // Use uid as the document ID in Firestore:
      await setDoc(doc(db, "adminInfo", uid), {
        username: formData.username,
        noGaji: formData.noGaji,
        noIC: formData.noIC,
        jawatan: formData.jawatan
      });

      // If auth is successful, post data
      alert('Akaun berjaya didaftarkan!');
      await addUserData(formData);
      console.log('Data posted successfully');
      window.location.href = 'adminLogin.html';

    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('Emel ini telah digunakan sebelum ini!');
      } 
      else if (errorCode === 'auth/weak-password') {
        alert('Panjang kata laluan sekurang-kurangnya 6 karakter');
      } 
      else {
        alert(errorMessage);
      }
    }
  });
}

export async function adminLogin() {
  
    const submitButton = document.getElementById('log-btn-admin');
    submitButton.addEventListener('click', async (event) =>{
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Sila lengkapkan semua ruangan');
            return;
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const admin = userCredential.user;
            alert('Log Masuk Berjaya');
            window.location.href = 'adminMain.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

            if (errorCode === 'auth/invalid-credential') {
                alert('Emel atau Kata Laluan Tidak Sah');
            }
        });
    });
}

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

export async function getAdminData() {
  try {
    // 1) Wait for the authenticated user object.
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log("No user found.");
      return [];
    }

    // 2) Query Firestore by the user’s UID
    const userRef = collection(db, "adminInfo");
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