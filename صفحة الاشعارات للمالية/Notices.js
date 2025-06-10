document.addEventListener("DOMContentLoaded", function () {
    let notificationContainer = document.getElementById("notification-container");
    let children = JSON.parse(localStorage.getItem("children")) || [];

    let receivedNotifications = [
        { studentName: "محمد مشهور", parentName: "اسماء", educationLevel: "الصف الثاني" },
        { studentName: "أحمد علي", parentName: "فاطمة", educationLevel: "الصف الثاني" },
        { studentName: "معتز المشهور", parentName: "اسماء", educationLevel: "الصف الثاني" }
     , { studentName: "مناف مشهور", parentName: "اسماء", educationLevel: "الصف الثاني" },

    ];

    function validateStudent(name, parent, level) {
        return children.some(child =>
            child.name === name &&
            child.parentname === parent &&
            child.educationLevel === level
        );
    }

    function createNotification(notification) {
        let card = document.createElement("div");
        card.className = "notification-card";

        card.innerHTML = `
            <div class="notification-info">
                <p>🧑🏻👧🏻 <strong>الطالب:</strong> ${notification.studentName}</p>
                <p>👩🏻 <strong>الأم:</strong> ${notification.parentName}</p>
                <p>📒 <strong>المستوى التعليمي:</strong> ${notification.educationLevel}</p>
            </div>
            <div class="actions">
                <button class="process">✅ معالجة</button>
                <button class="reject">❌ حذف الإشعار</button>
            </div>
        `;

        notificationContainer.appendChild(card);

        card.querySelector(".process").addEventListener("click", function () {
            if (validateStudent(notification.studentName, notification.parentName, notification.educationLevel)) {
                let confirmation = confirm("✅ المعلومات صحيحة، هل تريد المتابعة إلى صفحة شحن البطاقة؟");
                if (confirmation) {
                    window.location.href = "../شحن البطاقة/card_manger.html";
                    card.querySelector(".done").style.display = "inline-block"; 
                }
            } else {
                alert("❌ الطلب مرفوض! البيانات غير صحيحة.");
            }
        });

        card.querySelector(".reject").addEventListener("click", function () {
            notificationContainer.removeChild(card);
        });

    }

    receivedNotifications.forEach(createNotification);
});
