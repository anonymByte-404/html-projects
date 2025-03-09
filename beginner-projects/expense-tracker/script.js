let expenses = []

function addExpense() {
  const name = document.getElementById("expense-name").value
  const amount = document.getElementById("expense-amount").value

  if (name === "" || amount === "") {
    alert("Please enter valid details!")
    return
  }

  const expense = {
    id: Date.now(),
    name: name,
    amount: parseFloat(amount)
  }

  expenses.push(expense)
  updateUI()
  saveToLocalStorage()
}

function updateUI() {
  const list = document.getElementById("expense-list")
  list.innerHTML = ""

  let total = 0
  expenses.forEach(expense => {
    total += expense.amount
    list.innerHTML += `
            <li>
                ${expense.name} - $${expense.amount.toFixed(2)}
                <button onclick="removeExpense(${expense.id})">❌</button>
            </li>
        `
  })

  document.getElementById("balance").textContent = `$${total.toFixed(2)}`
}

function removeExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id)
  updateUI()
  saveToLocalStorage()
}

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses))
}

function loadFromLocalStorage() {
  const savedExpenses = localStorage.getItem("expenses")
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    updateUI();
  }
}

// Load saved data on page load
window.onload = loadFromLocalStorage;
