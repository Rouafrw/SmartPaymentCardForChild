document.addEventListener("DOMContentLoaded", function () {
    const salesList = document.getElementById("sales-list");
    const totalSalesElement = document.getElementById("total-sales");

    let salesData = [
        { cardNumber: "12345", date: "2025-05-02", totalPrice: 500 },
        { cardNumber: "67890", date: "2025-05-01", totalPrice: 700 },
        { cardNumber: "11223", date: "2025-04-30", totalPrice: 450 }
    ];

    function renderSales() {
        salesList.innerHTML = "";
        let totalSales = 0;

        salesData.forEach(sale => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${sale.cardNumber}</td>
                <td>${sale.date}</td>
                <td>${sale.totalPrice} SYR</td>
            `;
            salesList.appendChild(row);
            totalSales += sale.totalPrice;
        });

        totalSalesElement.textContent = `${totalSales} SYR`;  
    }

    renderSales();
});
