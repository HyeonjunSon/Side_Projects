const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const countdownDisplay = document.getElementById('countdown-display');

let countdownInterval;
let timeRemaining = 0;  // Remaining time in seconds

startBtn.addEventListener('click', function() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    timeRemaining = minutes * 60 + seconds;  // Convert to seconds

    if (timeRemaining > 0) {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);  // Update every second
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(countdownInterval);  // Stop countdown
    countdownDisplay.textContent = '00:00';
    minutesInput.value = '';
    secondsInput.value = '';
});

function updateCountdown() {
    if (timeRemaining > 0) {
        timeRemaining--;  // Decrease time by 1 second
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        countdownDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    } else {
        clearInterval(countdownInterval);  // Stop when time is up
        alert("Time's up!");
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;  // Add leading zero if needed
}
