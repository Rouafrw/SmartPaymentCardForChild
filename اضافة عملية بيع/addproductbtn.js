const children = JSON.parse(localStorage.getItem("children")) || [];
const cards = JSON.parse(localStorage.getItem("cards")) || [];
const stationery = JSON.parse(localStorage.getItem("stationery")) || [];
let operations = JSON.parse(localStorage.getItem("sales")) || [];

const tableBody = document.querySelector("#product-table tbody");
const productList = [];

const popup = document.getElementById("product-popup");
const select = document.getElementById("product-select");
const qty = document.getElementById("product-qty");

document.getElementById("card-number").addEventListener("change", () => {
  const cardNumber = document.getElementById("card-number").value.trim();
  const card = cards.find(c => c.cardNumber === cardNumber);
  const student = children.find(s => s.id == card?.id);

  if (!card || !student) {
    alert("❌ لا يوجد طالب بهذه البطاقة.");
    return;
  }

  document.getElementById("student-name").value = student.name;
  document.getElementById("student-balance").value = card.balance + " ل.س";
  document.getElementById("max-limit").value = card.maxLimit ? `${card.maxLimit} ل.س` : "غير محدد";

  productList.length = 0;
  tableBody.innerHTML = "";
});

document.getElementById("add-product").onclick = () => {
  select.innerHTML = "";
  stationery.forEach(p => {
    const op = document.createElement("option");
    op.value = p.name;
    op.textContent = `${p.name} (${p.price} ل.س)`;
    select.appendChild(op);
  });
  popup.style.display = "block";
  qty.value = "";
};

document.getElementById("confirm-product").onclick = () => {
  const name = select.value;
  const quantity = Number(qty.value);
  if (!quantity || quantity < 1) return;

  const existing = productList.find(p => p.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    productList.push({ name, quantity });
  }
  popup.style.display = "none";
  renderProducts();
};

function renderProducts() {
  tableBody.innerHTML = "";
  productList.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td><button onclick="decrease(${i})">➖</button></td>
      <td><button onclick="remove(${i})">🗑️</button></td>
    `;
    tableBody.appendChild(row);
  });
}

window.decrease = i => {
  if (productList[i].quantity > 1) {
    productList[i].quantity--;
  } else {
    productList.splice(i, 1);
  }
  renderProducts();
};

window.remove = i => {
  productList.splice(i, 1);
  renderProducts();
};

document.getElementById("generate-invoice").onclick = () => {
  const scannedCard = document.getElementById("card-number").value.trim();
  const card = cards.find(c => c.cardNumber === scannedCard);
  const student = children.find(s => s.id == card?.id);
  const payType = document.getElementById("payment-type").value;

  if (!card || !student || productList.length === 0) {
    alert("⚠️ تأكد من البطاقة والمنتجات.");
    return;
  }

  const serial = operations.length > 0
    ? Math.max(...operations.map(o => o.serial || 0)) + 1
    : 1;
  const now = new Date();
  const date = now.toLocaleDateString("ar-SY");
  const time = now.toLocaleTimeString("ar-SY");

  let total = 0;
  let points = 0;
  const detailed = [];

  const lines = productList.map(item => {
    const p = stationery.find(s => s.name === item.name);
    const q = item.quantity;
    const sub = p.price * q;
    const subPts = p.points * q;

    if (payType === "رصيد") total += sub;
    else points += subPts;

    detailed.push({ name: p.name, quantity: q, subtotal: sub, points: subPts });

    return `<tr><td>${p.name}</td><td>${q}</td><td>${payType === "رصيد" ? `${sub} ل.س` : `${subPts} نقطة`}</td></tr>`;
  });

  if (payType === "رصيد") {
    const max = card.maxLimit || 6000;
    if (total > max) {
      alert(`🚫 تجاوز الحد الأقصى: ${max} ل.س`);
      return;
    }
    if (card.balance < total) {
      alert("💸 الرصيد غير كافٍ!");
      return;
    }
    card.balance -= total;
    localStorage.setItem("cards", JSON.stringify(cards));
  }

  operations.push({
    serial,
    student: student.name,
    studentId: student.id,
    cardNumber: card.cardNumber,
    paymentType: payType,
    total: payType === "رصيد" ? total : points,
    products: detailed,
    date,
    time
  });
  localStorage.setItem("sales", JSON.stringify(operations));

  document.getElementById("invoice-area").innerHTML = `
    <div class="invoice">
      <h2>🧾 فاتورة الطالب</h2>
      <p><strong>الاسم:</strong> ${student.name}</p>
      <p><strong>رقم البطاقة:</strong> ${card.cardNumber}</p>
      <p><strong>طريقة الدفع:</strong> ${payType}</p>
      <p><strong>التاريخ:</strong> ${date} - ${time}</p>
      <table style="width:100%; margin-top:10px;">
        <tr><th>📌 المنتج</th><th>🔢 الكمية</th><th>${payType === "رصيد" ? "💰 السعر" : "🏆 النقاط"}</th></tr>
        ${lines.join("")}
      </table>
      <p style="margin-top:10px;"><strong>الإجمالي:</strong> ${payType === "رصيد" ? `${total} ل.س` : `${points} نقطة`}</p>
    </div>
  `;
  
  setTimeout(() => window.print(), 800);
};
