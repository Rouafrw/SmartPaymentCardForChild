document.addEventListener("DOMContentLoaded", function () {
    const salesReportList = document.getElementById("sales-report");
    let salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];

    function renderSalesReport() {
        salesReportList.innerHTML = "";
        salesHistory.forEach((sale) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${sale.transactionNumber}</td>
                <td>${sale.totalPrice} SYR</td>
                <td>${sale.saleDate}</td>
            `;
            salesReportList.appendChild(row);
        });
    }

    renderSalesReport();
});
