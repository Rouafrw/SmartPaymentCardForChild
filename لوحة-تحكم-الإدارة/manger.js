document.addEventListener("DOMContentLoaded", function () {
  const addEmployeeBtn = document.getElementById("add-employee-btn");
  const showEmployeeBtn = document.getElementById("show-employee-btn");
  const addChildBtn = document.getElementById("add-child-btn");
  const childRegisterBtn = document.getElementById("child-register-btn");
  const registerBookBtn = document.getElementById("register-book-btn");
  const rewardsBtn = document.getElementById("rewards-btn");
   let showEmoloyeeBtn = document.getElementById("process_list");

  addEmployeeBtn.addEventListener("click", () => {
    window.location.href = "../اضافة_موظف/addemployee.html";
  });

  showEmployeeBtn.addEventListener("click", () => {
    window.location.href = "../عرض معلومات الموظفين/show_employee.html";
  });

  addChildBtn.addEventListener("click", () => {
    window.location.href = "../اضافة طفل/add_child.html";
  });

  childRegisterBtn.addEventListener("click", () => {
    window.location.href = "../سجل الطلاب/childregester.html";
  });

  registerBookBtn.addEventListener("click", () => {
    window.location.href = "../سجل استعارات الكتب/registerofbook.html";
  });

  process_list.addEventListener("click", function () {
        window.location.href = "../سجل _المعاملات/process_list.html";
    });
});
