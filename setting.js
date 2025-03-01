// === 1. Фон ===
// Устанавливает глобальный фон (от админа) или личный (от игрока)
function applyBackground() {
    let customBg = localStorage.getItem("customBackground");
    let globalBg = localStorage.getItem("globalBackground");
    document.body.style.backgroundImage = customBg ? `url(${customBg})` : globalBg ? `url(${globalBg})` : "none";
}

// Игрок устанавливает свой фон
function setCustomBackground() {
    let file = document.getElementById("customBgUpload").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("customBackground", e.target.result);
            applyBackground();
        };
        reader.readAsDataURL(file);
    }
}

// === 2. Музыка ===
let audio = new Audio();
let customMusic = localStorage.getItem("customMusic");
let globalMusic = localStorage.getItem("globalMusic");

audio.src = customMusic ? customMusic : globalMusic ? globalMusic : "";
audio.loop = true;
audio.volume = localStorage.getItem("musicVolume") || 0.5; // Громкость по умолчанию

// Включение/выключение музыки
function toggleMusic() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Установка громкости
document.getElementById("volumeSlider").addEventListener("input", function () {
    let volume = this.value;
    audio.volume = volume;
    localStorage.setItem("musicVolume", volume);
});

// Игрок устанавливает свою музыку
function setCustomMusic() {
    let file = document.getElementById("customMusicUpload").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("customMusic", e.target.result);
            audio.src = e.target.result;
            audio.play();
        };
        reader.readAsDataURL(file);
    }
}

// Запуск настроек при входе
applyBackground();
if (audio.src) {
    audio.play();
}