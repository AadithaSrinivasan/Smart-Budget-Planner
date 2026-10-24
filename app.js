
"use strict";

/* Smart Budget Planner
   Browser-based prototype. Data is stored locally on this device.
*/

const STORAGE_KEY = "smartBudgetPlannerData_v1";

const SYMBOLS = [
    "🌞", "🌙", "⭐", "🌈", "🌻", "🌼", "🍀", "🌿", "🌺",
    "🪷", "🍎", "🍋", "🍇", "🍉", "🍓", "🦋", "🐘", "🦚",
    "🐢", "🐬", "🐼", "🦉", "🐈", "🐕", "🏠", "🎈", "🎵",
    "🎨", "📚", "✈️", "🚲", "☕", "🪔", "💎", "❤️", "🌍"
];

const LANGUAGES = {
    en: {
        overview: "Overview",
        income: "Income",
        expenses: "Expenses",
        savings: "Savings & commitments",
        salary: "Salary-day planner",
        debt: "Debt planner",
        whatIf: "What-if simulator",
        challenge: "No-spend challenge",
        schemes: "Government schemes",
        schedule: "My schedule",
        logout: "Log out",
        addIncome: "Add income",
        addExpense: "Add expense",
        login: "Log in",
        createProfile: "Create profile",
        noTransactions: "No transactions yet.",
        balance: "Available balance",
        incomeLabel: "Income",
        expenseLabel: "Expenses",
        delete: "Delete",
        languageSaved: "Language preference updated."
    },
    hi: {
        overview: "अवलोकन",
        income: "आय",
        expenses: "खर्च",
        savings: "बचत और प्रतिबद्धताएँ",
        salary: "वेतन योजना",
        debt: "ऋण योजना",
        whatIf: "खर्च का प्रभाव",
        challenge: "खर्च न करने की चुनौती",
        schemes: "सरकारी योजनाएँ",
        schedule: "मेरा कार्यक्रम",
        logout: "लॉग आउट",
        addIncome: "आय जोड़ें",
        addExpense: "खर्च जोड़ें",
        login: "लॉग इन",
        createProfile: "प्रोफ़ाइल बनाएँ",
        noTransactions: "अभी कोई लेन-देन नहीं है।",
        balance: "उपलब्ध शेष राशि",
        incomeLabel: "आय",
        expenseLabel: "खर्च",
        delete: "हटाएँ",
        languageSaved: "भाषा की प्राथमिकता अपडेट हुई।"
    },
    kn: {
        overview: "ಅವಲೋಕನ",
        income: "ಆದಾಯ",
        expenses: "ವೆಚ್ಚಗಳು",
        savings: "ಉಳಿತಾಯ ಮತ್ತು ಗುರಿಗಳು",
        salary: "ಸಂಬಳ ಯೋಜನೆ",
        debt: "ಸಾಲ ಯೋಜನೆ",
        whatIf: "ವೆಚ್ಚದ ಪರಿಣಾಮ",
        challenge: "ಖರ್ಚಿಲ್ಲದ ಸವಾಲು",
        schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        schedule: "ನನ್ನ ವೇಳಾಪಟ್ಟಿ",
        logout: "ಲಾಗ್ ಔಟ್",
        addIncome: "ಆದಾಯ ಸೇರಿಸಿ",
        addExpense: "ವೆಚ್ಚ ಸೇರಿಸಿ",
        login: "ಲಾಗಿನ್",
        createProfile: "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ",
        noTransactions: "ಇನ್ನೂ ಯಾವುದೇ ವ್ಯವಹಾರಗಳಿಲ್ಲ.",
        balance: "ಲಭ್ಯವಿರುವ ಬಾಕಿ",
        incomeLabel: "ಆದಾಯ",
        expenseLabel: "ವೆಚ್ಚ",
        delete: "ಅಳಿಸಿ",
        languageSaved: "ಭಾಷೆಯ ಆದ್ಯತೆ ನವೀಕರಿಸಲಾಗಿದೆ."
    },
    ta: {
        overview: "கண்ணோட்டம்",
        income: "வருமானம்",
        expenses: "செலவுகள்",
        savings: "சேமிப்பு மற்றும் இலக்குகள்",
        salary: "சம்பளத் திட்டம்",
        debt: "கடன் திட்டம்",
        whatIf: "செலவு தாக்கம்",
        challenge: "செலவில்லா சவால்",
        schemes: "அரசுத் திட்டங்கள்",
        schedule: "எனது அட்டவணை",
        logout: "வெளியேறு",
        addIncome: "வருமானத்தைச் சேர்",
        addExpense: "செலவைச் சேர்",
        login: "உள்நுழை",
        createProfile: "சுயவிவரத்தை உருவாக்கு",
        noTransactions: "பரிவர்த்தனைகள் இன்னும் இல்லை.",
        balance: "கிடைக்கும் இருப்பு",
        incomeLabel: "வருமானம்",
        expenseLabel: "செலவுகள்",
        delete: "நீக்கு",
        languageSaved: "மொழி விருப்பம் புதுப்பிக்கப்பட்டது."
    },
    te: {
        overview: "సారాంశం",
        income: "ఆదాయం",
        expenses: "ఖర్చులు",
        savings: "పొదుపు లక్ష్యాలు",
        salary: "జీతం ప్రణాళిక",
        debt: "అప్పుల ప్రణాళిక",
        whatIf: "ఖర్చు ప్రభావం",
        challenge: "ఖర్చులేని సవాలు",
        schemes: "ప్రభుత్వ పథకాలు",
        schedule: "నా షెడ్యూల్",
        logout: "లాగ్ అవుట్",
        addIncome: "ఆదాయం జోడించండి",
        addExpense: "ఖర్చు జోడించండి",
        login: "లాగిన్",
        createProfile: "ప్రొఫైల్ సృష్టించండి",
        noTransactions: "ఇంకా లావాదేవీలు లేవు.",
        balance: "అందుబాటులో ఉన్న నిల్వ",
        incomeLabel: "ఆదాయం",
        expenseLabel: "ఖర్చులు",
        delete: "తొలగించు",
        languageSaved: "భాష ప్రాధాన్యత నవీకరించబడింది."
    },
    ml: {
        overview: "അവലോകനം",
        income: "വരുമാനം",
        expenses: "ചെലവുകൾ",
        savings: "സമ്പാദ്യ ലക്ഷ്യങ്ങൾ",
        salary: "ശമ്പള പദ്ധതി",
        debt: "കട പദ്ധതി",
        whatIf: "ചെലവിന്റെ സ്വാധീനം",
        challenge: "ചെലവില്ലാ വെല്ലുവിളി",
        schemes: "സർക്കാർ പദ്ധതികൾ",
        schedule: "എന്റെ ഷെഡ്യൂൾ",
        logout: "ലോഗ് ഔട്ട്",
        addIncome: "വരുമാനം ചേർക്കുക",
        addExpense: "ചെലവ് ചേർക്കുക",
        login: "ലോഗിൻ",
        createProfile: "പ്രൊഫൈൽ സൃഷ്ടിക്കുക",
        noTransactions: "ഇതുവരെ ഇടപാടുകളില്ല.",
        balance: "ലഭ്യമായ ബാലൻസ്",
        incomeLabel: "വരുമാനം",
        expenseLabel: "ചെലവുകൾ",
        delete: "നീക്കം ചെയ്യുക",
        languageSaved: "ഭാഷാ മുൻഗണന പുതുക്കി."
    },
    mr: {
        overview: "आढावा",
        income: "उत्पन्न",
        expenses: "खर्च",
        savings: "बचत आणि उद्दिष्टे",
        salary: "पगार नियोजन",
        debt: "कर्ज नियोजन",
        whatIf: "खर्चाचा परिणाम",
        challenge: "खर्च न करण्याचे आव्हान",
        schemes: "सरकारी योजना",
        schedule: "माझे वेळापत्रक",
        logout: "लॉग आउट",
        addIncome: "उत्पन्न जोडा",
        addExpense: "खर्च जोडा",
        login: "लॉग इन",
        createProfile: "प्रोफाइल तयार करा",
        noTransactions: "अद्याप व्यवहार नाहीत.",
        balance: "उपलब्ध शिल्लक",
        incomeLabel: "उत्पन्न",
        expenseLabel: "खर्च",
        delete: "काढून टाका",
        languageSaved: "भाषेची पसंती अद्ययावत केली."
    }
};

