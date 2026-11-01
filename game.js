document.addEventListener("DOMContentLoaded", function () {
  // گرفتن عناصر HTML
  const cells = document.querySelectorAll(".cell");
  const status = document.getElementById("status");
  const restartButton = document.getElementById("restartButton");
  const scoreXElement = document.getElementById("scoreX");
  const scoreOElement = document.getElementById("scoreO");

  // بررسی وجود عناصر ضروری
  if (
    cells.length !== 9 ||
    !status ||
    !restartButton ||
    !scoreXElement ||
    !scoreOElement
  ) {
    console.error("خطا: عناصر بازی در game.html پیدا نشدند.");
    return;
  }

  // وضعیت بازی
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  // خواندن امتیازهای ذخیره‌شده
  let scoreX = Number(localStorage.getItem("andooz_scoreX")) || 0;
  let scoreO = Number(localStorage.getItem("andooz_scoreO")) || 0;

  // نمایش امتیازها
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;

  // حالت‌های برنده شدن
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // بررسی برنده
  function checkWinner() {
    for (const combination of winningCombinations) {
      const a = combination[0];
      const b = combination[1];
      const c = combination[2];

      if (
        board[a] !== "" &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return true;
      }
    }

    return false;
  }

  // کلیک روی خانه‌های بازی
  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      const index = Number(cell.dataset.index);

      // جلوگیری از کلیک روی خانه پر یا بازی تمام‌شده
      if (!gameActive || board[index] !== "") {
        return;
      }

      // ثبت حرکت
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.disabled = true;

      // بررسی برنده
      if (checkWinner()) {
        status.textContent = "بازیکن " + currentPlayer + " برنده شد!";

        if (currentPlayer === "X") {
          scoreX++;
          localStorage.setItem("andooz_scoreX", scoreX);
          scoreXElement.textContent = scoreX;
        } else {
          scoreO++;
          localStorage.setItem("andooz_scoreO", scoreO);
          scoreOElement.textContent = scoreO;
        }

        gameActive = false;
        return;
      }

      // بررسی مساوی
      const boardIsFull = board.every(function (value) {
        return value !== "";
      });

      if (boardIsFull) {
        status.textContent = "بازی مساوی شد!";
        gameActive = false;
        return;
      }

      // تغییر نوبت
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = "نوبت بازیکن " + currentPlayer;
    });
  });

  // شروع دور جدید
  restartButton.addEventListener("click", function () {
    // پاک کردن خانه‌ها
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function (cell) {
      cell.textContent = "";
      cell.disabled = false;
    });

    // شروع از بازیکن X
    currentPlayer = "X";
    gameActive = true;

    // به‌روزرسانی پیام
    status.textContent = "نوبت بازیکن X";
  });
});