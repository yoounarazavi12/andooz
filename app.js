document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register-button");
    const welcomeSection = document.getElementById("welcome-section");
    const registerSection = document.getElementById("register-section");

    const registerForm = document.getElementById("register-form");
    const usernameInput = document.getElementById("username");
    const registerMessage = document.getElementById("register-message");

    const lobbySection = document.getElementById("lobby-section");
    const welcomeUser = document.getElementById("welcome-user");

    // نمایش فرم ثبت‌نام
    registerButton.addEventListener("click", function () {
        welcomeSection.hidden = true;
        registerSection.hidden = false;
    });

    // ثبت‌نام آزمایشی
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();

        if (username.length < 3) {
            registerMessage.textContent = "اسم کاربری باید حداقل ۳ حرف داشته باشد.";
            registerMessage.style.color = "red";
            return;
        }

        localStorage.setItem("andoozUsername", username);

        registerMessage.textContent = "";
        registerSection.hidden = true;
        lobbySection.hidden = false;

        welcomeUser.textContent = `سلام ${username}، خوش اومدی!`;
    });

    // بررسی کاربر قبلی در همین مرورگر
    const savedUsername = localStorage.getItem("andoozUsername");

    if (savedUsername) {
        welcomeSection.hidden = true;
        registerSection.hidden = true;
        lobbySection.hidden = false;

        welcomeUser.textContent = `سلام ${savedUsername}، خوش اومدی!`;
    }
});

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}

