document.addEventListener("DOMContentLoaded", () => {
    const employeeList = document.getElementById("employee-list");
   
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


});
