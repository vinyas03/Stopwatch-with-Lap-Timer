let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [h, m, s, ms] = ["", "", "", ""];
let timeRef = document.querySelector(".timer-display");
let int = null; //IntervalID
let laps = document.querySelector(".laps");
let lapItems = document.querySelector(".lap-items");
let lapCount = 0; //Current Lap Count
const lapLimit = 10; //Max Laps

document.getElementById("start-timer").addEventListener("click", () => {
  if (int !== null) {
    //clearInterval(int);
    return;
  }
  int = setInterval(displayTimer, 5); //4ms is the minimum limit due to browser limitations.
  document.getElementById("lap-timer").addEventListener("click", addLap);
});

document.getElementById("pause-timer").addEventListener("click", () => {
  clearInterval(int);
  int = null;
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(int);
  int = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timeRef.innerHTML = "00 : 00 : 00 : 000";

  laps.style.display = "none";
  lapItems.innerHTML = "";
  lapCount = 0;
});

function displayTimer() {
  milliseconds += 5; //Add 5ms
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  h = hours < 10 ? "0" + hours : hours;
  m = minutes < 10 ? "0" + minutes : minutes;
  s = seconds < 10 ? "0" + seconds : seconds;
  ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

document.getElementById("lap-timer").addEventListener("click", addLap);

function addLap(e) {
  if (int !== null && lapCount < lapLimit) {
    laps.style.display = "block";
    lapCount++;
    lapItems.innerHTML += `<div class="lap-item"> ${h} : ${m} : ${s} : ${ms}</div>`;
  }
  if (lapCount >= 10) {
    lapItems.innerHTML += `<div class="lap-item" style="color:#ec0b0bdc">Max laps reached.</div>`;
    document.getElementById("lap-timer").removeEventListener("click", addLap);
  }
}
