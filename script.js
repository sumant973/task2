document.addEventListener("DOMContentLoaded", () => {
  let startTime = 0;
  let elapsedTime = 0;
  let intervalId;
  let isRunning = false;

  const display = document.getElementById("display");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const resetBtn = document.getElementById("reset");

  function formatTime(ms) {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  function updateDisplay() {
    const currentTime = Date.now();
    const time = elapsedTime + (isRunning ? currentTime - startTime : 0);
    display.textContent = formatTime(time);
  }

  startBtn.addEventListener("click", () => {
    if (!isRunning) {
      startTime = Date.now();
      intervalId = setInterval(updateDisplay, 10); // 10ms for smooth updates
      isRunning = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (isRunning) {
      elapsedTime += Date.now() - startTime;
      clearInterval(intervalId);
      isRunning = false;
    }
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00.000";
  });
});
