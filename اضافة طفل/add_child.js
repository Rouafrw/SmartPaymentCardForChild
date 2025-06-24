document.addEventListener("DOMContentLoaded", function () {
    const childList = document.getElementById("child-list");
    let children = JSON.parse(localStorage.getItem("children")) || [];

    function getNextId() {
        return children.length > 0
            ? Math.max(...children.map(c => Number(c.id))) + 1
            : 1;
    }

    function renderChildren(list = children) {
        childList.innerHTML = "";
        list.forEach((child, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${child.id}</td>
                <td>${child.name}</td>
                <td>${child.fathername}</td>
                <td>${child.parentname}</td>
                <td>${child.educationLevel}</td>
                <td><button class="edit" data-index="${index}">✏️تعديل</button></td>
                <td><button class="delete" data-index="${index}">🗑️حذف</button></td>
            `;
            childList.appendChild(row);
        });

        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                children.splice(index, 1);
                localStorage.setItem("children", JSON.stringify(children));
                renderChildren();
            });
        });

        document.querySelectorAll(".edit").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const child = children[index];

                const newName = prompt("👦 الاسم:", child.name);
                const newFather = prompt("👨 اسم الأب:", child.fathername);
                const newMother = prompt("👩🏻 اسم الأم:", child.parentname);
                const newLevel = prompt("🎓 المستوى التعليمي:", child.educationLevel);

                if (newName && newFather && newMother && newLevel) {
                    children[index] = {
                        ...child,
                        name: newName,
                        fathername: newFather,
                        parentname: newMother,
                        educationLevel: newLevel
                    };
                    localStorage.setItem("children", JSON.stringify(children));
                    renderChildren();
                } else {
                    alert("⚠️ تأكد من إدخال جميع الحقول");
                }
            });
        });
    }

    document.getElementById("add-child").addEventListener("click", function () {
        const name = prompt("👦 اسم الطالب:");
        const fathername = prompt("👨 اسم الأب:");
        const parentname = prompt("👩🏻 اسم الأم:");
        const educationLevel = prompt("🎓 المستوى التعليمي:");

        if (name && fathername && parentname && educationLevel) {
            const id = getNextId();
            children.push({ id, name, fathername, parentname, educationLevel });
            localStorage.setItem("children", JSON.stringify(children));
            renderChildren();
        } else {
            alert("⚠️ أدخل جميع البيانات المطلوبة");
        }
    });

    document.getElementById("filter-education").addEventListener("click", () => {
        const level = prompt("🎯 أدخل الصف");
        if (level) {
            const filtered = children.filter(c => c.educationLevel.trim() === level.trim());
            renderChildren(filtered);
        }
    });

    document.getElementById("reset-list").addEventListener("click", () => {
        renderChildren();
    });

    renderChildren();
});
