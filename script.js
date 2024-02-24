// Variáveis do temporizador
let timer = null;
let time = 25 * 60; // Definindo o tempo inicial para 25 minutos
let pomodoroCount = 0;

// Função para formatar o tempo no formato "mm:ss"
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

// Função para atualizar o contador
function updateTimer() {
    const timeElement = document.getElementById('time');
    timeElement.textContent = formatTime(time);
    messageTimer();
}

function messageTimer() {
    const messageElement = document.getElementById('message');

    if (timer !== null && time > 0) {
        messageElement.textContent = "Hora da ação!";
    } else if (timer !== null && time <= 0) {
        messageElement.textContent = "Hora de descansar!";
    } else {
        messageElement.textContent = ""; // Não mostra nada quando o timer estiver inativo
    }
}

// Função para iniciar o temporizador
function startTimer() {
    if (timer === null) {
        timer = setInterval(function () {
            time--;
            updateTimer();
            if (time <= 0) {
                clearInterval(timer);
                timer = null;
                updateTimer();
            }
        }, 1000);
    }
}


// Função para parar o temporizador
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

// Função para reiniciar o temporizador
function resetTimer() {
    stopTimer();
    time = 0;
    updateTimer();
}

// Associar funções aos botões
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('add-task').addEventListener('click', addTask);

// Carregar as tarefas quando a página for carregada
window.addEventListener('load', function () {
    updateTimer();
    loadTasks();
});