const $ = (id) => document.getElementById(id);

function localDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function currentMonthString() {
    return localDateString().slice(0, 7);
}

function makeId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function defaultData() {
    return {
        version: 1,
        profile: null,
        transactions: [],
        goals: [],
        debts: [],
        schedule: [],
        salaryPlan: null,
        challenge: null,
        language: "en"
    };
}

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return defaultData();
        }

        const parsed = JSON.parse(raw);
        const data = Object.assign(defaultData(), parsed);

        if (!Array.isArray(data.transactions)) data.transactions = [];
        if (!Array.isArray(data.goals)) data.goals = [];
        if (!Array.isArray(data.debts)) data.debts = [];
        if (!Array.isArray(data.schedule)) data.schedule = [];

        return data;
    } catch (error) {
        console.error("Unable to load saved budget data:", error);
        return defaultData();
    }
}

let data = loadData();
let currentUser = false;
let registerSymbols = [];
let loginSymbols = [];
let incomeExpenseChart = null;
let expenseBreakdownChart = null;
let salaryAllocationChart = null;

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Unable to save budget data:", error);
        showDataMessage("Could not save data. Check browser storage settings.", true);
        return false;
    }
}

function money(value) {
    const amount = Number(value) || 0;

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(amount);
}

function safeNumber(value) {
    const result = Number(value);
    return Number.isFinite(result) ? result : 0;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function showMessage(element, message, isError = false) {
    if (!element) return;

    element.textContent = message;
    element.classList.toggle("error", isError);
    element.classList.toggle("success", !isError && message.length > 0);
}

function showDataMessage(message, isError = false) {
    showMessage($("dataManagementMessage"), message, isError);
}

function getLanguage() {
    return LANGUAGES[data.language] ? data.language : "en";
}

function translate(key) {
    const language = getLanguage();
    return LANGUAGES[language][key] || LANGUAGES.en[key] || key;
}

function getSelectedMonth() {
    return $("budgetMonth").value || currentMonthString();
}

function monthTransactions() {
    const month = getSelectedMonth();

    return data.transactions.filter((transaction) => {
        return String(transaction.date || "").slice(0, 7) === month;
    });
}

function totalForType(transactions, type) {
    return transactions
        .filter((transaction) => transaction.type === type)
        .reduce((total, transaction) => total + safeNumber(transaction.amount), 0);
}

function openingBalance() {
    return safeNumber(data.profile && data.profile.startingBalance);
}

function availableBalance() {
    return openingBalance() +
        totalForType(data.transactions, "income") -
        totalForType(data.transactions, "expense");
}

function monthlyBalance() {
    const transactions = monthTransactions();

    return totalForType(transactions, "income") -
        totalForType(transactions, "expense");
}

function monthPrediction() {
    const now = new Date();
    const month = getSelectedMonth();
    const monthStart = new Date(`${month}-01T12:00:00`);
    const year = monthStart.getFullYear();
    const monthIndex = monthStart.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const isCurrentMonth = month === currentMonthString();

    const monthIncome = totalForType(monthTransactions(), "income");
    const monthExpense = totalForType(monthTransactions(), "expense");
    const elapsedDays = isCurrentMonth ? Math.max(1, now.getDate()) : daysInMonth;

    if (!isCurrentMonth && month > currentMonthString()) {
        return {
            value: 0,
            note: "Future month: prediction will become useful after transactions are recorded."
        };
    }

    if (isCurrentMonth) {
        const projectedExpenses = monthExpense / elapsedDays * daysInMonth;
        const projectedIncome = monthIncome / elapsedDays * daysInMonth;

        return {
            value: availableBalance() + projectedIncome - projectedExpenses,
            note: `Estimate using ${elapsedDays} elapsed day(s) of recorded data.`
        };
    }

    return {
        value: openingBalance() + monthIncome - monthExpense,
        note: "Past month: actual recorded balance change, not a forecast."
    };
}

function renderSymbolGrid(gridId, selectedSymbols, statusId) {
    const grid = $(gridId);
    if (!grid) return;

    const visibleSymbols = SYMBOLS.slice(0, 15);

    grid.innerHTML = visibleSymbols.map((symbol) => {
        const order = selectedSymbols.indexOf(symbol);
        const selected = order !== -1;

        return `
            <button
                type="button"
                class="symbol-button${selected ? " selected" : ""}"
                data-symbol="${escapeHTML(symbol)}"
                aria-pressed="${selected ? "true" : "false"}"
                aria-label="${escapeHTML(symbol)}${selected ? `, selected ${order + 1}` : ""}"
            >
                ${symbol}
                ${selected ? `<span class="symbol-order">${order + 1}</span>` : ""}
            </button>
        `;
    }).join("");

    grid.querySelectorAll(".symbol-button").forEach((button) => {
        button.addEventListener("click", () => {
            const symbol = button.dataset.symbol;
            const index = selectedSymbols.indexOf(symbol);

            if (index !== -1) {
                selectedSymbols.splice(index, 1);
            } else if (selectedSymbols.length < 5) {
                selectedSymbols.push(symbol);
            } else {
                const status = $(statusId);
                if (status) status.textContent = "Five symbols are selected. Remove one to change your pattern.";
                return;
            }

            renderSymbolGrid(gridId, selectedSymbols, statusId);
            updateSymbolStatus(selectedSymbols, statusId);
        });
    });

    updateSymbolStatus(selectedSymbols, statusId);
}

function updateSymbolStatus(selectedSymbols, statusId) {
    const status = $(statusId);

    if (status) {
        status.textContent = `${selectedSymbols.length} of 5 symbols selected.`;
    }
}

function switchAuthTab(tab) {
    const isRegister = tab === "register";

    $("registerPanel").classList.toggle("hidden", !isRegister);
    $("loginPanel").classList.toggle("hidden", isRegister);

    $("registerTab").classList.toggle("active", isRegister);
    $("loginTab").classList.toggle("active", !isRegister);

    $("registerTab").setAttribute("aria-selected", String(isRegister));
    $("loginTab").setAttribute("aria-selected", String(!isRegister));

    showMessage($("authMessage"), "");
}

function updateLanguage() {
    const languageSelect = $("languageSelect");
    const profileLanguage = $("profileLanguage");

    if (languageSelect) languageSelect.value = getLanguage();
    if (profileLanguage) profileLanguage.value = getLanguage();

    document.documentElement.lang = getLanguage();

    const navKeys = {
        overviewPanel: "overview",
        incomePanel: "income",
        expensesPanel: "expenses",
        savingsPanel: "savings",
        salaryPanel: "salary",
        debtPanel: "debt",
        whatIfPanel: "whatIf",
        challengePanel: "challenge",
        schemesPanel: "schemes",
        schedulePanel: "schedule"
    };

    document.querySelectorAll(".nav-button[data-target]").forEach((button) => {
        const key = navKeys[button.dataset.target];
        if (key) button.textContent = translate(key);
    });

    $("logoutButton").textContent = translate("logout");

    document.querySelectorAll("#incomeForm button[type='submit']").forEach((button) => {
        button.textContent = translate("addIncome");
    });

    document.querySelectorAll("#expenseForm button[type='submit']").forEach((button) => {
        button.textContent = translate("addExpense");
    });

    $("loginTab").textContent = translate("login");
    $("registerTab").textContent = translate("createProfile");

    if (currentUser) {
        renderDashboard();
    }
}

function showDashboard() {
    $("welcomeSection").classList.add("hidden");
    $("authSection").classList.add("hidden");
    $("dashboardSection").classList.remove("hidden");
    $("logoutButton").classList.remove("hidden");

    currentUser = true;

    const profile = data.profile || {};
    $("dashboardUserName").textContent = profile.name || "Friend";

    const profileLabels = {
        family: "Family / Household",
        bachelor: "Bachelor / Spinster",
        senior: "Senior citizen"
    };

    const typeLabel = profileLabels[profile.type] || profileLabels.family;
    const headText = profile.isHead ? "Family head / account owner" : "Personal budget profile";

    $("dashboardProfileDescription").textContent =
        `${typeLabel} · ${headText} · ${profile.householdSize || 1} household member(s)`;

    $("budgetMonth").value = $("budgetMonth").value || currentMonthString();

    setDefaultFormDates();
    updateLanguage();
    renderDashboard();
}

function logout() {
    currentUser = false;

    $("dashboardSection").classList.add("hidden");
    $("logoutButton").classList.add("hidden");
    $("welcomeSection").classList.remove("hidden");
    $("authSection").classList.remove("hidden");

    $("loginForm").reset();
    loginSymbols = [];
    renderSymbolGrid("loginSymbolGrid", loginSymbols, "loginSymbolStatus");
    showMessage($("authMessage"), "You have logged out.");
}

function setDefaultFormDates() {
    const today = localDateString();

    ["incomeDate", "expenseDate", "scheduleDate"].forEach((id) => {
        const field = $(id);
        if (field && !field.value) field.value = today;
    });

    const deadline = $("savingsDeadline");
    if (deadline && !deadline.value) {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        deadline.value = localDateString(nextYear);
    }
}

function setActivePanel(panelId) {
    document.querySelectorAll(".dashboard-panel").forEach((panel) => {
        panel.classList.toggle("hidden", panel.id !== panelId);
    });

    document.querySelectorAll(".nav-button").forEach((button) => {
        const active = button.dataset.target === panelId;
        button.classList.toggle("active", active);
        button.setAttribute("aria-current", active ? "page" : "false");
    });

    if (panelId === "overviewPanel") {
        renderCharts();
    }

    if (panelId === "salaryPanel") {
        renderSalaryChart();
    }
}

function renderDashboard() {
    if (!data.profile) return;

    const transactions = monthTransactions();
    const income = totalForType(transactions, "income");
    const expenses = totalForType(transactions, "expense");
    const balance = availableBalance();
    const prediction = monthPrediction();

    $("totalIncomeValue").textContent = money(income);
    $("totalExpensesValue").textContent = money(expenses);
    $("availableBalanceValue").textContent = money(balance);
    $("predictedBalanceValue").textContent = money(prediction.value);
    $("predictionNote").textContent = prediction.note;

    renderTransactionTables();
    renderSavingsGoals();
    renderDebts();
    renderSchedule();
    renderChallenge();
    renderSuggestions();
    renderCharts();
}

function renderTransactionTables() {
    const transactions = monthTransactions().slice().sort((a, b) => {
        return String(b.date).localeCompare(String(a.date));
    });

    const income = transactions.filter((item) => item.type === "income");
    const expenses = transactions.filter((item) => item.type === "expense");

    $("incomeTableBody").innerHTML = income.length
        ? income.map((item) => `
            <tr>
                <td>${escapeHTML(item.date)}</td>
                <td>${escapeHTML(item.category)}</td>
                <td>${escapeHTML(item.description || "—")}</td>
                <td>${money(item.amount)}</td>
                <td><button type="button" class="table-action" data-delete-transaction="${escapeHTML(item.id)}">Delete</button></td>
            </tr>
        `).join("")
        : `<tr><td colspan="5">${translate("noTransactions")}</td></tr>`;

    $("expenseTableBody").innerHTML = expenses.length
        ? expenses.map((item) => `
            <tr>
                <td>${escapeHTML(item.date)}</td>
                <td>${escapeHTML(item.category)}</td>
                <td>${escapeHTML(item.necessity || "essential")}</td>
                <td>${escapeHTML(item.description || "—")}</td>
                <td>${money(item.amount)}</td>
                <td><button type="button" class="table-action" data-delete-transaction="${escapeHTML(item.id)}">Delete</button></td>
            </tr>
        `).join("")
        : `<tr><td colspan="6">${translate("noTransactions")}</td></tr>`;

    $("recentTransactionsBody").innerHTML = transactions.length
        ? transactions.slice(0, 8).map((item) => `
            <tr>
                <td>${escapeHTML(item.date)}</td>
                <td>${item.type === "income" ? translate("incomeLabel") : translate("expenseLabel")}</td>
                <td>${escapeHTML(item.category)}</td>
                <td>${escapeHTML(item.description || "—")}</td>
                <td>${money(item.amount)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="5">${translate("noTransactions")}</td></tr>`;
}

function deleteTransaction(id) {
    const transaction = data.transactions.find((item) => item.id === id);
    if (!transaction) return;

    if (!window.confirm(`Delete this ${transaction.type} entry of ${money(transaction.amount)}?`)) {
        return;
    }

    data.transactions = data.transactions.filter((item) => item.id !== id);
    saveData();
    renderDashboard();
}

function renderSuggestions() {
    const container = $("budgetSuggestions");
    const transactions = monthTransactions();
    const income = totalForType(transactions, "income");
    const expenses = totalForType(transactions, "expense");
    const balance = availableBalance();
    const suggestions = [];

    if (!transactions.length) {
        suggestions.push("Start by recording your income and the expenses you have already paid.");
    } else {
        if (income === 0 && expenses > 0) {
            suggestions.push("Expenses are recorded but no income is recorded for this month. Add income if applicable to improve your estimate.");
        }

        if (balance < 0) {
            suggestions.push("Your estimated available balance is negative. Review upcoming commitments and consider which optional expenses can be reduced.");
        } else if (income > 0 && expenses > income) {
            suggestions.push("Recorded monthly expenses exceed recorded monthly income. Check that all entries are correct and review flexible spending.");
        } else if (income > 0 && expenses <= income) {
            suggestions.push("Your recorded expenses are within this month's recorded income. Consider assigning some remaining money to your chosen goals if it is affordable.");
        }

        const optional = transactions
            .filter((item) => item.type === "expense" && item.necessity === "optional")
            .reduce((sum, item) => sum + safeNumber(item.amount), 0);

        if (optional > 0) {
            suggestions.push(`You have recorded ${money(optional)} in optional expenses this month. Review them against your priorities if needed.`);
        }

        const upcoming = data.schedule.filter((item) => {
            return item.date >= localDateString();
        }).sort((a, b) => a.date.localeCompare(b.date));

        if (upcoming.length) {
            suggestions.push(`You have ${upcoming.length} upcoming reminder(s). Check that the expected amounts fit your available balance.`);
        }
    }

    container.innerHTML = suggestions.map((suggestion) => {
        return `<div class="suggestion-item">${escapeHTML(suggestion)}</div>`;
    }).join("");
}

function destroyChart(chart) {
    if (chart) chart.destroy();
}

function renderCharts() {
    if (typeof Chart === "undefined") return;

    const transactions = monthTransactions();
    const income = totalForType(transactions, "income");
    const expenses = totalForType(transactions, "expense");

    destroyChart(incomeExpenseChart);
    incomeExpenseChart = new Chart($("incomeExpenseChart"), {
        type: "bar",
        data: {
            labels: ["Income", "Expenses"],
            datasets: [{
                label: "Amount (₹)",
                data: [income, expenses],
                backgroundColor: ["#4e876b", "#c8795c"],
                borderRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => money(context.raw)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`
                    }
                }
            }
        }
    });

    const categories = {};
    transactions.filter((item) => item.type === "expense").forEach((item) => {
        categories[item.category] = (categories[item.category] || 0) + safeNumber(item.amount);
    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);

    destroyChart(expenseBreakdownChart);
    expenseBreakdownChart = new Chart($("expenseBreakdownChart"), {
        type: "doughnut",
        data: {
            labels: labels.length ? labels : ["No expenses yet"],
            datasets: [{
                data: values.length ? values : [1],
                backgroundColor: [
                    "#285747", "#d88b37", "#ad5e45", "#6d84a2",
                    "#8ba17c", "#c7a6a0", "#d6bd67", "#8e7eac",
                    "#77a9a1", "#d59e6a"
                ],
                borderWidth: 2,
                borderColor: "#fffdf8"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom" },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${money(context.raw)}`
                    }
                }
            }
        }
    });
}

function renderSalaryChart() {
    if (typeof Chart === "undefined") return;

    const plan = data.salaryPlan;
    const labels = ["Needs", "Savings", "Debt", "Wants", "Other"];
    const values = plan
        ? [plan.needs, plan.savings, plan.debt, plan.wants, plan.other]
        : [0, 0, 0, 0, 0];

    destroyChart(salaryAllocationChart);
    salaryAllocationChart = new Chart($("salaryAllocationChart"), {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: ["#285747", "#4e876b", "#d88b37", "#ad5e45", "#6d84a2"],
                borderWidth: 2,
                borderColor: "#fffdf8"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom" },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${money(context.raw)}`
                    }
                }
            }
        }
    });
}

