let users = JSON.parse(localStorage.getItem("users")) || {};
const adminUsername = "Creator";  
const adminPassword = "Kazakhstan";  

// === Регистрация ===
function register() {
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;

    if (username.length < 3 || password.length < 5) {
        alert("Ник должен быть больше 2 символов, пароль - минимум 5!");
        return;
    }

    if (users[username]) {
        alert("Этот ник уже занят!");
        return;
    }

    users[username] = { password, score: 0 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Регистрация успешна! Теперь войдите.");
}

// === Вход ===
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("currentUser", username);
        window.location.href = "admin.html"; // Переход в админ-панель
    } else if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html"; // Переход в игру
    } else {
        alert("Неверный логин или пароль!");
    }
}