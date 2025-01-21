import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from "/public/firebaseConfig.js";

export async function approvedUser() {
  const approveButtons = document.querySelectorAll(".btn-primary");
  approveButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const bookingId = event.target.getAttribute("data-id");
      console.log("Approving booking with ID:", bookingId);

      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "approved" });

        // Remove the row from the table
        const row = event.target.closest("tr");
        row.remove();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  });
}

export async function rejectedUser() {
  const rejectButtons = document.querySelectorAll(".btn-danger");
  rejectButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const bookingId = event.target.getAttribute("data-id");
      console.log("Rejecting booking with ID:", bookingId);

      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "rejected" });

        // Remove the row from the table
        const row = event.target.closest("tr");
        row.remove();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  });
}

export async function KIVUser() {
  const kivButtons = document.querySelectorAll(".btn-warning");
  kivButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const bookingId = event.target.getAttribute("data-id");
      console.log("KIV booking with ID:", bookingId);

      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "kiv" });

        // Remove the row from the table
        const row = event.target.closest("tr");
        row.remove();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  });
}