function handleRegistration(event) {
    event.preventDefault();

    const name = $("profileName").value.trim();
    const type = $("profileType").value;
    const income = safeNumber($("monthlyIncome").value);
    const householdSize = safeNumber($("householdSize").value);
    const salaryDay = safeNumber($("salaryDay").value);
    const startingBalance = safeNumber($("startingBalance").value);
    const passkey = $("familyPasskey").value;
    const confirmPasskey = $("confirmPasskey").value;

    if (!name) {
        showMessage($("authMessage"), "Please enter your name.", true);
        return;
    }

    if (!["family", "bachelor", "senior"].includes(type)) {
        showMessage($("authMessage"), "Please select a profile type.", true);
        return;
    }

    if (income < 0 || householdSize < 1 || salaryDay < 1 || salaryDay > 31 || startingBalance < 0) {
        showMessage($("authMessage"), "Please check your income, household size, income day and starting balance.", true);
        return;
    }

    if (passkey.length < 4) {
        showMessage($("authMessage"), "Your passkey must contain at least four characters.", true);
        return;
    }

    if (passkey !== confirmPasskey) {
        showMessage($("authMessage"), "The passkeys do not match.", true);
        return;
    }

    if (registerSymbols.length !== 5) {
        showMessage($("authMessage"), "Please select exactly five symbols in order.", true);
        return;
    }

    if (data.profile && !window.confirm("Creating a new profile will replace the existing profile and its saved budget data in this browser. Continue?")) {
        return;
    }

    const language = $("profileLanguage").value || "en";

    data = defaultData();
    data.language = LANGUAGES[language] ? language : "en";
    data.profile = {
        name,
        type,
        monthlyIncome: income,
        householdSize,
        salaryDay,
        startingBalance,
        priorities: $("financialPriorities").value.trim(),
        isHead: $("headConsent").checked,
        passkey,
        symbols: registerSymbols.slice(),
        createdAt: new Date().toISOString()
    };

    if (income > 0) {
        data.transactions.push({
            id: makeId(),
            type: "income",
            category: "Monthly income",
            amount: income,
            date: localDateString(),
            description: "Initial monthly income estimate",
            necessity: "essential",
            isInitialEstimate: true
        });
    }

    saveData();
    $("languageSelect").value = data.language;
    registerSymbols = [];
    showDashboard();
}

