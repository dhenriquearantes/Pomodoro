// Variáveis do temporizador
let timer = null;
let time = 0;
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

    if (time > 0 && time < 30) {
        messageElement.textContent = "Hora da ação!";
    } else if (time >= 30) {
        messageElement.textContent = "Hora de descansar!";
    } else {
        messageElement.textContent = ""; // Não mostra nada quando o timer estiver zerado
    }
}

// Função para adicionar uma tarefa à lista
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskListElement = document.getElementById('task-list');
    const task = taskInput.value.trim();

    if (task !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskListElement.appendChild(taskItem);
        taskInput.value = '';

        // Armazenar a tarefa no localStorage
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Função para carregar as tarefas armazenadas no localStorage
function loadTasks() {
    const taskListElement = document.getElementById('task-list');

    // Obter as tarefas do localStorage
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    // Adicionar as tarefas na lista
    for (const task of tasks) {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskListElement.appendChild(taskItem);
    }
}

// Função para iniciar o temporizador
function startTimer() {
    if (timer === null) {
        timer = setInterval(function () {
            time++;
            updateTimer();
            if (time >= 30) { // 25 minutes (1500 seconds)
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