document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let type = document.getElementById("type").value;
    let salary = document.getElementById("salary").value;

    if (name && id && salary) {
        document.getElementById("message").innerText =" ✅تم إضافة الموظف !";
        
        // إعادة تعيين النموذج بالشكل الصحيح
        document.getElementById("employeeForm").reset();
    } else {
        document.getElementById("message").innerText = "❌ يرجى ملء جميع الحقول!";
    }
})
document.addEventListener("DOMContentLoaded", function () {
    let selectElement = document.getElementById("type"); // تأكد من أن لديك القائمة في HTML
    
    selectElement.addEventListener("change", function () {
        this.style.backgroundColor = "#f0f3ed"; // تغيير اللون عند تحديد خيار
        this.style.color = "black"; // جعل النص أبيض لضمان الوضوح
    });
});