function handleLogin(event) {
    event.preventDefault();

    if (!data.profile) {
        showMessage($("authMessage"), "No saved profile was found in this browser. Create a profile first.", true);
        return;
    }

    const name = $("loginName").value.trim();
    const passkey = $("loginPasskey").value;

    if (name.toLocaleLowerCase() !== String(data.profile.name).toLocaleLowerCase()) {
        showMessage($("authMessage"), "Profile name not recognised.", true);
        return;
    }

    if (passkey !== data.profile.passkey) {
        showMessage($("authMessage"), "The passkey is incorrect.", true);
        return;
    }

    if (loginSymbols.length !== 5) {
        showMessage($("authMessage"), "Please select five symbols in order.", true);
        return;
    }

    if (loginSymbols.join("|") !== (data.profile.symbols || []).join("|")) {
        showMessage($("authMessage"), "The symbol pattern does not match.", true);
        return;
    }

    loginSymbols = [];
    showDashboard();
}

function addTransaction(type, event) {
    event.preventDefault();

    const isIncome = type === "income";
    const category = $(isIncome ? "incomeCategory" : "expenseCategory").value.trim();
    const amount = safeNumber($(isIncome ? "incomeAmount" : "expenseAmount").value);
    const date = $(isIncome ? "incomeDate" : "expenseDate").value;
    const description = $(isIncome ? "incomeDescription" : "expenseDescription").value.trim();
    const necessity = isIncome ? "essential" : $("expenseNecessity").value;

    if (!category || !date || amount <= 0) {
        window.alert("Please enter a category, valid date and amount greater than zero.");
        return;
    }

    data.transactions.push({
        id: makeId(),
        type,
        category,
        amount,
        date,
        description,
        necessity
    });

    saveData();
    event.target.reset();
    setDefaultFormDates();
    renderDashboard();
}

