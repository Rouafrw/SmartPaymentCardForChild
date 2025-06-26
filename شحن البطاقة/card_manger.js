let children = JSON.parse(localStorage.getItem("children")) || [];
let cards = JSON.parse(localStorage.getItem("cards")) || [];

function generateValidEAN13() {
  const base = Math.floor(100000000000 + Math.random() * 900000000000).toString();
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(base[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return base + checkDigit;
}

function renderCards() {
  const list = document.getElementById("card-list");
  list.innerHTML = "";

  cards.forEach((card, index) => {
    const barcodeId = `barcode-${card.cardNumber}`;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${card.name}</td>
      <td>${card.parentname}</td>
      <td>${card.level}</td>
      <td>${card.id}</td>
      <td>${card.cardNumber}</td>
      <td><svg id="${barcodeId}"></svg></td>
      <td>${card.balance} ل.س</td>
      <td><button class="edit-btn" onclick="editBalance(${index})">✏️تعديل</button></td>
      <td><button class="delete-btn" onclick="deleteCard(${index})">🗑️حذف</button></td>
      <td><button onclick="printStudentCard(${index})">🖨️طباعة</button></td>
    `;
    list.appendChild(row);

    JsBarcode(`#${barcodeId}`, card.cardNumber, {
      format: "EAN13",
      width: 2,
      height: 50,
      displayValue: false
    });
  });
}

document.getElementById("charge-button").addEventListener("click", () => {
  const name = document.getElementById("student-name").value.trim();
  const balance = document.getElementById("student-balance").value.trim();

  if (!name || !balance || isNaN(balance)) {
    alert("⚠️ أدخل اسم صحيح ورصيد رقمي.");
    return;
  }

  let student = children.find(s => s.name.trim() === name);
  if (!student) {
    if (!confirm("👤 الطالب غير موجود، هل ترغبين بإضافته؟")) return;

    const mother = prompt("👩 اسم الأم:");
    const level = prompt("🎓 المستوى:");
    const newId = children.length > 0 ? Math.max(...children.map(c => Number(c.id))) + 1 : 1;

    if (!mother || !level) {
      alert("⚠️ يجب إدخال كل الحقول!");
      return;
    }

    student = { id: newId, name, parentname: mother, educationLevel: level };
    children.push(student);
    localStorage.setItem("children", JSON.stringify(children));
  }

  const cardNumber = generateValidEAN13();
  const newCard = {
    name: student.name,
    parentname: student.parentname,
    level: student.educationLevel,
    id: student.id,
    balance: Number(balance),
    cardNumber
  };

  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));

  renderCards();
  document.getElementById("student-name").value = "";
  document.getElementById("student-balance").value = "";
});

function editBalance(index) {
  const newBal = prompt("💰 الرصيد الجديد:", cards[index].balance);
  if (newBal && !isNaN(newBal)) {
    cards[index].balance = Number(newBal);
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
  }
}

function deleteCard(index) {
  if (confirm("🗑️ حذف البطاقة؟")) {
    cards.splice(index, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
  }
}

function printStudentCard(index) {
  const card = cards[index];
  const url = new URL("../بطاقة طالب/student_card.html", window.location.href);
  url.searchParams.set("name", card.name);
  url.searchParams.set("parentname", card.parentname);
  url.searchParams.set("level", card.level);
  url.searchParams.set("id", card.id);
  url.searchParams.set("cardNumber", card.cardNumber);
  window.open(url.toString(), "_blank");
}

renderCards();
