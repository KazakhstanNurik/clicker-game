let users = JSON.parse(localStorage.getItem("users")) || {};
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || {};

// Переключение вкладок
function showTab(tab) {
    document.querySelectorAll(".tab").forEach(el => el.classList.add("hidden"));
    document.getElementById(tab).classList.remove("hidden");
}

// === 1. Управление пользователями ===
function loadUsers() {
    let userList = document.getElementById("userList");
    userList.innerHTML = "";

    Object.keys(users).forEach(username => {
        let li = document.createElement("li");
        li.textContent = `${username} - Очки: ${users[username].score}`;
        
        let editBtn = document.createElement("button");
        editBtn.textContent = "Изменить очки";
        editBtn.onclick = () => editScore(username);
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => deleteUser(username);
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    });
}

function editScore(username) {
    let newScore = prompt(`Введите новое количество очков для ${username}:`);
    if (!isNaN(newScore) && newScore !== null) {
        users[username].score = parseInt(newScore);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }
}

function deleteUser(username) {
    if (confirm(`Удалить пользователя ${username}?`)) {
        delete users[username];
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }
}

// === 2. Управление жалобами ===
function loadFeedbacks() {
    let feedbackList = document.getElementById("adminFeedbackList");
    feedbackList.innerHTML = "";

    feedbacks.forEach((feedback, index) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${feedback.user}:</strong> ${feedback.text} (${feedback.date})</p>
            <input type="text" id="reply${index}" placeholder="Ответ">
            <button onclick="reply(${index})">Ответить</button>
            <button onclick="deleteFeedback(${index})">Удалить</button>
        `;
        feedbackList.appendChild(div);
    });
}

function reply(index) {
    let replyText = document.getElementById(`reply${index}`).value;
    feedbacks[index].reply = replyText;
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    loadFeedbacks();
}

function deleteFeedback(index) {
    feedbacks.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    loadFeedbacks();
}

// === 3. Фон и музыка ===
function setGlobalBackground() {
    let file = document.getElementById("bgUpload").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("globalBackground", e.target.result);
            alert("Фон установлен!");
        };
        reader.readAsDataURL(file);
    }
}

function setGlobalMusic() {
    let file = document.getElementById("musicUpload").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("globalMusic", e.target.result);
            alert("Музыка установлена!");
        };
        reader.readAsDataURL(file);
    }
}

function removeGlobalMusic() {
    localStorage.removeItem("globalMusic");
    alert("Музыка удалена!");
}

// Загрузка данных при входе
loadUsers();
loadFeedbacks();