function addSavingsGoal(event) {
    event.preventDefault();

    const name = $("savingsGoalName").value.trim();
    const target = safeNumber($("savingsTarget").value);
    const saved = safeNumber($("savingsCurrent").value);
    const deadline = $("savingsDeadline").value;

    if (!name || target <= 0 || saved < 0 || !deadline) {
        window.alert("Please enter a goal name, valid target, saved amount and deadline.");
        return;
    }

    data.goals.push({
        id: makeId(),
        name,
        target,
        saved,
        deadline,
        priority: $("savingsPriority").value
    });

    saveData();
    event.target.reset();
    $("savingsCurrent").value = "0";
    setDefaultFormDates();
    renderSavingsGoals();
}

function renderSavingsGoals() {
    const container = $("savingsGoalsList");

    if (!data.goals.length) {
        container.innerHTML = "<p>Your savings goals will appear here.</p>";
        return;
    }

    container.innerHTML = data.goals.map((goal) => {
        const target = safeNumber(goal.target);
        const saved = safeNumber(goal.saved);
        const percent = target > 0 ? Math.min(100, Math.max(0, saved / target * 100)) : 0;
        const remaining = Math.max(0, target - saved);
        const today = new Date(`${localDateString()}T12:00:00`);
        const deadlineDate = new Date(`${goal.deadline}T12:00:00`);
        const daysLeft = Math.ceil((deadlineDate - today) / 86400000);
        const monthsLeft = Math.max(1, daysLeft / 30.4375);
        const monthlyNeed = remaining / monthsLeft;
        let deadlineText = daysLeft < 0 ? "Deadline passed" : `${daysLeft} day(s) remaining`;

        if (remaining === 0) deadlineText = "Goal completed";

        return `
            <article class="goal-card">
                <div class="goal-meta">
                    <span class="eyebrow">${escapeHTML(goal.priority)} priority</span>
                    <button type="button" class="table-action" data-delete-goal="${escapeHTML(goal.id)}">Delete</button>
                </div>
                <h3>${escapeHTML(goal.name)}</h3>
                <p>${money(saved)} saved of ${money(target)}</p>
                <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
                <div class="goal-meta"><strong>${percent.toFixed(1)}%</strong><span>${escapeHTML(deadlineText)}</span></div>
                <p>Remaining: <strong>${money(remaining)}</strong></p>
                <p>Approximate monthly amount needed: <strong>${money(monthlyNeed)}</strong></p>
                <form class="goal-update-form" data-goal-id="${escapeHTML(goal.id)}">
                    <div class="form-group">
                        <label for="goalUpdate-${escapeHTML(goal.id)}">Update total saved (₹)</label>
                        <input id="goalUpdate-${escapeHTML(goal.id)}" name="saved" type="number" min="0" step="0.01" value="${saved}" required>
                    </div>
                    <button type="submit" class="button button-light">Update progress</button>
                </form>
            </article>
        `;
    }).join("");
}

