const API_URL = "http://localhost:3000/expense";

document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value || new Date().toISOString();

  if (!description || !amount) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, amount, date }),
    });

    if (res.ok) {
      fetchExpenses(); 
      document.getElementById("expense-form").reset();
    } else {
      alert("Erro ao adicionar despesa.");
    }
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
  }
});

const fetchExpenses = async () => {
  try {
    const res = await fetch(API_URL);
    const expenses = await res.json();

    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.description} - R$ ${expense.amount.toFixed(2)} - ${new Date(expense.date).toLocaleDateString()}
        <button onclick="deleteExpense('${expense._id}')">Excluir</button>
      `;
      expenseList.appendChild(li);
    });

    calculateTotal(expenses);
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
  }
};

const calculateTotal = (expenses) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById("total-expenses").textContent = `Total: R$ ${total.toFixed(2)}`;
};

const deleteExpense = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchExpenses();
    else alert("Erro ao excluir despesa.");
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
  }
};


fetchExpenses();
