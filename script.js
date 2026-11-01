/* =====================================
تنظیمات و اطلاعات اولیه
===================================== */

let currentUser = null;
let currentRoom = null;

let board = Array(9).fill("");
let currentPlayer = "X";

let player1 = null;
let player2 = null;

let score1 = 0;
let score2 = 0;

let roundFinished = false;


/* =====================================
مدیریت صفحات
===================================== */

function showPage(pageId) {

document.querySelectorAll(".page").forEach(page => {
page.classList.remove("active");
});

document.getElementById(pageId).classList.add("active");
}


/* =====================================
ثبت نام و آیدی
===================================== */

function registerUser() {

const usernameInput =
document.getElementById("usernameInput");

const error =
document.getElementById("registerError");

const username = usernameInput.value.trim();

error.textContent = "";

if (username.length < 2) {
error.textContent =
"آیدی باید حداقل ۲ حرف داشته باشد.";
return;
}

const users = JSON.parse(
localStorage.getItem("andooz_users") || "[]"
);

const exists = users.some(user =>
user.username.toLowerCase() === username.toLowerCase()
);

if (exists) {
error.textContent =
"این اسم توسط کاربر دیگری انتخاب شده است.";
return;
}

const userId =
Date.now().toString() +
Math.floor(Math.random() * 1000).toString();

const newUser = {
username: username,
userId: userId,
score: 0
};

users.push(newUser);

localStorage.setItem(
"andooz_users",
JSON.stringify(users)
);

localStorage.setItem(
"andooz_current_user",
JSON.stringify(newUser)
);

currentUser = newUser;

updateUserInterface();

showPage("homePage");
}


/* =====================================
نمایش اطلاعات کاربر
===================================== */

function updateUserInterface() {

if (!currentUser) return;

document.getElementById("welcomeTitle").textContent =
سلام ${currentUser.username}، خوش اومدی!;

document.getElementById("homeWelcome").textContent =
سلام ${currentUser.username}، خوش اومدی!;

document.getElementById("userBadge").textContent =
آیدی: ${currentUser.username};
}


/* =====================================
ساخت اتاق
===================================== */

function createRoom() {

const roomName =
document.getElementById("roomNameInput")
.value.trim();

const roomPassword =
document.getElementById("roomPasswordInput")
.value;

const error =
document.getElementById("createError");

error.textContent = "";

if (!roomName) {
error.textContent =
"لطفاً اسم اتاق را وارد کنید.";
return;
}

const rooms = JSON.parse(
localStorage.getItem("andooz_rooms") || "[]"
);

const exists = rooms.some(room =>
room.name.toLowerCase() === roomName.toLowerCase()
);

if (exists) {
error.textContent =
"این اسم اتاق قبلاً انتخاب شده است.";
return;
}

const newRoom = {
name: roomName,
password: roomPassword,
host: currentUser.username,
guest: null,
board: Array(9).fill(""),
currentPlayer: "X",
score1: 0,
score2: 0
};

rooms.push(newRoom);

localStorage.setItem(
"andooz_rooms",
JSON.stringify(rooms)
);

currentRoom = newRoom;

player1 = currentUser.username;
player2 = "در انتظار بازیکن";

showWaitingRoom();
}


/* =====================================
نمایش اتاق انتظار
===================================== */

function showWaitingRoom() {

document.getElementById("waitingRoomName").textContent =
نام اتاق: ${currentRoom.name};

showPage("waitingPage");
}

𐎹:
/* =====================================
ورود به اتاق
===================================== */

function joinRoom() {

const roomName =
document.getElementById("joinRoomName")
.value.trim();

const roomPassword =
document.getElementById("joinRoomPassword")
.value;

const error =
document.getElementById("joinError");

error.textContent = "";

const rooms = JSON.parse(
localStorage.getItem("andooz_rooms") || "[]"
);

const room = rooms.find(room =>
room.name.toLowerCase() === roomName.toLowerCase()
);

if (!room) {

error.textContent =
"رمز یا اسم اتاق اشتباه است.";

return;
}

if (room.password !== roomPassword) {

error.textContent =
"رمز اشتباه است.";

return;
}

if (room.host === currentUser.username) {

error.textContent =
"شما سازنده این اتاق هستید.";

return;
}

if (room.guest && room.guest !== currentUser.username) {

error.textContent =
"این اتاق پر است.";

return;
}

room.guest = currentUser.username;

localStorage.setItem(
"andooz_rooms",
JSON.stringify(rooms)
);

currentRoom = room;

player1 = room.host;
player2 = room.guest;

startGame();
}


/* =====================================
شروع بازی
===================================== */

function startGame() {

board = Array(9).fill("");

currentPlayer = "X";

roundFinished = false;

updateBoard();

updateScores();

document.getElementById("gameStatus").textContent =
"نوبت بازیکن X";

document.getElementById("player1Name").textContent =
player1;

document.getElementById("player2Name").textContent =
player2;

showPage("gamePage");
}


/* =====================================
انجام حرکت
===================================== */

function makeMove(index) {

if (board[index] !== "") return;

if (roundFinished) return;

board[index] = currentPlayer;

updateBoard();

const winner = checkWinner();

if (winner) {

roundFinished = true;

if (winner === "X") {
score1++;
} else {
score2++;
}

updateScores();

document.getElementById("gameStatus").textContent =
بازیکن ${winner} برنده شد!;

saveRoomScores();

return;
}

if (board.every(cell => cell !== "")) {

roundFinished = true;

document.getElementById("gameStatus").textContent =
"بازی مساوی شد!";

return;
}

currentPlayer = currentPlayer === "X" ? "O" : "X";

document.getElementById("gameStatus").textContent =
نوبت بازیکن ${currentPlayer};
}


/* =====================================
بررسی برنده
===================================== */

function checkWinner() {

const winningLines = [

[0, 1, 2],
[3, 4, 5],
[6, 7, 8],

[0, 3, 6],
[1, 4, 7],
[2, 5, 8],

[0, 4, 8],
[2, 4, 6]

];

for (const line of winningLines) {

const [a, b, c] = line;

if (
board[a] &&
board[a] === board[b] &&
board[a] === board[c]
) {

return board[a];

}

}

return null;
}


/* =====================================
به روز رسانی صفحه بازی
===================================== */

function updateBoard() {

const cells =
document.querySelectorAll(".cell");

cells.forEach((cell, index) => {

cell.textContent = board[index];

cell.disabled =
board[index] !== "" || roundFinished;

cell.style.color =
board[index] === "X"
? "#60a5fa"
: "#f87171";

});

}


/* =====================================
امتیازها
===================================== */

function updateScores() {

document.getElementById("player1Score").textContent =
score1;