function updateGoalProgress(event) {
    const form = event.target.closest(".goal-update-form");
    if (!form) return;

    event.preventDefault();

    const goal = data.goals.find((item) => item.id === form.dataset.goalId);
    if (!goal) return;

    const input = form.querySelector("input[name='saved']");
    const saved = safeNumber(input.value);

    if (saved < 0) {
        window.alert("Saved amount cannot be negative.");
        return;
    }

    goal.saved = saved;
    saveData();
    renderSavingsGoals();
}

function handleSalaryPlan(event) {
    event.preventDefault();

    const fields = {
        takeHome: "salaryTakeHome",
        needs: "salaryNeeds",
        savings: "salarySavings",
        debt: "salaryDebt",
        wants: "salaryWants",
        other: "salaryOther"
    };

    const plan = {};
    Object.keys(fields).forEach((key) => {
        plan[key] = safeNumber($(fields[key]).value);
    });

    const total = plan.needs + plan.savings + plan.debt + plan.wants + plan.other;
    const remainder = plan.takeHome - total;

    data.salaryPlan = plan;
    saveData();

    let message = `
        <p><strong>Take-home income:</strong> ${money(plan.takeHome)}</p>
        <p><strong>Total allocated:</strong> ${money(total)}</p>
        <p><strong>Unallocated / overallocated amount:</strong> ${money(remainder)}</p>
    `;

    if (remainder < 0) {
        message += "<p>Your allocations exceed your take-home income. Review the amounts before relying on this plan.</p>";
    } else if (remainder > 0) {
        message += "<p>You have money not yet allocated. You can leave it as a buffer or assign it to a priority.</p>";
    } else {
        message += "<p>Your allocations equal your take-home income.</p>";
    }

    $("salaryPlannerResult").innerHTML = message;
    renderSalaryChart();
}

function addDebt(event) {
    event.preventDefault();

    const name = $("debtName").value.trim();
    const balance = safeNumber($("debtBalance").value);
    const interest = safeNumber($("debtInterest").value);
    const minimum = safeNumber($("debtMinimum").value);
    const extra = safeNumber($("debtExtra").value);

    if (!name || balance <= 0 || interest < 0 || minimum <= 0 || extra < 0) {
        window.alert("Please enter a debt name, positive balance and payment, and valid interest rate.");
        return;
    }

    data.debts.push({
        id: makeId(),
        name,
        balance,
        interest,
        minimum,
        extra
    });

    saveData();
    event.target.reset();
    $("debtExtra").value = "0";
    renderDebts();
}

function estimateDebt(debt) {
    let balance = safeNumber(debt.balance);
    const annualRate = safeNumber(debt.interest) / 100;
    const monthlyRate = annualRate / 12;
    const payment = safeNumber(debt.minimum) + safeNumber(debt.extra);

    if (payment <= 0) {
        return {
            months: null,
            interest: null,
            reason: "A positive monthly payment is required."
        };
    }

    if (monthlyRate > 0 && payment <= balance * monthlyRate) {
        return {
            months: null,
            interest: null,
            reason: "The payment may not cover the monthly interest."
        };
    }

    let months = 0;
    let interestPaid = 0;

    while (balance > 0.01 && months < 1200) {
        const interest = balance * monthlyRate;
        interestPaid += interest;
        balance += interest;
        balance -= Math.min(balance, payment);
        months += 1;
    }

    if (balance > 0.01) {
        return {
            months: null,
            interest: null,
            reason: "The payoff estimate exceeded the calculation limit."
        };
    }

    return {
        months,
        interest: interestPaid,
        reason: ""
    };
}

function renderDebts() {
    const container = $("debtList");

    if (!data.debts.length) {
        container.innerHTML = "<p>No debts added yet.</p>";
        $("debtPlannerResult").textContent = "Add a debt to estimate repayment.";
        return;
    }

    const estimates = data.debts.map((debt) => ({
        debt,
        estimate: estimateDebt(debt)
    }));

    const monthlyPayments = data.debts.reduce((sum, debt) => {
        return sum + safeNumber(debt.minimum) + safeNumber(debt.extra);
    }, 0);

    const totalBalance = data.debts.reduce((sum, debt) => {
        return sum + safeNumber(debt.balance);
    }, 0);

    const validEstimates = estimates
        .map((item) => item.estimate.months)
        .filter((months) => months !== null);

    const longestMonths = validEstimates.length
        ? Math.max(...validEstimates)
        : null;

    $("debtPlannerResult").innerHTML = `
        <p><strong>Total recorded debt:</strong> ${money(totalBalance)}</p>
        <p><strong>Combined planned monthly payments:</strong> ${money(monthlyPayments)}</p>
        <p><strong>Longest individual estimated payoff:</strong> ${longestMonths === null ? "Not available for all debts" : `${longestMonths} month(s)`}</p>
        <p>These estimates do not include lender fees, variable rates, missed payments or changes in payment terms.</p>
    `;

    container.innerHTML = estimates.map(({ debt, estimate }) => `
        <article class="goal-card">
            <div class="goal-meta">
                <span class="eyebrow">${safeNumber(debt.interest).toFixed(2)}% annual interest</span>
                <button type="button" class="table-action" data-delete-debt="${escapeHTML(debt.id)}">Delete</button>
            </div>
            <h3>${escapeHTML(debt.name)}</h3>
            <p>Outstanding: <strong>${money(debt.balance)}</strong></p>
            <p>Planned monthly payment: <strong>${money(safeNumber(debt.minimum) + safeNumber(debt.extra))}</strong></p>
            ${estimate.months === null
                ? `<p>${escapeHTML(estimate.reason)}</p>`
                : `<p>Estimated payoff time: <strong>${estimate.months} month(s)</strong></p><p>Estimated interest over payoff: <strong>${money(estimate.interest)}</strong></p>`
            }
            <form class="debt-update-form" data-debt-id="${escapeHTML(debt.id)}">
                <div class="form-grid">
                    <div class="form-group"><label for="debtUpdateBalance-${escapeHTML(debt.id)}">Update balance (₹)</label><input id="debtUpdateBalance-${escapeHTML(debt.id)}" name="balance" type="number" min="0" step="0.01" value="${safeNumber(debt.balance)}" required></div>
                    <div class="form-group"><label for="debtUpdateExtra-${escapeHTML(debt.id)}">Extra monthly payment (₹)</label><input id="debtUpdateExtra-${escapeHTML(debt.id)}" name="extra" type="number" min="0" step="0.01" value="${safeNumber(debt.extra)}" required></div>
                </div>
                <button class="button button-light" type="submit">Update debt</button>
            </form>
        </article>
    `).join("");
}

