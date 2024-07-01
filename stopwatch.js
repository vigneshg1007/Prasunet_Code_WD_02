const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const display = document.querySelector('.display');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0; // Now initialized to 0
let intervalId;
let isRunning = false;
let lapCount = 0;

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime; // Update elapsed time based on current time and start time

  let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor(elapsedTime % 1000);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  milliseconds = milliseconds.toString().padStart(3, '0');

  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Function to start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime; // Update start time based on elapsed time
    intervalId = setInterval(updateDisplay, 10); // Update display every 10 milliseconds
  }
}

// Function to stop the stopwatch
function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
}

// Function to reset the stopwatch
function resetStopwatch() {
  stopStopwatch();  // Ensure stopwatch is stopped
  startTime = Date.now();  // Set start time to current time (effectively resetting elapsed time)
  elapsedTime = 0;       // Explicitly set elapsed time to 0 for clarity
  updateDisplay();
  lapsList.innerHTML = ""; // Clear lap list
  lapCount = 0;
}

// Function to record a lap
function recordLap() {
  if (isRunning) {
    const newLap = document.createElement('li');
    newLap.textContent = `Lap ${lapCount + 1} - ${display.textContent}`;
    lapsList.appendChild(newLap);
    lapCount++;
  }
}

// Event listeners for buttons
startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetStopwatch);

