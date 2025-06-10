document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "sales employee" && password === "1234") {
        window.location.href = "../صفحة-موظف-البيع/sales.html"; 
    } else if (username === "Manger" && password === "1234") {
        window.location.href = "../لوحة-تحكم-الإدارة/manger.html" ;
    } 
    else if (username === "financial employee" && password === "1234") {
        window.location.href = "../صفحة موظف المالية/financial.html" ;
    } 
      else if (username === "library employee" && password === "1234") {
        window.location.href = "../صفحة موظف المكتبة/library.html" ;
    } 
    else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
});