document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const currentTotalDisplay = document.getElementById("current-total");
    const maxLimitDisplay = document.getElementById("max-limit");
    const numoftrnc = document.getElementById("numoftrnc");
    const transactionNumberDisplay = document.getElementById("transaction-number");
    const completeSaleBtn = document.createElement("button");

    let studentLimit = null;
    let restrictedProducts = [];
    let transactionNumber = null;
    let studentId = null;
    let products = [];
    let totalAmount = 0;

    // زر "إتمام البيع"
    completeSaleBtn.textContent = "✅ إتمام البيع";
    completeSaleBtn.id = "complete-sale";
    document.body.appendChild(completeSaleBtn);

    // تحديد رقم العملية وربطها برقم الطالب واسترجاع الحد الأقصى المحدد له
    numoftrnc.addEventListener("click", function () {
        if (!transactionNumber) {
            transactionNumber = prompt("📝 أدخل رقم العملية:");
            studentId = prompt("🔢 أدخل رقم الطالب:");
            let studentData = JSON.parse(localStorage.getItem("students")) || {};

            if (studentData[studentId]) {
                studentLimit = studentData[studentId].maxLimit;
                restrictedProducts = studentData[studentId].restrictedProducts || [];
                maxLimitDisplay.textContent = studentLimit;  
                transactionNumberDisplay.textContent = transactionNumber;  
                alert(`🔢 رقم الطالب: ${studentId}, الحد الأقصى: ${studentLimit} SYR`);
            } else {
                alert("⚠️ رقم الطالب غير موجود أو لا يحتوي على بيانات!");
                transactionNumber = null;
            }
        } else {
            alert(`🔢 رقم العملية الحالي: ${transactionNumber}`);
        }
    });

    function updateTotalAmount() {
        totalAmount = products.reduce((sum, product) => sum + product.price, 0);
        currentTotalDisplay.textContent = totalAmount;
    }

    function renderProducts() {
        productList.innerHTML = "";
        updateTotalAmount();
        products.forEach((product, index) => {
            let isRestricted = restrictedProducts.includes(product.name);
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} SYR</td>
                <td style="color: ${isRestricted ? 'red' : 'green'};">${isRestricted ? "❌ غير مسموح" : "✅ متاح"}</td>
                <td class="edit-product" data-index="${index}">✏️ تعديل</td>
                <td class="delete-product" data-index="${index}">🗑️ حذف</td>
            `;
            productList.appendChild(row);
        });

        document.querySelectorAll(".delete-product").forEach(item => {
            item.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                if (restrictedProducts.includes(products[index].name)) {
                    alert(`⚠️ لا يمكن حذف هذا المنتج! المنتج "${products[index].name}" مستبعد من قبل الأهل.`);
                } else {
                    products.splice(index, 1);
                    renderProducts();
                }
            });
        });

        document.querySelectorAll(".edit-product").forEach(item => {
            item.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                let newName = prompt("📦 أدخل الاسم الجديد:", products[index].name);
                let newPrice = prompt("💰 أدخل السعر الجديد:", products[index].price);

                if (newName && newPrice && !isNaN(newPrice) && newPrice.trim() !== "") {
                    products[index].name = newName;
                    products[index].price = parseFloat(newPrice);
                    renderProducts();
                } else {
                    alert("⚠️ أدخل بيانات صحيحة!");
                }
            });
        });
    }

    document.getElementById("add-product").addEventListener("click", function () {
        if (!transactionNumber) {
            alert("⚠️ يجب أولاً تحديد رقم العملية عبر الزر 📝 رقم العملية!");
            return;
        }

        let productName = prompt("📦 أدخل اسم المنتج:");
        let productPrice = prompt("💰 أدخل سعر المنتج:");

        if (productName && productPrice && !isNaN(productPrice) && productPrice.trim() !== "") {
            let price = parseFloat(productPrice);
            let newTotal = totalAmount + price;

            if (studentLimit !== null && newTotal > studentLimit) {
                alert(`🚨 لا يمكن إضافة المنتج! إجمالي الفاتورة بعد الإضافة سيكون ${newTotal} SYR، بينما الحد الأقصى المسموح للطالب هو ${studentLimit} SYR.`);
                return;
            }

            let isRestricted = restrictedProducts.includes(productName);
            products.push({ name: productName, price, status: isRestricted ? "❌ غير مسموح" : "✅ متاح" });
            renderProducts();
        } else {
            alert("⚠️ أدخل بيانات صحيحة!");
        }
    });

    // تسجيل المبيعات عند إتمام البيع
    completeSaleBtn.addEventListener("click", function () {
        if (!transactionNumber || products.length === 0) {
            alert("⚠️ يجب إدخال رقم العملية وإضافة منتجات قبل إتمام البيع!");
            return;
        }

        let saleRecord = {
            transactionNumber: transactionNumber,
            totalPrice: totalAmount,
            saleDate: new Date().toLocaleDateString()
        };

        let salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
        salesHistory.push(saleRecord);
        localStorage.setItem("salesHistory", JSON.stringify(salesHistory));

        alert("✅ تم تسجيل العملية بنجاح!");
        products = [];
        totalAmount = 0;
        updateTotalAmount();
        renderProducts();
    });

    renderProducts();
});
