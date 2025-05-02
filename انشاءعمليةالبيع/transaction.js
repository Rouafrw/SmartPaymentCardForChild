document.addEventListener("DOMContentLoaded", function () {
    const transactionList = document.getElementById("transaction-list");
    const totalPriceElement = document.getElementById("total-price");

    let transactions = [
        { cardNumber: "1001", date: "2025-05-02", totalPrice: 500 },
        { cardNumber: "1002", date: "2025-05-01", totalPrice: 700 },
    ];

    function renderTransactions() {
        transactionList.innerHTML = "";
        let totalSales = 0;

        transactions.forEach(transaction => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.cardNumber}</td>
                <td>${transaction.date}</td>
                <td>${transaction.totalPrice} SYR</td>
            `;
            transactionList.appendChild(row);
            totalSales += transaction.totalPrice;
        });

        totalPriceElement.textContent = `${totalSales} SYR`;  
    }

    renderTransactions();
});
