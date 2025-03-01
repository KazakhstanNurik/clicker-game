let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

// === Игрок оставляет отзыв ===
function submitFeedback() {
    let text = document.getElementById("feedbackText").value;
    if (!text) return;

    let currentUser = localStorage.getItem("currentUser");
    let newFeedback = {
        user: currentUser,
        text: text,
        likes: 0,
        dislikes: 0,
        date: new Date().toLocaleString(),
        reply: ""
    };

    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    document.getElementById("feedbackText").value = "";
    displayFeedbacks();
}

// === Показать все отзывы ===
function displayFeedbacks() {
    let container = document.getElementById("feedbackList");
    container.innerHTML = "";

    feedbacks.forEach((feedback, index) => {
        let div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `
            <p><strong>${feedback.user}:</strong> ${feedback.text} (${feedback.date})</p>
            <p>Ответ: ${feedback.reply || "Нет ответа"}</p>
            <button onclick="like(${index})">👍 ${feedback.likes}</button>
            <button onclick="dislike(${index})">👎 ${feedback.dislikes}</button>
        `;
        container.appendChild(div);
    });
}

// === Лайк/дизлайк ===
function like(index) {
    feedbacks[index].likes++;
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    displayFeedbacks();
}

function dislike(index) {
    feedbacks[index].dislikes++;
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    displayFeedbacks();
}

// === Админ загружает отзывы ===
function loadAdminFeedbacks() {
    let container = document.getElementById("adminFeedbackList");
    container.innerHTML = "";

    feedbacks.forEach((feedback, index) => {
        let div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `
            <p><strong>${feedback.user}:</strong> ${feedback.text} (${feedback.date})</p>
            <input type="text" id="reply${index}" placeholder="Введите ответ">
            <button onclick="reply(${index})">Ответить</button>
            <button onclick="deleteFeedback(${index})">Удалить</button>
        `;
        container.appendChild(div);
    });
}

// === Админ отвечает на отзыв ===
function reply(index) {
    let replyText = document.getElementById(`reply${index}`).value;
    feedbacks[index].reply = replyText;
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    loadAdminFeedbacks();
}

// === Админ удаляет отзыв ===
function deleteFeedback(index) {
    feedbacks.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    loadAdminFeedbacks();
}

// Загружаем отзывы при старте
displayFeedbacks();