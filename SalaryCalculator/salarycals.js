
function calculateSalary() {
    const baseSalary = parseFloat(document.getElementById('base-salary').value);
    const yearsOfService = parseInt(document.getElementById('years-of-service').value);
    const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);
    const resultElement = document.getElementById('result');
    const invoiceElement = document.getElementById('invoice');

    if (isNaN(baseSalary) || isNaN(yearsOfService) || isNaN(taxPercentage)) {
        resultElement.textContent = "Please enter valid numbers.";
        return;
    }

    let netSalary;

    if (yearsOfService <= 5) {
        const bonus = 0.010 * baseSalary;
        const tax = (taxPercentage / 100) * baseSalary;
        netSalary = baseSalary - tax;
    } else {
        const bonus = 0.08 * baseSalary;
        const tax = (taxPercentage / 100) * baseSalary;
        netSalary = baseSalary + bonus - tax;
    }

    resultElement.textContent = `You will get a net salary of: ${netSalary.toFixed(2)}`;

    // Generate Invoice
    document.getElementById('invoice-base-salary').textContent = baseSalary.toFixed(2);
    document.getElementById('invoice-years-of-service').textContent = yearsOfService;
    document.getElementById('invoice-tax-percentage').textContent = taxPercentage.toFixed(2) + '%';
    document.getElementById('invoice-net-salary').textContent = netSalary.toFixed(2);

    invoiceElement.style.display = 'block';
}

