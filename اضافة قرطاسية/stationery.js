document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("stationery-list");
  const addBtn = document.getElementById("add-item");
  const resetBtn = document.getElementById("reset-list");
  const sortPriceBtn = document.getElementById("sort-price");
  const sortPointsBtn = document.getElementById("sort-points");

  let stationery = JSON.parse(localStorage.getItem("stationery")) || [];

  function generateUniqueId() {
    const ids = stationery.map(s => parseInt(s.id)).filter(id => !isNaN(id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  function renderItems(items = stationery) {
    list.innerHTML = "";
    items.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price} ل.س</td>
        <td>${item.points}</td>
        <td><button class="edit" data-index="${index}">✏️تعديل</button></td>
        <td><button class="delete" data-index="${index}">🗑️حذف</button></td>
      `;
      list.appendChild(row);
    });

    document.querySelectorAll(".edit").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        const item = stationery[i];
        const newName = prompt("📌 الاسم الجديد:", item.name);
        const newPrice = prompt("💰 السعر الجديد:", item.price);
        const newPoints = prompt("🏆 النقاط الجديدة:", item.points);

        if (newName && newPrice && newPoints) {
          stationery[i] = {
            ...item,
            name: newName,
            price: Number(newPrice),
            points: Number(newPoints)
          };
          localStorage.setItem("stationery", JSON.stringify(stationery));
          renderItems();
        }
      };
    });

    document.querySelectorAll(".delete").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        if (confirm("🗑️ حذف المنتج؟")) {
          stationery.splice(i, 1);
          localStorage.setItem("stationery", JSON.stringify(stationery));
          renderItems();
        }
      };
    });
  }

  addBtn.onclick = () => {
    const name = prompt("📌 اسم المنتج:");
    const price = prompt("💰 السعر:");
    const points = prompt("🏆 النقاط:");

    if (name && price && points) {
      const id = generateUniqueId();
      stationery.push({ id, name, price: Number(price), points: Number(points) });
      localStorage.setItem("stationery", JSON.stringify(stationery));
      renderItems();
    } else {
      alert("⚠️ أدخل كل الحقول!");
    }
  };

  resetBtn.onclick = () => renderItems();

  sortPriceBtn.onclick = () => {
    const sorted = [...stationery].sort((a, b) => b.price - a.price);
    renderItems(sorted);
  };

  sortPointsBtn.onclick = () => {
    const sorted = [...stationery].sort((a, b) => b.points - a.points);
    renderItems(sorted);
  };

  renderItems();
});
