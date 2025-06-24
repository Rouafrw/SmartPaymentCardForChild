document.addEventListener("DOMContentLoaded", () => {
    const employeeList = document.getElementById("employee-list");
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    function renderEmployees() {
        employeeList.innerHTML = "";
        employees.forEach((employee, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.id}</td>
                <td>${employee.type}</td>
                <td>${employee.salary} ل.س</td>
                <td><button class="edit" data-index="${index}">✏️ تعديل</button></td>
                <td><button class="delete" data-index="${index}">🗑️ حذف</button></td>
            `;
            employeeList.appendChild(row);
        });

        document.querySelectorAll(".delete").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                employees.splice(index, 1);
                localStorage.setItem("employees", JSON.stringify(employees));
                renderEmployees();
            });
        });

        document.querySelectorAll(".edit").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                const current = employees[index];
                const newName = prompt("✏️ أدخل الاسم الجديد:", current.name);
                const newSalary = prompt("💰 أدخل الراتب الجديد:", current.salary);

                if (newName && newSalary && !isNaN(newSalary)) {
                    current.name = newName;
                    current.salary = Number(newSalary);
                    localStorage.setItem("employees", JSON.stringify(employees));
                    renderEmployees();
                } else {
                    alert("⚠️ تأكد من إدخال بيانات صحيحة!");
                }
            });
        });
    }

    // إضافة موظف جديد
    document.getElementById("add-employee").addEventListener("click", () => {
        const name = prompt("🛠️ أدخل اسم الموظف:");
        const type = prompt("💼 أدخل الوظيفة (مالية، بيع، مكتبة):");
        const autoId = generateUniqueId();
        let salary = 0;

        if (type === "مالية") salary = 250000;
        else if (type === "بيع") salary = 200000;
        else if (type === "مكتبة") salary = 180000;
        else return alert("⚠️ نوع الوظيفة غير معروف!");

        if (name) {
            employees.push({ name, id: autoId, type, salary });
            localStorage.setItem("employees", JSON.stringify(employees));
            renderEmployees();
        } else {
            alert("⚠️ يرجى إدخال الاسم");
        }
    });

    function generateUniqueId() {
        let last = Number(localStorage.getItem("lastEmployeeID")) || 0;
        last++;
        localStorage.setItem("lastEmployeeID", last);
        return last;
    }

    renderEmployees();
});
