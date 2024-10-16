document.addEventListener('DOMContentLoaded', () => {
    let countdown;
    let paused = false;
    let remainingTime = 0;
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const countdownDisplay = document.getElementById('countdown-display');
    const historyList = document.getElementById('history-list');
    const savedTimers = document.getElementById('saved-timers');
    const alarmSound = document.getElementById('alarm-sound');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const resetBtn = document.getElementById('reset-btn');
    const saveTimerBtn = document.getElementById('save-timer');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const toggleSoundBtn = document.getElementById('toggle-sound');

    let soundEnabled = true;
    let savedTimersData = [];

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resumeBtn.addEventListener('click', resumeTimer);
    resetBtn.addEventListener('click', resetTimer);
    saveTimerBtn.addEventListener('click', saveTimer);
    savedTimers.addEventListener('change', loadSavedTimer);
    clearHistoryBtn.addEventListener('click', clearHistory);
    toggleSoundBtn.addEventListener('click', toggleSound);

    function startTimer() {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        remainingTime = minutes * 60 + seconds;

        if (remainingTime <= 0) return;

        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';

        countdown = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(countdown);
                addHistory(`${minutes}:${seconds < 10 ? '0' : ''}${seconds} - Completed`);
                if (soundEnabled) {
                    alarmSound.play();
                }
                resetTimer();
            } else {
                remainingTime--;
                updateDisplay(remainingTime);
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(countdown);
        paused = true;
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'inline';
    }

    function resumeTimer() {
        paused = false;
        resumeBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
        startTimer();
    }

    function resetTimer() {
        clearInterval(countdown);
        countdownDisplay.textContent = '00:00';
        startBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'none';
        paused = false;
    }

    function updateDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (time <= 10) {
            countdownDisplay.classList.add('warning');
        } else {
            countdownDisplay.classList.remove('warning');
        }
    }

    function addHistory(record) {
        const historyItem = document.createElement('li');
        historyItem.textContent = record;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('clear-btn');
        deleteBtn.addEventListener('click', () => historyItem.remove());

        historyItem.appendChild(deleteBtn);
        historyList.appendChild(historyItem);
    }

    function saveTimer() {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        const timerName = prompt("Enter a name for this timer:");

        if (timerName) {
            savedTimersData.push({ minutes, seconds, name: timerName });
            updateSavedTimers();
        }
    }

    function updateSavedTimers() {
        savedTimers.innerHTML = savedTimersData.map((timer, index) =>
            `<option value="${index}">${timer.name} - ${timer.minutes}:${timer.seconds < 10 ? '0' : ''}${timer.seconds}</option>`
        ).join('');
    }

    function loadSavedTimer() {
        const selectedTimer = savedTimersData[savedTimers.value];
        if (selectedTimer) {
            minutesInput.value = selectedTimer.minutes;
            secondsInput.value = selectedTimer.seconds;
        }
    }

    function clearHistory() {
        historyList.innerHTML = '';
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;
        alert(`Sound is now ${soundEnabled ? 'enabled' : 'disabled'}.`);
    }
});
