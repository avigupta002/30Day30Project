const loanAmount = document.getElementById("amount");
const interestRate = document.getElementById("interest");
const loanDuration = document.getElementById("loanTenure");
const yearRadio = document.getElementById("year");
const monthRadio = document.getElementById("month");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    calculateEMI();
});
function calculateEMI() {
    const P = parseFloat(loanAmount.value);
    const annualRate = parseFloat(interestRate.value);
    const tenureValue = parseInt(loanDuration.value);
    if (!P || !annualRate || !tenureValue) {
        alert("Please fill all fields correctly");
        return;
    }
    if (!yearRadio.checked && !monthRadio.checked) {
        alert("Please select loan tenure type (Year or Month)");
        return;
    }
    const n = yearRadio.checked ? tenureValue * 12 : tenureValue;
    const r = annualRate / 12 / 100;
    let EMI;
    if (r === 0) {
        EMI = P / n;
    } else {
        EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPayment = EMI * n;
    const totalInterest = totalPayment - P;
    document.getElementById("emi").innerText =
        `₹${EMI.toFixed(2)}`;

    document.getElementById("totalInterest").innerText =
        `₹${totalInterest.toFixed(2)}`;

    document.getElementById("totalPayment").innerText =
        `₹${totalPayment.toFixed(2)}`;
}
