const targetButton = document.getElementById('target-button');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const levelDisplay = document.getElementById('level');
const body = document.body;

let score = 0;
let timeLeft = 10;
let level = 1;
let gameActive = true;
let moveInterval = 1000; // Initial button movement interval

// Function to move the button randomly
function moveButton() {
  if (!gameActive) return;

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  targetButton.style.position = 'absolute';
  targetButton.style.left = `${x}px`;
  targetButton.style.top = `${y}px`;
}

// Function to handle button click
targetButton.addEventListener('click', () => {
  if (gameActive) {
    score++;
    scoreDisplay.textContent = score;

    // Increase level every 5 points
    if (score % 5 === 0) {
      level++;
      levelDisplay.textContent = level;
      increaseDifficulty();
    }

    moveButton();
  }
});

// Function to increase difficulty
function increaseDifficulty() {
  // Speed up button movement
  clearInterval(moveIntervalId);
  moveInterval = Math.max(200, moveInterval - 200); // Decrease interval, minimum 200ms
  moveIntervalId = setInterval(moveButton, moveInterval);

  // Change background color
  const colors = ['#ffcccc', '#ccffcc', '#ccccff', '#ffccff', '#ccffff'];
  body.style.backgroundColor = colors[level % colors.length];
}

// Timer function
const timer = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
  } else {
    clearInterval(timer);
    clearInterval(moveIntervalId);
    gameActive = false;
    alert(`Game Over! Your score is ${score}.`);
  }
}, 1000);

// Initial button move and interval
moveButton();
let moveIntervalId = setInterval(moveButton, moveInterval);