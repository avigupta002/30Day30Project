
const { jsPDF } = window.jspdf;

const notes = [2000, 500, 100, 20, 10, 5, 1];
const noOfNotes = document.querySelectorAll(".no-of-notes");

function calculate() {
  const bill = Number(document.getElementById("bill").value);
  const discount = Number(document.getElementById("discount").value);
  const tax = Number(document.getElementById("tax").value);
  const cash = Number(document.getElementById("cash").value);
  const error = document.getElementById("error");
  const summary = document.getElementById("summary");

  error.innerText = "";
  summary.innerHTML = "";
  noOfNotes.forEach(td => td.innerText = "0");

  if (!bill || !cash) {
    error.innerText = "Please enter valid amounts";
    return;
  }

  let discountAmount = bill * (discount / 100);
  let discountedBill = bill - discountAmount;
  let taxAmount = discountedBill * (tax / 100);
  let finalAmount = discountedBill + taxAmount;

  if (cash < finalAmount) {
    error.innerText = "Cash is less than payable amount";
    return;
  }

  let change = Math.floor(cash - finalAmount);

  summary.innerHTML = `
    <div><span>Bill</span><span>₹${bill.toFixed(2)}</span></div>
    <div><span>Discount</span><span>- ₹${discountAmount.toFixed(2)}</span></div>
    <div><span>Tax</span><span>+ ₹${taxAmount.toFixed(2)}</span></div>
    <hr>
    <div><strong>Payable</strong><strong>₹${finalAmount.toFixed(2)}</strong></div>
    <div><span>Cash Given</span><span>₹${cash.toFixed(2)}</span></div>
    <div><strong>Change</strong><strong>₹${change}</strong></div>
  `;

  let remaining = change;
  notes.forEach((note, i) => {
    let count = Math.floor(remaining / note);
    noOfNotes[i].innerText = count;
    remaining %= note;
  });
}

function printReceipt() {
  window.print();
}

function downloadPDF() {
  const pdf = new jsPDF();
  pdf.text(document.getElementById("receipt").innerText, 20, 20);
  pdf.save("receipt.pdf");
}
