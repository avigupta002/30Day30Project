
let qrScanner;

function generateQR() {
  const text = document.getElementById("qrText").value;
  const qrBox = document.getElementById("qrcode");
  qrBox.innerHTML = "";
  if (!text.trim()) {
    alert("Please enter text");
    return;
  }
  new QRCode(qrBox, {
    text: text,
    width: 200,
    height: 200
  });
}

/* ========= DOWNLOAD QR ========= */
function downloadQR() {
  const img = document.querySelector("#qrcode img");
  if (!img) {
    alert("Generate QR first");
    return;
  }
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr-code.png";
  link.click();
}

/* ========= SWITCH TO SCANNER ========= */
function openScanner() {
  document.getElementById("generatorView").classList.add("hidden");
  document.getElementById("scannerView").classList.remove("hidden");

  qrScanner = new Html5Qrcode("reader");
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 230 },
    result => {
      document.getElementById("scanResult").innerText = result;
    }
  );
}

/* ========= BACK ========= */
function backToGenerator() {
  if (qrScanner) {
    qrScanner.stop().then(() => qrScanner.clear());
  }
  document.getElementById("scannerView").classList.add("hidden");
  document.getElementById("generatorView").classList.remove("hidden");
}

/* ========= SCAN FROM IMAGE ========= */
function scanFromImage(input) {
  if (!input.files.length) return;

  const file = input.files[0];
  const imageScanner = new Html5Qrcode("reader");

  imageScanner.scanFile(file, true)
    .then(text => {
      document.getElementById("scanResult").innerText = text;
    })
    .catch(() => {
      alert("Invalid QR image");
    });
}
