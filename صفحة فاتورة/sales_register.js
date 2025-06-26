const sales = JSON.parse(localStorage.getItem("sales")) || [];
const tbody = document.getElementById("sales-body");

sales
  .filter(s => s.student && s.serial)
  .forEach(sale => {
    const row = document.createElement("tr");

    const productDetails = Array.isArray(sale.products)
      ? sale.products.map(p => `${p.name} × ${p.quantity}`).join("<br>")
      : "—";

    row.innerHTML = `
      <td>${sale.serial}</td>
      <td>${sale.student}</td>
      <td>${sale.cardNumber || "—"}</td>
      <td>${productDetails}</td>
      <td>${sale.paymentType} (${sale.total})</td>
      <td>${sale.date}</td>
      <td>${sale.time}</td>
    `;
    tbody.appendChild(row);
  });
