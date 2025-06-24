document.addEventListener("DOMContentLoaded", () => {
    const employeeList = document.getElementById("employee-list");
    const filterBtn = document.getElementById("filter-btn");
    const resetBtn = document.getElementById("reset-btn");

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    function render(list) {
        employeeList.innerHTML = "";

        list.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.id}</td>
                <td>${employee.type}</td>
                <td>${employee.salary || employee.balance} ل.س</td>
            `;
            employeeList.appendChild(row);
        });
    }

    render(employees);

    filterBtn.addEventListener("click", () => {
        const role = prompt("💼 أدخل نوع الوظيفة (مالية / بيع / مكتبة):");
        if (role) {
            const filtered = employees.filter(emp => emp.type === role.trim());
            render(filtered);
        }
    });

    resetBtn.addEventListener("click", () => {
        render(employees);
    });
});
