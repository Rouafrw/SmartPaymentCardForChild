document.addEventListener("DOMContentLoaded", function () {
    let bookbtn = document.getElementById("book-btn");
    let registerofbookbtn = document.getElementById("registerofbook_btn");
    let Processbtn = document.getElementById("process-btn");





bookbtn.addEventListener("click", function () {
    window.location.href = "../اضافة كتاب/addbook.html";
});
    registerofbookbtn.addEventListener("click", function () {
        window.location.href = "../سجل استعارات الكتب/registerofbook.html";

    });
   
    Processbtn.addEventListener("click", function () {
        window.location.href = "../صفحة عملية استعارة/Borrowprocess.html";
    });
   

});

