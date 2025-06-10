let children = JSON.parse(localStorage.getItem("children")) || [];
let cards = JSON.parse(localStorage.getItem("cards")) || [];

function generateCardNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
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
      format: "CODE128",
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
    // const father = prompt("👨 اسم الأب:");
    const mother = prompt("👩 اسم الأم:");
    const level = prompt("🎓 المستوى التعليمي:");
    const newId = children.length > 0 ? Math.max(...children.map(c => Number(c.id))) + 1 : 1;

    if (!father || !mother || !level) {
      alert("⚠️ يجب إدخال جميع الحقول!");
      return;
    }

    student = {
      id: newId,
      name,
    //   fathername: father,
      parentname: mother,
      educationLevel: level
    };

    children.push(student);
    localStorage.setItem("children", JSON.stringify(children));
    alert("✅ تم إضافة الطالب إلى السجل.");
  }

  const cardNumber = generateCardNumber();
  const newCard = {
    name: student.name,
    // fathername: student.fathername,
    parentname: student.parentname,
    level: student.educationLevel,
    id: student.id,
    balance: Number(balance),
    cardNumber
  };

  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
  alert("✅ تم شحن البطاقة!");
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
  const selected = cards[index];
  const name = encodeURIComponent(selected.name);
  window.open(`../بطاقة طالب/student_card.html?name=${name}`, "_blank");
}

renderCards();
