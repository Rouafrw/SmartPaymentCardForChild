document.addEventListener("DOMContentLoaded", function () {
    let productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price} SYR</td>
                <td>${product.points}</td>
                <td><button class="edit" data-index="${index}">✏️ تعديل</button></td>
                <td><button class="delete" data-index="${index}">🗑️ حذف</button></td>
            `;
            productList.appendChild(row);
        });

        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                products.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));
                renderProducts();
            });
        });

        document.querySelectorAll(".edit").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");

                let newName = prompt("📦 أدخل اسم المنتج الجديد:", products[index].name);
                let newQuantity = prompt("🔢 أدخل الكمية الجديدة:", products[index].quantity);
                let newPrice = prompt("💰 أدخل السعر الجديد:", products[index].price);
                let newPoints = prompt("🏆 أدخل عدد النقاط الجديدة:", products[index].points);

                if (newName && newQuantity && newPrice && newPoints && !isNaN(newQuantity) && !isNaN(newPrice) && !isNaN(newPoints)) {
                    products[index] = { name: newName, quantity: newQuantity, price: newPrice, points: newPoints };
                    localStorage.setItem("products", JSON.stringify(products));
                    renderProducts();
                } else {
                    alert("⚠️ أدخل بيانات صحيحة!");
                }
            });
        });
    }

    document.getElementById("add-product").addEventListener("click", function () {
        let name = prompt("📦 أدخل اسم المنتج:");
        let quantity = prompt("🔢 أدخل الكمية:");
        let price = prompt("💰 أدخل سعر المنتج:");
        let points = prompt("🏆 أدخل عدد النقاط:");

        if (name && quantity && price && points && !isNaN(quantity) && !isNaN(price) && !isNaN(points)) {
            products.push({ name, quantity, price, points });
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
        } else {
            alert("⚠️ أدخل بيانات صحيحة!");
        }
    });

    renderProducts();
});
