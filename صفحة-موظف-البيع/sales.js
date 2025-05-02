// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll("button").forEach(btn => {
//         btn.addEventListener("click", function () {
//             alert("تم الضغط على " + this.innerText);
//         });
//     });

document.getElementById("products-btn").addEventListener("click", function () {
    window.location.href = "../صفحة-المنتجات/products.html";
});

document.getElementById("transaction-btn").addEventListener("click", function () {
    window.location.href = "../انشاءعمليةالبيع/transaction.html";
});

document.getElementById("sales-report-btn").addEventListener("click", function () {
    window.location.href = "../صفحةعرض المبيعات/sales_report.html";
});