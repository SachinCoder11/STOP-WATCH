let startTimestamp = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimesList');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startBtn.textContent = 'Start';
    } else {
        startTimestamp = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTimestamp;
            updateDisplay();
        }, 10);
        running = true;
        startBtn.textContent = 'Pause';
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    startBtn.textContent = 'Start';
    lapTimesList.innerHTML = '';
    lapCounter = 0;
});

lapBtn.addEventListener('click', function() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapTimesList.appendChild(lapItem);
        lapTimesList.scrollTop = lapTimesList.scrollHeight;
    }
});

updateDisplay();