function updateDebt(event) {
    const form = event.target.closest(".debt-update-form");
    if (!form) return;

    event.preventDefault();

    const debt = data.debts.find((item) => item.id === form.dataset.debtId);
    if (!debt) return;

    const balance = safeNumber(form.elements.balance.value);
    const extra = safeNumber(form.elements.extra.value);

    if (balance < 0 || extra < 0) {
        window.alert("Debt amounts cannot be negative.");
        return;
    }

    debt.balance = balance;
    debt.extra = extra;

    saveData();
    renderDebts();
}

function simulateExpense(event) {
    event.preventDefault();

    const name = $("whatIfName").value.trim();
    const amount = safeNumber($("whatIfAmount").value);
    const balance = safeNumber($("whatIfBudget").value);

    if (!name || amount < 0 || balance < 0) {
        window.alert("Please enter a name and valid non-negative amounts.");
        return;
    }

    const after = balance - amount;
    let advice = "";

    if (after < 0) {
        advice = "This expense is larger than the available balance. Consider reducing or postponing it, reviewing flexible spending, or identifying a safe funding source before committing.";
    } else if (after === 0) {
        advice = "This expense would use the entire available balance. Check whether essential bills and upcoming commitments are already covered.";
    } else {
        advice = "The expense fits within the balance you entered, but check upcoming bills, savings commitments and emergency needs before deciding.";
    }

    $("whatIfResult").innerHTML = `
        <p><strong>Scenario:</strong> ${escapeHTML(name)}</p>
        <p><strong>Current balance:</strong> ${money(balance)}</p>
        <p><strong>After the expense:</strong> ${money(after)}</p>
        <p>${escapeHTML(advice)}</p>
    `;
}

function startChallenge(event) {
    event.preventDefault();

    const days = safeNumber($("challengeDays").value);
    const dailyTarget = safeNumber($("challengeDailyTarget").value);
    const reward = $("challengeReward").value.trim();

    if (days < 1 || days > 365 || dailyTarget < 0 || !reward) {
        window.alert("Please enter a challenge between 1 and 365 days, a valid limit and a reward.");
        return;
    }

    data.challenge = {
        id: makeId(),
        startDate: localDateString(),
        days,
        dailyTarget,
        reward,
        successfulDays: 0
    };

    saveData();
    renderChallenge();
}

function renderChallenge() {
    const challenge = data.challenge;

    if (!challenge) {
        $("challengeResult").textContent = "Choose your challenge length and reward to get started.";
        $("challengeProgressButton").disabled = true;
        return;
    }

    $("challengeProgressButton").disabled = false;

    const start = new Date(`${challenge.startDate}T12:00:00`);
    const today = new Date(`${localDateString()}T12:00:00`);
    const elapsed = Math.max(0, Math.floor((today - start) / 86400000) + 1);
    const finished = elapsed > challenge.days;
    const remaining = Math.max(0, challenge.days - Math.min(elapsed, challenge.days));
    const successful = Math.min(challenge.days, safeNumber(challenge.successfulDays));
    const progress = Math.min(100, successful / challenge.days * 100);
    const rewardText = finished
        ? (successful >= challenge.days ? "Challenge completed! Enjoy your planned reward." : "The challenge period has ended. Review your progress and start again if you wish.")
        : `${remaining} day(s) remain in the planned period.`;

    $("challengeResult").innerHTML = `
        <p><strong>Challenge:</strong> ${challenge.days} day(s)</p>
        <p><strong>Reward:</strong> ${escapeHTML(challenge.reward)}</p>
        <p><strong>Successful days recorded:</strong> ${successful} of ${challenge.days}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
        <p>${escapeHTML(rewardText)}</p>
        <p>Optional daily-spending target: ${money(challenge.dailyTarget)}</p>
    `;

    $("challengeProgressButton").disabled = finished || successful >= challenge.days;
}

function recordChallengeDay() {
    if (!data.challenge) {
        window.alert("Start a challenge first.");
        return;
    }

    const start = new Date(`${data.challenge.startDate}T12:00:00`);
    const today = new Date(`${localDateString()}T12:00:00`);
    const elapsed = Math.floor((today - start) / 86400000) + 1;

    if (elapsed > data.challenge.days) {
        window.alert("This challenge period has ended. Start a new challenge to continue.");
        return;
    }

    if (data.challenge.successfulDays >= data.challenge.days) {
        window.alert("You have already recorded enough successful days for this challenge.");
        return;
    }

    data.challenge.successfulDays += 1;
    saveData();
    renderChallenge();
}

function addScheduleItem(event) {
    event.preventDefault();

    const title = $("scheduleTitle").value.trim();
    const date = $("scheduleDate").value;
    const category = $("scheduleCategory").value.trim();
    const amount = safeNumber($("scheduleAmount").value);

    if (!title || !date || !category || amount < 0) {
        window.alert("Please enter a task, date, category and valid amount.");
        return;
    }

    data.schedule.push({
        id: makeId(),
        title,
        date,
        category,
        amount,
        completed: false
    });

    saveData();
    event.target.reset();
    $("scheduleAmount").value = "0";
    setDefaultFormDates();
    renderSchedule();
    renderSuggestions();
}

function renderSchedule() {
    const container = $("scheduleList");

    if (!data.schedule.length) {
        container.innerHTML = "<p>Your reminders will appear here.</p>";
        return;
    }

    const sorted = data.schedule.slice().sort((a, b) => a.date.localeCompare(b.date));

    container.innerHTML = sorted.map((item) => `
        <article class="goal-card">
            <div class="goal-meta">
                <span class="eyebrow">${escapeHTML(item.category)}</span>
                <button type="button" class="table-action" data-delete-schedule="${escapeHTML(item.id)}">Delete</button>
            </div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>Due: <strong>${escapeHTML(item.date)}</strong></p>
            <p>Expected amount: <strong>${money(item.amount)}</strong></p>
            <label class="check-row">
                <input type="checkbox" data-complete-schedule="${escapeHTML(item.id)}" ${item.completed ? "checked" : ""}>
                <span>${item.completed ? "Completed" : "Mark as completed"}</span>
            </label>
        </article>
    `).join("");
}

