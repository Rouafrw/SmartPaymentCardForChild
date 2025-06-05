document.addEventListener("DOMContentLoaded", function () {
    let salesBtn = document.getElementById("sales-btn");
    let addEmployeeBtn = document.getElementById("add-employee-btn");
    let rewardsBtn = document.getElementById("rewards-btn");




  salesBtn.addEventListener("click", function () {
    window.location.href = "../صفحةعرض المبيعات/sales_report.html";

});

    addEmployeeBtn.addEventListener("click", function () {
        window.location.href = "../اضافة_موظف/addemployee.html";
    });

    rewardsBtn.addEventListener("click", function () {
        window.location.href = "../الطلاب/المكافآت/student_award.html";
    });
});
