document.addEventListener("DOMContentLoaded", function () {

    const joinRoomForm = document.getElementById("join-room-form");
    const roomNameInput = document.getElementById("join-room-name");
    const roomPasswordInput = document.getElementById("join-room-password");

    const roomMessage = document.getElementById("join-room-message");
    const joinSection = document.getElementById("join-section");
    const joinedSection = document.getElementById("joined-section");
    const joinedRoomName = document.getElementById("joined-room-name");

    joinRoomForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredName = roomNameInput.value.trim();
        const enteredPassword = roomPasswordInput.value;

        // خواندن اتاق آزمایشی ذخیره‌شده در همین مرورگر
        const savedRoomText = localStorage.getItem("andoozRoom");

        if (!savedRoomText) {
            roomMessage.textContent = "اتاقی با این اسم پیدا نشد.";
            roomMessage.style.color = "red";
            return;
        }

        const savedRoom = JSON.parse(savedRoomText);

        // اسم اتاق به حروف بزرگ و کوچک حساس نیست
        const roomNameMatches =
            enteredName.toLowerCase() === savedRoom.name.toLowerCase();

        if (!roomNameMatches) {
            roomMessage.textContent = "رمز یا اسم اتاق اشتباه است.";
            roomMessage.style.color = "red";
            return;
        }

        // بررسی رمز؛ رمز به حروف بزرگ و کوچک حساس است
        if (enteredPassword !== savedRoom.password) {
            roomMessage.textContent = "رمز اشتباه است.";
            roomMessage.style.color = "red";
            return;
        }

        // ورود آزمایشی موفق
        roomMessage.textContent = "";
        joinedRoomName.textContent = savedRoom.name;

        joinSection.hidden = true;
        joinedSection.hidden = false;
    });

});