function handleDelegatedClick(event) {
    const transactionButton = event.target.closest("[data-delete-transaction]");
    if (transactionButton) {
        deleteTransaction(transactionButton.dataset.deleteTransaction);
        return;
    }

    const goalButton = event.target.closest("[data-delete-goal]");
    if (goalButton) {
        if (!window.confirm("Delete this savings goal?")) return;

        data.goals = data.goals.filter((goal) => goal.id !== goalButton.dataset.deleteGoal);
        saveData();
        renderSavingsGoals();
        return;
    }

    const debtButton = event.target.closest("[data-delete-debt]");
    if (debtButton) {
        if (!window.confirm("Delete this debt record?")) return;

        data.debts = data.debts.filter((debt) => debt.id !== debtButton.dataset.deleteDebt);
        saveData();
        renderDebts();
        return;
    }

    const scheduleButton = event.target.closest("[data-delete-schedule]");
    if (scheduleButton) {
        if (!window.confirm("Delete this reminder?")) return;

        data.schedule = data.schedule.filter((item) => item.id !== scheduleButton.dataset.deleteSchedule);
        saveData();
        renderSchedule();
        renderSuggestions();
    }
}

function handleDelegatedChange(event) {
    const checkbox = event.target.closest("[data-complete-schedule]");
    if (!checkbox) return;

    const item = data.schedule.find((entry) => entry.id === checkbox.dataset.completeSchedule);
    if (!item) return;

    item.completed = checkbox.checked;
    saveData();
    renderSchedule();
    renderSuggestions();
}

function updateLanguageFromSelect(event) {
    const language = event.target.value;
    data.language = LANGUAGES[language] ? language : "en";

    saveData();
    updateLanguage();
}

function exportData() {
    try {
        const exportObject = {
            exportedAt: new Date().toISOString(),
            application: "Smart Budget Planner",
            data
        };

        const blob = new Blob([JSON.stringify(exportObject, null, 2)], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `smart-budget-backup-${localDateString()}.json`;

        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        showDataMessage("Backup export started.");
    } catch (error) {
        console.error("Export failed:", error);
        showDataMessage("Unable to export the backup.", true);
    }
}

function clearLocalData() {
    const confirmed = window.confirm(
        "This will delete the saved profile, transactions, goals, debts, schedule and challenge from this browser. Export a backup first if you need one. Continue?"
    );

    if (!confirmed) return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Unable to clear local storage:", error);
    }

    data = defaultData();
    currentUser = false;
    registerSymbols = [];
    loginSymbols = [];

    $("dashboardSection").classList.add("hidden");
    $("logoutButton").classList.add("hidden");
    $("welcomeSection").classList.remove("hidden");
    $("authSection").classList.remove("hidden");

    $("registerForm").reset();
    $("loginForm").reset();

    $("monthlyIncome").value = "0";
    $("householdSize").value = "1";
    $("salaryDay").value = "1";
    $("startingBalance").value = "0";

    renderSymbolGrid("registerSymbolGrid", registerSymbols, "registerSymbolStatus");
    renderSymbolGrid("loginSymbolGrid", loginSymbols, "loginSymbolStatus");

    $("languageSelect").value = "en";
    $("profileLanguage").value = "en";

    showMessage($("authMessage"), "Local budget data cleared.");
    showDataMessage("Local budget data cleared.");
}

function bindEvents() {
    $("registerTab").addEventListener("click", () => switchAuthTab("register"));
    $("loginTab").addEventListener("click", () => switchAuthTab("login"));

    $("registerForm").addEventListener("submit", handleRegistration);
    $("loginForm").addEventListener("submit", handleLogin);

    $("incomeForm").addEventListener("submit", (event) => addTransaction("income", event));
    $("expenseForm").addEventListener("submit", (event) => addTransaction("expense", event));

    $("savingsForm").addEventListener("submit", addSavingsGoal);
    $("salaryPlannerForm").addEventListener("submit", handleSalaryPlan);
    $("debtForm").addEventListener("submit", addDebt);
    $("whatIfForm").addEventListener("submit", simulateExpense);
    $("challengeForm").addEventListener("submit", startChallenge);
    $("scheduleForm").addEventListener("submit", addScheduleItem);

    $("challengeProgressButton").addEventListener("click", recordChallengeDay);
    $("logoutButton").addEventListener("click", logout);
    $("refreshDashboardButton").addEventListener("click", renderDashboard);
    $("exportDataButton").addEventListener("click", exportData);
    $("clearDataButton").addEventListener("click", clearLocalData);

    $("budgetMonth").addEventListener("change", renderDashboard);
    $("languageSelect").addEventListener("change", updateLanguageFromSelect);

    $("profileLanguage").addEventListener("change", (event) => {
        const language = event.target.value;
        $("languageSelect").value = language;
    });

    document.querySelectorAll(".nav-button[data-target]").forEach((button) => {
        button.addEventListener("click", () => setActivePanel(button.dataset.target));
    });

    document.addEventListener("click", handleDelegatedClick);
    document.addEventListener("change", handleDelegatedChange);

    $("savingsGoalsList").addEventListener("submit", updateGoalProgress);
    $("debtList").addEventListener("submit", updateDebt);

    $("whatIfBudget").addEventListener("focus", () => {
        if ($("whatIfBudget").dataset.autoFilled !== "true") {
            $("whatIfBudget").value = Math.max(0, availableBalance()).toFixed(2);
            $("whatIfBudget").dataset.autoFilled = "true";
        }
    });
}

function initialise() {
    renderSymbolGrid("registerSymbolGrid", registerSymbols, "registerSymbolStatus");
    renderSymbolGrid("loginSymbolGrid", loginSymbols, "loginSymbolStatus");

    $("budgetMonth").value = currentMonthString();
    $("languageSelect").value = getLanguage();
    $("profileLanguage").value = getLanguage();

    setDefaultFormDates();
    bindEvents();
    updateLanguage();

    if (data.profile) {
        $("loginName").value = data.profile.name || "";
        switchAuthTab("login");
    } else {
        switchAuthTab("register");
    }

    if (typeof Chart === "undefined") {
        console.warn("Chart.js is unavailable. Budget forms can still work, but charts will not display.");
    }
}

document.addEventListener("DOMContentLoaded", initialise);
