import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

export async function approvedUser() {
  const approveButtons = document.querySelectorAll(".btn-primary");
  approveButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const confirmed = confirm("Adakah anda pasti ingin meluluskan tempahan ini?");
      if (!confirmed) return; // user canceled

      const bookingId = event.target.getAttribute("data-id");
      console.log("Approving booking with ID:", bookingId);
      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "Diluluskan" });

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
      const confirmed = confirm("Adakah anda pasti ingin menolak tempahan ini?");
      if (!confirmed) return; // user canceled

      const bookingId = event.target.getAttribute("data-id");
      console.log("Rejecting booking with ID:", bookingId);

      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "Ditolak" });

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
      const confirmed = confirm("Adakah anda pasti ingin menahan tempahan ini?");
      if (!confirmed) return; // user canceled

      const bookingId = event.target.getAttribute("data-id");
      console.log("KIV booking with ID:", bookingId);

      const bookingRef = doc(db, "bookingDetails", bookingId);
      try {
        await updateDoc(bookingRef, { status: "Dalam Perhatian" });

        // Remove the row from the table
        const row = event.target.closest("tr");
        row.remove();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  });
}

 // Export table to XLSX function
 export function exportTableToXLSX(sheetName, xlsxName) {
  const table = document.querySelector("table");
  // Convert table to a workbook
  const workbook = XLSX.utils.table_to_book(table, { sheet: sheetName });
  // Download as .xlsx file
  XLSX.writeFile(workbook, xlsxName);
}

export function handleAction(bookingId, action) {
  const confirmed = confirm("Adakah anda pasti ingin meneruskan tindakan ini?");
  if (!confirmed) {
    // User clicked "Cancel"; do nothing
    return;
  }

  if (action === "approve") {
    // Your logic to approve the booking...
    approvedUser();
  } else if (action === "reject") {
    // Your logic to reject the booking...
    rejectedUser();
  } 
}