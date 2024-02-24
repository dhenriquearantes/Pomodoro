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

document.querySelector('#push').onclick = function() {
    var taskInput = document.querySelector('#newtask input');
    if (taskInput.value.length == 0) {
        alert("Por favor, digite o nome da tarefa!")
    } else {
        var taskCount = document.querySelectorAll('.task').length;
        if (taskCount >= 10) {
            alert("Limite máximo de 10 tarefas atingido!");
            return;
        }

        var timerContainer = document.querySelector('.timer-container');
        var timerContainerMargin = getComputedStyle(timerContainer).marginTop;

        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${taskInput.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt">X</i>
                </button>
            </div>
        `;

        timerContainer.style.marginTop = timerContainerMargin; // Manter a margem superior do container do timer

        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function() {
                this.parentNode.remove();
            }
        }

        taskInput.value = '';
    }
}

document.querySelector('#deleteall').onclick = function() {
    var tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = '';
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