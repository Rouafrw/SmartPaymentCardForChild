document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.getElementById("book-list");
  const filterBtn = document.getElementById("filter-type");
  const resetBtn = document.getElementById("reset-books");
  let books = JSON.parse(localStorage.getItem("books")) || [];

  function getPrice(type) {
    const t = type.trim().toLowerCase();
    if (t === "ترفيهي") return 3000;
    if (t === "تعليمي") return 3300;
    return 2500;
  }

  function getPoints(type) {
    const t = type.trim().toLowerCase();
    if (t === "ترفيهي") return 3;
    if (t === "تعليمي") return 5;
    return 1;
  }

  function getNextId() {
    return books.length > 0
      ? Math.max(...books.map(b => Number(b.id))) + 1
      : 1;
  }

  function renderBooks(list = books) {
    bookList.innerHTML = "";
    list.forEach((book, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price} ل.س</td>
        <td>${book.points}</td>
        <td>${book.type}</td>
        <td><button class="edit" data-index="${index}">✏️تعديل</button></td>
        <td><button class="delete" data-index="${index}">🗑️حذف</button></td>
      `;
      bookList.appendChild(row);
    });

    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      });
    });

    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const book = books[index];
        const newName = prompt("📒 الاسم الجديد:", book.name);
        const newType = prompt("🏷 النوع الجديد:", book.type);

        if (newName && newType) {
          books[index] = {
            ...book,
            name: newName,
            type: newType,
            price: getPrice(newType),
            points: getPoints(newType)
          };
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        }
      });
    });
  }

  document.getElementById("add-book").addEventListener("click", function () {
    const name = prompt("📒 اسم الكتاب:");
    const type = prompt("🏷 نوع الكتاب :");

    if (name && type) {
      const id = getNextId();
      const price = getPrice(type);
      const points = getPoints(type);
      books.push({  id, name,type, price, points });
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    } else {
      alert("⚠️ أدخل كل البيانات المطلوبة");
    }
  });

  filterBtn.addEventListener("click", () => {
    const type = prompt("🏷️ أدخل النوع :");
    if (type) {
      const filtered = books.filter(book => book.type.trim() === type.trim());
      renderBooks(filtered);
    }
  });

  resetBtn.addEventListener("click", () => {
    renderBooks();
  });

  renderBooks();
});
