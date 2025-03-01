let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
    window.location.href = "login.html"; // Если нет пользователя, отправить на вход
}

document.getElementById("currentUser").textContent = currentUser;
let score = users[currentUser].score;
document.getElementById("score").textContent = score;

// === Кликер ===
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    users[currentUser].score = score;
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("score").textContent = score;
    updateLeaderboard();
});

// === Рейтинг ===
function updateLeaderboard() {
    let sortedUsers = Object.entries(users).sort((a, b) => b[1].score - a[1].score);
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    sortedUsers.forEach(([username, data], index) => {
        let li = document.createElement("li");
        li.textContent = username === currentUser ? `Вы: ${username} - ${data.score}` : `${index + 1}. ${username} - ${data.score}`;
        leaderboard.appendChild(li);
    });
}

updateLeaderboard();