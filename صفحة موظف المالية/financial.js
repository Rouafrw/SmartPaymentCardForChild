document.addEventListener("DOMContentLoaded", function () {
    let addEmployeeBtn = document.getElementById("request_manger");
    let rewardsBtn = document.getElementById("card_mangers");
    let showEmoloyeeBtn = document.getElementById("process_list");




  

    card_manger.addEventListener("click", function () {
        window.location.href = "../شحن البطاقة/card_manger.html";
    });
     process_list.addEventListener("click", function () {
        window.location.href = "../سجل _المعاملات/process_list.html";
    });
      request_manger.addEventListener("click", function () {
        window.location.href = "../صفحة الاشعارات للمالية/Notices.html";
    });
});
