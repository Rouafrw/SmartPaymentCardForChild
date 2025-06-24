document.addEventListener("DOMContentLoaded", function () {
  const borrowList = document.getElementById("book-list");
  let borrows = JSON.parse(localStorage.getItem("borrows")) || [];
  const children = JSON.parse(localStorage.getItem("children")) || [];
  const books = JSON.parse(localStorage.getItem("books")) || [];

  function renderBorrows(list = borrows) {
    borrowList.innerHTML = "";
    list.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.student.name}</td>
        <td>${entry.student.id}</td>
        <td>${entry.student.fathername}</td>
        <td>${entry.student.parentname}</td>
        <td>${entry.student.educationLevel}</td>
        <td>${entry.book.name}</td>
        <td>${entry.book.id}</td>
        <td>${entry.book.price} ل.س</td>
        <td>${entry.book.points}</td>
        <td>${entry.book.type}</td>
        <td><button class="edit" data-index="${index}">✏️تعديل</button></td>
        <td><button class="delete" data-index="${index}">🗑️حذف</button></td>
      `;
      borrowList.appendChild(row);
    });

    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        borrows.splice(index, 1);
        localStorage.setItem("borrows", JSON.stringify(borrows));
        renderBorrows();
      });
    });

    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const old = borrows[index];
        const newStudentName = prompt("👦 اسم الطالب الجديد:", old.student.name);
        const newBookName = prompt("📘 اسم الكتاب الجديد:", old.book.name);

        const student = children.find(c => c.name === newStudentName);
        const book = books.find(b => b.name === newBookName);

        if (student && book) {
          borrows[index] = { student, book };
          localStorage.setItem("borrows", JSON.stringify(borrows));
          renderBorrows();
        } else {
          alert("⚠️ لم يتم العثور على الطالب أو الكتاب.");
        }
      });
    });
  }

  document.getElementById("add-book").addEventListener("click", function () {
    const studentName = prompt("👦 اسم الطالب:");
    const bookName = prompt("📘 اسم الكتاب:");

    const student = children.find(c => c.name === studentName);
    const book = books.find(b => b.name === bookName);

    if (student && book) {
      borrows.push({ student, book });
      localStorage.setItem("borrows", JSON.stringify(borrows));
      renderBorrows();
    } else {
      alert("⚠️ لم يتم العثور على الطالب أو الكتاب.");
    }
  });

  document.getElementById("filter-student").addEventListener("click", () => {
    const name = prompt("👦 أدخل اسم الطالب:");
    if (name) {
      const filtered = borrows.filter(b => b.student.name === name);
      renderBorrows(filtered);

      const totalPoints = filtered.reduce((sum, b) => sum + Number(b.book.points || 0), 0);
      alert(`✅ مجموع النقاط المكتسبة للطالب ${name}: ${totalPoints}`);
    }
  });

  document.getElementById("filter-book").addEventListener("click", () => {
    const name = prompt("📘 أدخل اسم الكتاب:");
    if (name) {
      const filtered = borrows.filter(b => b.book.name === name);
      renderBorrows(filtered);
    }
  });

  document.getElementById("filter-type").addEventListener("click", () => {
    const type = prompt("🏷️ أدخل نوع الكتاب:");
    if (type) {
      const filtered = borrows.filter(b => b.book.type === type);
      renderBorrows(filtered);
    }
  });

  document.getElementById("reset-list").addEventListener("click", () => {
    renderBorrows();
  });

  renderBorrows();
});
