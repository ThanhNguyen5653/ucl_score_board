// Updated script.js
let timerInterval;
let secondsElapsed = 0;
let isTimerRunning = false; // Track timer state
let extraTime = 0;

// Format time as MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Start/Stop the timer
// Start/Stop the timer with adjusted pace
function toggleTimer() {
    const paceFactor = 1000 / 9; // 1 real-life second = 9 in-game seconds
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    } else {
        timerInterval = setInterval(() => {
            secondsElapsed++;
            document.getElementById("timer").innerText = formatTime(secondsElapsed);
        }, paceFactor);
        isTimerRunning = true;
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    extraTime = 0;
    isTimerRunning = false;
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    document.getElementById("extra-time").innerText = "+0:00";
}

// Dynamically update extra time
function updateExtraTime() {
    const extraTimeInput = parseInt(document.getElementById("extra-time-input").value, 10);
    if (!isNaN(extraTimeInput) && extraTimeInput >= 0) {
        extraTime = extraTimeInput * 60; // Convert minutes to seconds
        document.getElementById("extra-time").innerText = `+${extraTimeInput}`;
        document.getElementById("extra-time").style.display = "inline-block";
    } else {
        document.getElementById("extra-time").innerText = "+0:00";
        document.getElementById("extra-time").style.display = "none";
    }
}

// Set timer to 45:00 and start it
function startSecondHalf() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
    }
    secondsElapsed = 45 * 60; // 45 minutes in seconds
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    isTimerRunning = false; // Timer is paused after setting
}

// Start timer with custom time
function startCustomTime() {
    const customTimeInput = parseInt(prompt("Enter custom time in minutes:"), 10);
    if (!isNaN(customTimeInput) && customTimeInput >= 0) {
        if (isTimerRunning) {
            clearInterval(timerInterval);
        }
        secondsElapsed = customTimeInput * 60; // Convert minutes to seconds
        document.getElementById("timer").innerText = formatTime(secondsElapsed);
        isTimerRunning = false; // Timer is paused after setting
    } else {
        alert("Please enter a valid number of minutes.");
    }
}

// Add keyboard listener for Spacebar (Start/Stop)
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // Prevent scrolling
        toggleTimer();
    }
});

// Attach event listeners
document.getElementById("start-stop-btn").addEventListener("click", toggleTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("extra-time-input").addEventListener("input", updateExtraTime);
document.getElementById("second-half-btn").addEventListener("click", startSecondHalf);
document.getElementById("custom-time-btn").addEventListener("click", startCustomTime);