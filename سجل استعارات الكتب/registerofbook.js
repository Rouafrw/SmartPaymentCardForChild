document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("book-list");
  const borrows = JSON.parse(localStorage.getItem("borrows")) || [];

  const summary = {};

  borrows.forEach(entry => {
    const book = entry.book;
    const key = book.id; 
    if (!summary[key]) {
      summary[key] = {
        name: book.name,
        id: book.id,
        type: book.type,
        count: 1
      };
    } else {
      summary[key].count += 1;
    }
  });

  Object.values(summary).forEach(book => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.id}</td>
      <td>${book.type}</td>
      <td>${book.count} </td>
    `;
    listContainer.appendChild(row);
  });
});
