const students = JSON.parse(localStorage.getItem("children")) || [];
const cards = JSON.parse(localStorage.getItem("cards")) || [];

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (!name) {
    alert("❌ لم يتم تحديد طالب.");
    return;
  }

  const card = cards.find(c => c.name.trim() === name.trim());
  const student = students.find(s => s.name.trim() === name.trim());

  if (!card || !student) {
    alert("🚫 الطالب غير موجود.");
    return;
  }

  document.getElementById("name").textContent = student.name;
//   document.getElementById("father").textContent = student.fathername;
  document.getElementById("mother").textContent = student.parentname;
  document.getElementById("level").textContent = student.educationLevel;
  document.getElementById("id").textContent = student.id;
  document.getElementById("cardNumber").textContent = card.cardNumber;

  JsBarcode("#barcode", card.cardNumber, {
    format: "CODE128",
    width: 2,
    height: 50,
    displayValue: false
  });

  setTimeout(() => {
    html2canvas(document.getElementById("card")).then(canvas => {
      const win = window.open("", "", "width=400,height=600");
      win.document.write("<title>بطاقة الطالب</title>");
      win.document.body.appendChild(canvas);
      win.print();
    });
  }, 500);
};
