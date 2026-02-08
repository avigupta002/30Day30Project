/* ===============================
   STATE (NO DEFAULT VALUES)
================================ */
let transactions = [];
let monthlyIncome = 0;
let monthlyExpenses = 0;

/* ===============================
   INR FORMATTER
================================ */
const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
});

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("incomeDate").value = today;
    document.getElementById("expenseDate").value = today;

    updateDashboard();
    updateTransactionsTable();
    setupTheme();
});

/* ===============================
   MODAL FUNCTIONS
================================ */
function openIncomeModal() {
    document.getElementById("incomeModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function openExpenseModal() {
    document.getElementById("expenseModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById(id).querySelector("form").reset();
}

/* ===============================
   CLOSE MODAL OUTSIDE
================================ */
window.onclick = e => {
    ["incomeModal", "expenseModal"].forEach(id => {
        if (e.target === document.getElementById(id)) closeModal(id);
    });
};

/* ===============================
   ADD INCOME
================================ */
function addIncome() {
    const amount = Number(incomeAmount.value);
    const category = incomeCategory.value;
    const date = incomeDate.value;
    const description = incomeDescription.value;

    if (!amount || amount <= 0 || !category || !date) {
        alert("Enter valid income details");
        return;
    }

    transactions.unshift({
        id: Date.now(),
        amount,
        category,
        date,
        type: "income",
        status: "Success",
        description
    });

    updateDashboard();
    updateTransactionsTable();
    closeModal("incomeModal");
}

/* ===============================
   ADD EXPENSE
================================ */
function addExpense() {
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;
    const description = expenseDescription.value;

    if (!amount || amount <= 0 || !category || !date) {
        alert("Enter valid expense details");
        return;
    }

    transactions.unshift({
        id: Date.now(),
        amount: -amount,
        category,
        date,
        type: "expense",
        status: "Success",
        description
    });

    updateDashboard();
    updateTransactionsTable();
    closeModal("expenseModal");
}

/* ===============================
   MONTH HELPERS
================================ */
function monthKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}`;
}

/* ===============================
   DASHBOARD LOGIC
================================ */
function calculateMonthlyData() {
    const now = new Date();
    const currentKey = `${now.getFullYear()}-${now.getMonth()}`;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastKey = `${lastMonth.getFullYear()}-${lastMonth.getMonth()}`;

    let currentIncome = 0, currentExpense = 0;
    let lastIncome = 0, lastExpense = 0;

    transactions.forEach(tx => {
        const key = monthKey(tx.date);

        if (key === currentKey) {
            if (tx.type === "income") currentIncome += tx.amount;
            else currentExpense += Math.abs(tx.amount);
        }

        if (key === lastKey) {
            if (tx.type === "income") lastIncome += tx.amount;
            else lastExpense += Math.abs(tx.amount);
        }
    });

    monthlyIncome = currentIncome;
    monthlyExpenses = currentExpense;

    return { lastIncome, lastExpense };
}

/* ===============================
   CHANGE INDICATORS
================================ */
function updateChanges(lastIncome, lastExpense) {
    const incomeEl = document.getElementById("incomeChange");
    const expenseEl = document.getElementById("expenseChange");

    if (!incomeEl || !expenseEl) return;
    // Income
    if (lastIncome > 0) {
        const diff = monthlyIncome - lastIncome;
        const pct = (diff / lastIncome) * 100;
        incomeEl.innerHTML = `
            <i class="fas fa-arrow-${diff >= 0 ? "up" : "down"}"></i>
            ${Math.abs(pct).toFixed(1)}% vs last month
        `;
        incomeEl.style.color = diff >= 0 ? "#10b981" : "#ef4444";
    } else {
        incomeEl.innerHTML = "";
    }

    // Expense
    if (lastExpense > 0) {
        const diff = monthlyExpenses - lastExpense;
        const pct = (diff / lastExpense) * 100;
        expenseEl.innerHTML = `
            <i class="fas fa-arrow-${diff >= 0 ? "up" : "down"}"></i>
            ${Math.abs(pct).toFixed(1)}% vs last month
        `;
        expenseEl.style.color = diff >= 0 ? "#ef4444" : "#10b981";
    } else { expenseEl.innerHTML = ""; }
}

/* ===============================
   UPDATE DASHBOARD
================================ */
function updateDashboard() {
    const { lastIncome, lastExpense } = calculateMonthlyData();

    document.querySelector(".income-amount").textContent =
        inrFormatter.format(monthlyIncome);

    document.querySelector(".expense-amount").textContent =
        inrFormatter.format(monthlyExpenses);

    updateChanges(lastIncome, lastExpense);

    renderOverviewChart();
    renderExpenseBreakdown();
}
function renderOverviewChart() {
    const chart = document.getElementById("overviewChart");
    const labels = document.getElementById("chartLabels");
 
     if (!chart || !labels) {
        console.warn("Chart elements not found in DOM");
        return;
    }

    chart.innerHTML = "";
    labels.innerHTML = "";

    const months = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        months[key] = { income: 0, expense: 0, label: d.toLocaleString("en-IN", { month: "short" }) };
    }

    transactions.forEach(tx => {
        const key = getMonthKey(tx.date);
        if (!months[key]) return;

        if (tx.type === "income") months[key].income += tx.amount;
        if (tx.type === "expense") months[key].expense += Math.abs(tx.amount);
    });

    const max = Math.max(...Object.values(months).map(m => m.income + m.expense), 1);

    Object.values(months).forEach(m => {
        const bar = document.createElement("div");
        bar.className = "chart-bar";

        const incomeHeight = (m.income / max) * 200;
        const expenseHeight = (m.expense / max) * 200;

        bar.innerHTML = `
            <div class="chart-bar-income" style="height:${incomeHeight}px"></div>
            <div class="chart-bar-expense" style="height:${expenseHeight}px"></div>
        `;

        chart.appendChild(bar);

        const label = document.createElement("span");
        label.textContent = m.label;
        labels.appendChild(label);
    });
}
function renderExpenseBreakdown() {
    let total = 0;
    const categories = {};

    transactions.forEach(tx => {
        if (tx.type === "expense") {
            total += Math.abs(tx.amount);
            categories[tx.category] = (categories[tx.category] || 0) + Math.abs(tx.amount);
        }
    });

    document.getElementById("totalExpenses").textContent =
        inrFormatter.format(total);

    document.getElementById("dailyExpense").textContent =
        inrFormatter.format(total / 30);

    document.getElementById("weeklyExpense").textContent =
        inrFormatter.format(total / 4);

    document.getElementById("monthlyExpense").textContent =
        inrFormatter.format(total);

    const list = document.getElementById("expenseCategories");
    list.innerHTML = "";

    Object.entries(categories).forEach(([name, value]) => {
        const li = document.createElement("li");
        li.className = "expense-category";
        li.innerHTML = `
            <div class="category-info">
                <div class="category-dot"></div>
                <span>${name}</span>
            </div>
            <span>${inrFormatter.format(value)}</span>
        `;
        list.appendChild(li);
    });
}

/* ===============================
   TRANSACTIONS TABLE
================================ */
function updateTransactionsTable() {
    const tbody = document.querySelector(".transactions-table tbody");
    tbody.innerHTML = "";

    transactions.slice(0, 10).forEach(tx => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${new Date(tx.date).toLocaleDateString("en-IN")}</td>
            <td>${tx.category}</td>
            <td style="color:${tx.amount > 0 ? "#10b981" : "#ef4444"}">
                ${inrFormatter.format(Math.abs(tx.amount))}
            </td>
            <td><span class="status-success">${tx.status}</span></td>
            <td><i class="fas fa-ellipsis-h"></i></td>
        `;
        tbody.appendChild(tr);
    });
}

/* ===============================
   THEME TOGGLE
================================ */
function setupTheme() {
    const btn = document.getElementById("themeToggle");
    const icon = btn.querySelector("i");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        icon.classList.replace("fa-moon", "fa-sun");
    }

    btn.onclick = () => {
        document.body.classList.toggle("dark-mode");
        const dark = document.body.classList.contains("dark-mode");
        icon.className = dark ? "fas fa-sun" : "fas fa-moon";
        localStorage.setItem("theme", dark ? "dark" : "light");
    };
}

/* ===============================
   PDF EXPORT (FIXED)
================================ */
document.getElementById("exportPdfBtn").addEventListener("click", () => {
    if (!window.html2pdf) {
        alert("PDF library not loaded");
        return;
    }

    html2pdf().set({
        filename: "expense-dashboard.pdf",
        margin: 0.5,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    }).from(document.getElementById("dashboardContent")).save();
});
/* ===============================
THEME TOGGLE 
================================ */
function setupTheme() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const icon = btn.querySelector("i");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        icon.className = "fas fa-sun";
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const dark = document.body.classList.contains("dark-mode");
        icon.className = dark ? "fas fa-sun" : "fas fa-moon";
        localStorage.setItem("theme", dark ? "dark" : "light");
    });
}