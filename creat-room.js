document.addEventListener("DOMContentLoaded", function () {

    const createRoomForm = document.getElementById("create-room-form");
    const roomNameInput = document.getElementById("room-name");
    const roomPasswordInput = document.getElementById("room-password");

    const roomMessage = document.getElementById("room-message");
    const waitingSection = document.getElementById("waiting-section");
    const createdRoomName = document.getElementById("created-room-name");

    createRoomForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const roomName = roomNameInput.value.trim();
        const roomPassword = roomPasswordInput.value;

        if (roomName.length < 3) {
            roomMessage.textContent = "اسم اتاق باید حداقل ۳ حرف داشته باشد.";
            roomMessage.style.color = "red";
            return;
        }

        // ذخیرهٔ آزمایشی اتاق در همین مرورگر
        const room = {
            name: roomName,
            password: roomPassword,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem("andoozRoom", JSON.stringify(room));

        createdRoomName.textContent = roomName;

        createRoomForm.hidden = true;
        roomMessage.textContent = "";
        waitingSection.hidden = false;
    });

});