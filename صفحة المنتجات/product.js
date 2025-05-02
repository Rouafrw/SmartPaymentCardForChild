document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    let products = [
        { name: "منتج 1", price: "100$" },
        { name: "منتج 2", price: "150$" },
        { name: "منتج 3", price: "200$" }
    ];

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><button class="delete-btn" data-index="${index}">حذف</button></td>
            `;
            productList.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                products.splice(index, 1);
                renderProducts();
            });
        });
    }

    document.getElementById("add-product").addEventListener("click", function () {
        let productName = prompt("أدخل اسم المنتج:");
        let productPrice = prompt("أدخل سعر المنتج:");
        if (productName && productPrice) {
            products.push({ name: productName, price: productPrice });
            renderProducts();
        }
    });

    renderProducts();
});