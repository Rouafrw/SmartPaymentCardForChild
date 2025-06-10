document.addEventListener("DOMContentLoaded", function () {
    let transactionList = document.getElementById("transaction-list");
    let transactions = JSON.parse(localStorage.getItem("cards")) || [];

    function renderTransactions() {
        transactionList.innerHTML = "";
        transactions.forEach((transaction, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.name}</td>
                <td>${transaction.id}</td>
                <td>${transaction.cardNumber}</td>
                <td>${transaction.balance} SYR</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td>${transaction.status || " مفعلة"}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    renderTransactions();
});
