document.addEventListener("DOMContentLoaded", function () {
    let childList = document.getElementById("child-list");
    let children = JSON.parse(localStorage.getItem("children")) || [];

    function renderChildren() {
        childList.innerHTML = "";
        children.forEach((child) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${child.id}</td>
                <td>${child.name}</td>
                <td>${child.parentname}</td>
                <td>${child.educationLevel || "غير محدد"}</td>
            `;
            childList.appendChild(row);
        });
    }

    renderChildren();
});
