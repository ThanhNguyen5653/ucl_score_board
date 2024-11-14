// Declare variables
let timerInterval;
let secondsElapsed = 0;
let extraTime = 0; // Track extra time in seconds
let isSecondHalf = false;

// Format time as MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Start the timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing interval

    // Start a new timer
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = formatTime(secondsElapsed);

        // Update the extra time display if applicable
        if (extraTime > 0) {
            const remainingExtraTime = extraTime - secondsElapsed;
            if (remainingExtraTime > 0) {
                document.getElementById("extra-time").innerText = `+${Math.floor(remainingExtraTime / 60)}:${remainingExtraTime % 60 < 10 ? '0' : ''}${remainingExtraTime % 60}`;
            } else {
                document.getElementById("extra-time").innerText = `+0:00`; // If no extra time left
            }
        }
    }, (10 * 1000) / 45); // Speed up: 10 min real-time = 45 game min
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Clear the interval
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval); // Clear the interval
    secondsElapsed = isSecondHalf ? 45 * 60 : 0; // Reset to 0 or 45 min based on the half
    extraTime = 0; // Reset extra time
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    document.getElementById("extra-time").style.display = "none"; // Hide extra time
}

// Set Extra Time
function setExtraTime() {
  const extraTimeInput = document.getElementById("extra-time-input");
  const extraTimeValue = parseInt(extraTimeInput.value, 10);
  const extraTimeElement = document.getElementById("extra-time");

  console.log("triggered");

  if (!isNaN(extraTimeValue) && extraTimeValue > 0) {
      // Set the static extra time text
      extraTimeElement.innerText = `+${extraTimeValue}`;

      // Ensure extra time is visible
      extraTimeElement.style.display = "inline-block"; // Show the element

      // Apply background and text color styles
      extraTimeElement.style.backgroundColor = "#00ff85";  // Green background
      extraTimeElement.style.color = "#38003c";  // Dark red text

      // Log to confirm the extra time text
      console.log("Extra time set:", extraTimeElement.innerText);
  } else {
      // Hide extra time if invalid input
      extraTimeElement.style.display = "none";
      console.log("Invalid extra time value");
  }
}



// Start the timer from the second half (45 min)
function startSecondHalf() {
    isSecondHalf = true;
    secondsElapsed = 45 * 60; // Start from 45 minutes
    startTimer();
}

// Start the timer from a custom minute
function startCustomTimer() {
    const startTime = prompt("Enter start time in minutes (e.g., 90 for extra time):");
    if (!isNaN(startTime) && startTime !== null && startTime.trim() !== "") {
        secondsElapsed = parseInt(startTime, 10) * 60; // Convert to seconds
        startTimer();
    }
}

// Add event listeners for buttons
document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("stop-btn").addEventListener("click", stopTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("set-extra-time-btn").addEventListener("click", setExtraTime);
document.getElementById("second-half-btn").addEventListener("click", startSecondHalf);
document.getElementById("custom-time-btn").addEventListener("click", startCustomTimer);

// Ensure the scoreboard updates correctly on load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("team1-score").value = 0;
    document.getElementById("team2-score").value = 0;
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    document.getElementById("extra-time").style.display = "none"; // Ensure extra time is hidden by default
});
