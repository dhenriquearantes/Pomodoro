let timer = null;
let time = 0;
let isPomodoroMode = true;
let isPaused = false;
let initialTime = 25 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updateTimer() {
  const timeElement = document.getElementById('time');
  timeElement.textContent = formatTime(time);
  
  if (timer) {
    document.title = `Temporizador - ${formatTime(time)}`;
  } else {
    document.title = 'Temporizador';
  }
}

function startTimer() {
  if (!timer && time > 0) {
    timer = setInterval(() => {
      time--;
      updateTimer();
      
      if (time <= 0) {
        clearInterval(timer);
        timer = null;
        updateTimer();
        
        if (isPomodoroMode) {
          swithToDescansoMode();
        } else {
          switchToPomodoroMode()
        }
        
        setTimeout(() => {
          showAlert("Tempo encerrado!");
        }, 1000);
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    isPaused = true;
  }
}

function resumeTimer() {
  if (isPaused) {
    startTimer();
    isPaused = false;
  }
}

function resetTimer() {
  pauseTimer();
  time = initialTime;
  updateTimer();
}

function setTimer(value) {
  const inputValue = value.trim();
  
  if (inputValue.endsWith('s')) {
    const seconds = parseInt(inputValue.slice(0, -1));
    if (!isNaN(seconds) && seconds > 0) {
      initialTime = seconds;
      time = initialTime;
      updateTimer();
    }
  } else {
    const minutes = parseInt(inputValue);
    if (!isNaN(minutes) && minutes > 0) {
      initialTime = minutes * 60;
      time = initialTime;
      updateTimer();
    }
  }
}

function startPomodoroTimer() {
  if (isPomodoroMode) {
    initialTime = 25 * 60;
    resetTimer();
  }
}

function startDescansoTimer() {
  if (!isPomodoroMode) {
    initialTime = 1 * 60;
    resetTimer();
  }
}

function showAlert(message) {
  alert(message);
}

function swithToDescansoMode() {
  isPomodoroMode = false;
  startDescansoTimer();
}

function switchToPomodoroMode() {
  isPomodoroMode = true;
  startPomodoroTimer();
}

function addTask() {
  const taskInput = document.querySelector('#newtask input');
  
  if (taskInput.value.length === 0) {
    alert("Por favor, digite o nome da tarefa!");
  } else {
    const taskCount = document.querySelectorAll('.task').length;
    
    if (taskCount >= 10) {
      alert("Limite máximo de 10 tarefas atingido!");
      return;
    }
    
    const tasksContainer = document.querySelector('#tasks');
    const taskName = taskInput.value;
    
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
    const taskNameElement = document.createElement('span');
    taskNameElement.id = 'taskname';
    taskNameElement.textContent = taskName;
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<i class="far fa-trash-alt">❌</i>';
    deleteButton.addEventListener('click', function() {
      taskElement.remove();
    });
    
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(deleteButton);
    
    tasksContainer.appendChild(taskElement);
    
    taskInput.value = '';
  }
}

document.querySelector('#push').addEventListener('click', addTask);
document.querySelector('#deleteall').addEventListener('click', function() {
  const tasksContainer = document.querySelector('#tasks');
  tasksContainer.innerHTML = '';
});

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', function() {
  isPaused = false; // Reiniciar também cancela a pausa
  resetTimer();
});
document.getElementById('btn-pomodoro').addEventListener('click', function() {
  isPomodoroMode = true;
  startPomodoroTimer();
});
document.getElementById('btn-descanso').addEventListener('click', function() {
  isPomodoroMode = false;
  startDescansoTimer();
});
document.getElementById('btn-set-timer').addEventListener('click', function() {
  const value = prompt('Digite o valor do timer em minutos ou segundos:');
  setTimer(value);
});

window.addEventListener('load', startPomodoroTimer);
window.addEventListener('focus', updateTimer);
window.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    resumeTimer();
  }
});