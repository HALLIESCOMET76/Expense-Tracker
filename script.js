// --- Registration Page (index.html) ---
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        if (localStorage.getItem(newUsername)) {
            alert("Username already exists. Please choose a different username.");
        } else {
            localStorage.setItem(newUsername, JSON.stringify({ password: newPassword, expenses: [] }));
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        }
    });
});

// --- Login Page (login.html) ---
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            localStorage.setItem("currentUser", username);
            alert("Login successful!");
            window.location.href = "main.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});

// --- Main Page (main.html) ---
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const categorySelect = document.getElementById("category-select");
    const amountInput = document.getElementById("amount-input");
    const dateInput = document.getElementById("date-input");
    const addBtn = document.getElementById("add-btn");
    const expenseTableBody = document.getElementById("expense-table-body");
    const totalAmount = document.getElementById("total-amount");

    let userExpenses = [];

    if (currentUser) {
        userExpenses = JSON.parse(localStorage.getItem(currentUser)).expenses;
    }

    const renderExpenses = () => {
        expenseTableBody.innerHTML = "";
        let total = 0;
        userExpenses.forEach((expense, index) => {
            total += parseFloat(expense.amount);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            expenseTableBody.appendChild(row);
        });
        totalAmount.textContent = total.toFixed(2);
    };

    const addExpense = () => {
        const category = categorySelect.value;
        const amount = amountInput.value;
        const date = dateInput.value;

        if (category && amount && date) {
            const expense = { category, amount, date };
            userExpenses.push(expense);

            if (currentUser) {
                localStorage.setItem(currentUser, JSON.stringify({ password: JSON.parse(localStorage.getItem(currentUser)).password, expenses: userExpenses }));
            }

            renderExpenses();
            amountInput.value = "";
            dateInput.value = "";
        } else {
            alert("Please fill in all fields");
        }
    };

    const deleteExpense = (index) => {
        userExpenses.splice(index, 1);

        if (currentUser) {
            localStorage.setItem(currentUser, JSON.stringify({ password: JSON.parse(localStorage.getItem(currentUser)).password, expenses: userExpenses }));
        }

        renderExpenses();
    };

    addBtn.addEventListener("click", addExpense);

    expenseTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            deleteExpense(index);
        }
    });

    renderExpenses();
});




//end of javascript // or we can update for local storage and server attachment!//