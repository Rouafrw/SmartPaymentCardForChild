document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "sales employee" && password === "1234") {
        window.location.href = "../صفحة-موظف-البيع/sales.html"; // التأكد من المسار الصحيح
    } else if (username === "Manger" && password === "1234") {
        window.location.href = "../لوحة-تحكم-الإدارة/manger.html" ;
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
});
