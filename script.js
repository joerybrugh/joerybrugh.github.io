import { firebaseConfig } from "./firebase-config.js";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }
});

const copyBtcButton = document.querySelector("#copy-btc-address");
const btcAddress = document.querySelector("#btc-address").textContent.trim();
const donationStatus = document.querySelector("#donation-status");
copyBtcButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(btcAddress);
    donationStatus.textContent = "Wallet address copied.";
  } catch (error) {
    console.error("Could not copy the Bitcoin wallet address.", error);
    donationStatus.textContent = "Copy unavailable here. Select the wallet address above to copy it.";
  }
});

const encouragements = [
  "Like bamboo, you can bend with the wind and still stand tall.",
  "A panda takes one step at a time; your small steps count too.",
  "Strong roots grow quietly. Keep showing up for yourself.",
  "Rest is part of growing. Even pandas take a peaceful pause.",
  "You don't have to rush; bamboo knows good things take time.",
  "Your gentle persistence is a strength all its own.",
  "One brave try can become the beginning of something wonderful.",
  "When the path gets steep, take it one paw-step at a time.",
  "You are allowed to learn as you go. That's how forests grow.",
  "Like a panda with its bamboo, hold on to what helps you thrive.",
  "A little progress today is still progress worth celebrating.",
  "You can be soft-hearted and strong at the same time.",
  "Every fresh morning is another chance to reach for the light.",
  "Bamboo bends, adapts, and keeps growing. So can you.",
  "Your patience is planting seeds you may not see yet.",
  "Even a quiet panda makes a big difference by being itself.",
  "The strength you need can grow from the smallest start.",
  "Take a breath, find your balance, and try one more time.",
  "You bring something to this world that nobody else can.",
  "Good things grow at their own pace—including you.",
  "A stumble is just one moment, not the whole journey.",
  "Be proud of how far your paws have already carried you.",
  "Kindness is a quiet kind of courage. Keep sharing yours.",
  "You can reach new heights while staying rooted in who you are.",
  "A bamboo forest starts with one shoot. Begin where you are.",
  "Your best today doesn't need to look like anyone else's.",
  "Pandas keep climbing with patience; keep going your way.",
  "You have made it through hard days before. Trust your strength.",
  "Small wins are still wins—celebrate every little leaf.",
  "The world needs your unique mix of courage and kindness.",
  "Grow through what you go through, one gentle day at a time.",
  "You don't need perfect conditions to keep growing.",
  "Stand tall, stay gentle, and remember: you've got this."
];
const encouragementMessage = document.querySelector("#encouragement-message");
let previousEncouragementIndex = -1;
document.querySelector("#encouragement-button").addEventListener("click", () => {
  let nextIndex = Math.floor(Math.random() * encouragements.length);
  if (encouragements.length > 1) {
    while (nextIndex === previousEncouragementIndex) {
      nextIndex = Math.floor(Math.random() * encouragements.length);
    }
  }
  previousEncouragementIndex = nextIndex;
  encouragementMessage.textContent = encouragements[nextIndex];
});

const snakeCanvas = document.querySelector("#snake-canvas");
const snakeContext = snakeCanvas.getContext("2d");
const snakeStatus = document.querySelector("#snake-status");
const snakeCell = 20;
const snakeColumns = snakeCanvas.width / snakeCell;
const snakeRows = snakeCanvas.height / snakeCell;
let snake = [];
let snakeDirection = { x: 1, y: 0 };
let queuedDirection = { x: 1, y: 0 };
let snakeFood = { x: 10, y: 6 };
let snakeTimer = null;
let snakeIsRunning = false;

function drawSnake() {
  snakeContext.fillStyle = "#eff5ea";
  snakeContext.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  snakeContext.strokeStyle = "#e1eadf";
  snakeContext.lineWidth = 1;
  for (let x = 0; x <= snakeCanvas.width; x += snakeCell) {
    snakeContext.beginPath();
    snakeContext.moveTo(x, 0);
    snakeContext.lineTo(x, snakeCanvas.height);
    snakeContext.stroke();
  }
  for (let y = 0; y <= snakeCanvas.height; y += snakeCell) {
    snakeContext.beginPath();
    snakeContext.moveTo(0, y);
    snakeContext.lineTo(snakeCanvas.width, y);
    snakeContext.stroke();
  }
  snakeContext.font = `${snakeCell - 2}px sans-serif`;
  snakeContext.textAlign = "center";
  snakeContext.textBaseline = "middle";
  snakeContext.fillText("🍎", snakeFood.x * snakeCell + snakeCell / 2, snakeFood.y * snakeCell + snakeCell / 2);
  snake.forEach((part, index) => {
    snakeContext.fillStyle = index === 0 ? "#4c9589" : "#78b0a0";
    snakeContext.beginPath();
    snakeContext.roundRect(part.x * snakeCell + 2, part.y * snakeCell + 2, snakeCell - 4, snakeCell - 4, 6);
    snakeContext.fill();
  });
}

function placeSnakeFood() {
  do {
    snakeFood = { x: Math.floor(Math.random() * snakeColumns), y: Math.floor(Math.random() * snakeRows) };
  } while (snake.some((part) => part.x === snakeFood.x && part.y === snakeFood.y));
}

function endSnake(message) {
  window.clearInterval(snakeTimer);
  snakeIsRunning = false;
  snakeStatus.textContent = message;
}

function stepSnake() {
  snakeDirection = queuedDirection;
  const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
  const ateFood = head.x === snakeFood.x && head.y === snakeFood.y;
  const bodyToCheck = ateFood ? snake : snake.slice(0, -1);
  if (head.x < 0 || head.x >= snakeColumns || head.y < 0 || head.y >= snakeRows ||
      bodyToCheck.some((part) => part.x === head.x && part.y === head.y)) {
    drawSnake();
    endSnake(`Game over — length ${snake.length}. Try again?`);
    return;
  }
  snake.unshift(head);
  if (ateFood) {
    placeSnakeFood();
    snakeStatus.textContent = `Apples: ${snake.length - 3}`;
  } else {
    snake.pop();
  }
  drawSnake();
}

function startSnake() {
  window.clearInterval(snakeTimer);
  snake = [{ x: 7, y: 6 }, { x: 6, y: 6 }, { x: 5, y: 6 }];
  snakeDirection = { x: 1, y: 0 };
  queuedDirection = { x: 1, y: 0 };
  placeSnakeFood();
  snakeIsRunning = true;
  snakeStatus.textContent = "Apples: 0";
  drawSnake();
  snakeTimer = window.setInterval(stepSnake, 125);
}

document.querySelector(".snake-start").addEventListener("click", startSnake);
drawSnake();

const pongCanvas = document.querySelector("#pong-canvas");
const pongContext = pongCanvas.getContext("2d");
const pongStatus = document.querySelector("#pong-status");
const pongKeys = new Set();
const pong = { playerY: 88, botY: 88, ballX: 160, ballY: 120, ballVX: 3.4, ballVY: 2.2, playerScore: 0, botScore: 0, active: false, frame: 0, lastTime: 0 };

function drawPong() {
  pongContext.fillStyle = "#eff5ea";
  pongContext.fillRect(0, 0, pongCanvas.width, pongCanvas.height);
  pongContext.setLineDash([6, 7]);
  pongContext.strokeStyle = "#c5d6c8";
  pongContext.beginPath();
  pongContext.moveTo(pongCanvas.width / 2, 0);
  pongContext.lineTo(pongCanvas.width / 2, pongCanvas.height);
  pongContext.stroke();
  pongContext.setLineDash([]);
  pongContext.fillStyle = "#4c9589";
  pongContext.fillRect(14, pong.playerY, 8, 56);
  pongContext.fillStyle = "#d87861";
  pongContext.fillRect(pongCanvas.width - 22, pong.botY, 8, 56);
  pongContext.fillStyle = "#785d46";
  pongContext.beginPath();
  pongContext.arc(pong.ballX, pong.ballY, 7, 0, Math.PI * 2);
  pongContext.fill();
  pongContext.font = "bold 16px 'DM Sans', sans-serif";
  pongContext.textAlign = "center";
  pongContext.fillStyle = "#785d46";
  pongContext.fillText(`${pong.playerScore}     ${pong.botScore}`, pongCanvas.width / 2, 22);
}

function resetPongBall(direction) {
  pong.ballX = pongCanvas.width / 2;
  pong.ballY = pongCanvas.height / 2;
  pong.ballVX = 3.4 * direction;
  pong.ballVY = (Math.random() * 2 - 1) * 2.8;
}

function pongLoop(timestamp) {
  if (!pong.active) return;
  const elapsed = Math.min((timestamp - (pong.lastTime || timestamp)) / 16.67, 2);
  pong.lastTime = timestamp;
  if (pongKeys.has("ArrowUp") || pongKeys.has("KeyW")) pong.playerY -= 5 * elapsed;
  if (pongKeys.has("ArrowDown") || pongKeys.has("KeyS")) pong.playerY += 5 * elapsed;
  pong.playerY = Math.max(0, Math.min(pongCanvas.height - 56, pong.playerY));

  const botCenter = pong.botY + 28;
  if (botCenter < pong.ballY - 8) pong.botY += 3.2 * elapsed;
  if (botCenter > pong.ballY + 8) pong.botY -= 3.2 * elapsed;
  pong.botY = Math.max(0, Math.min(pongCanvas.height - 56, pong.botY));

  pong.ballX += pong.ballVX * elapsed;
  pong.ballY += pong.ballVY * elapsed;
  if (pong.ballY < 7 || pong.ballY > pongCanvas.height - 7) pong.ballVY *= -1;
  if (pong.ballVX < 0 && pong.ballX < 22 && pong.ballY > pong.playerY - 7 && pong.ballY < pong.playerY + 63) {
    pong.ballVX = Math.abs(pong.ballVX) * 1.04;
    pong.ballVY += (pong.ballY - (pong.playerY + 28)) * .045;
  } else if (pong.ballVX > 0 && pong.ballX > pongCanvas.width - 22 && pong.ballY > pong.botY - 7 && pong.ballY < pong.botY + 63) {
    pong.ballVX = -Math.abs(pong.ballVX) * 1.04;
    pong.ballVY += (pong.ballY - (pong.botY + 28)) * .045;
  }
  if (pong.ballX < -7) {
    pong.botScore += 1;
    resetPongBall(1);
  } else if (pong.ballX > pongCanvas.width + 7) {
    pong.playerScore += 1;
    resetPongBall(-1);
  }
  drawPong();
  if (pong.playerScore >= 5 || pong.botScore >= 5) {
    pong.active = false;
    pongStatus.textContent = pong.playerScore > pong.botScore ? "You win! Fancy a rematch?" : "The bot wins — rematch?";
    return;
  }
  pong.frame = requestAnimationFrame(pongLoop);
}

function startPong() {
  if (pong.frame) cancelAnimationFrame(pong.frame);
  pong.playerScore = 0;
  pong.botScore = 0;
  pong.playerY = 92;
  pong.botY = 92;
  pong.active = true;
  pong.lastTime = 0;
  pongStatus.textContent = "First to 5 wins";
  resetPongBall(Math.random() < .5 ? 1 : -1);
  drawPong();
  pong.frame = requestAnimationFrame(pongLoop);
}

document.querySelector(".pong-start").addEventListener("click", startPong);
window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code) &&
      (pong.active || snakeIsRunning)) {
    event.preventDefault();
    pongKeys.add(event.code);
    if (snakeIsRunning) setSnakeDirection(event.code);
  }
});
window.addEventListener("keyup", (event) => pongKeys.delete(event.code));
window.addEventListener("blur", () => pongKeys.clear());

function setSnakeDirection(code) {
  const directions = {
    ArrowUp: { x: 0, y: -1 }, KeyW: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }, KeyS: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, KeyA: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }, KeyD: { x: 1, y: 0 }
  };
  const next = directions[code];
  if (next && next.x !== -snakeDirection.x && next.y !== -snakeDirection.y) queuedDirection = next;
}

drawPong();

const tttCells = [...document.querySelectorAll(".tic-tac-toe button")];
const tttStatus = document.querySelector("#ttt-status");
const tttWinningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let tttBoard = Array(9).fill("");
let tttTurn = "X";
let tttOver = false;

function finishTicTacToe() {
  const winningLine = tttWinningLines.find((line) => line.every((index) => tttBoard[index] === tttTurn));
  if (winningLine) {
    tttStatus.textContent = `${tttTurn} wins! Play again?`;
    tttOver = true;
    return true;
  }
  if (tttBoard.every(Boolean)) {
    tttStatus.textContent = "A lovely draw. Play again?";
    tttOver = true;
    return true;
  }
  return false;
}

tttCells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (tttOver || tttBoard[index]) return;
    tttBoard[index] = tttTurn;
    cell.textContent = tttTurn;
    cell.setAttribute("aria-label", `${cell.getAttribute("aria-label")}, ${tttTurn}`);
    cell.disabled = true;
    if (!finishTicTacToe()) {
      tttTurn = tttTurn === "X" ? "O" : "X";
      tttStatus.textContent = `Your turn: ${tttTurn}`;
    }
  });
});

document.querySelector(".ttt-reset").addEventListener("click", () => {
  tttBoard = Array(9).fill("");
  tttTurn = "X";
  tttOver = false;
  tttStatus.textContent = "Your turn: X";
  tttCells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.setAttribute("aria-label", `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`);
  });
});

const memoryBoard = document.querySelector("#memory-board");
const memoryStatus = document.querySelector("#memory-status");
const memorySymbols = ["🐼", "🎋", "🍵", "🌸", "🎮", "⭐", "🍡", "🦋"];
let memoryCards = [];
let memoryOpenCards = [];
let memoryMatchedCards = new Set();
let memoryLocked = false;
let memoryTurnCount = 0;
let memoryFlipTimer;

function startMemoryGame() {
  window.clearTimeout(memoryFlipTimer);
  memoryCards = [...memorySymbols, ...memorySymbols].map((symbol, index) => ({ id: index, symbol }));
  for (let i = memoryCards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
  }
  memoryOpenCards = [];
  memoryMatchedCards = new Set();
  memoryLocked = false;
  memoryTurnCount = 0;
  memoryStatus.textContent = "Find the matching pairs!";
  memoryBoard.replaceChildren();
  memoryCards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "memory-card is-hidden";
    button.type = "button";
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `Hidden card ${index + 1}`);
    button.textContent = "✿";
    button.addEventListener("click", () => flipMemoryCard(button, card, index));
    memoryBoard.append(button);
  });
}

function flipMemoryCard(button, card, index) {
  if (memoryLocked || memoryMatchedCards.has(card.symbol) || memoryOpenCards.some((open) => open.card.id === card.id)) return;
  button.classList.remove("is-hidden");
  button.textContent = card.symbol;
  button.setAttribute("aria-label", `Card ${index + 1}: ${card.symbol}`);
  memoryOpenCards.push({ card, button });
  if (memoryOpenCards.length < 2) return;
  memoryTurnCount += 1;
  const [first, second] = memoryOpenCards;
  if (first.card.symbol === second.card.symbol) {
    memoryMatchedCards.add(card.symbol);
    first.button.disabled = true;
    second.button.disabled = true;
    memoryOpenCards = [];
    const pairsFound = memoryMatchedCards.size;
    memoryStatus.textContent = pairsFound === memorySymbols.length
      ? `You found them all in ${memoryTurnCount} turns!`
      : `${pairsFound} of ${memorySymbols.length} pairs · ${memoryTurnCount} turns`;
    return;
  }
  memoryLocked = true;
  memoryStatus.textContent = "Not a pair — try to remember them!";
  memoryFlipTimer = window.setTimeout(() => {
    for (const open of memoryOpenCards) {
      open.button.textContent = "✿";
      open.button.classList.add("is-hidden");
      open.button.setAttribute("aria-label", `Hidden card ${memoryCards.indexOf(open.card) + 1}`);
    }
    memoryOpenCards = [];
    memoryLocked = false;
    memoryStatus.textContent = "Find the matching pairs!";
  }, 850);
}

document.querySelector("#memory-reset").addEventListener("click", startMemoryGame);
startMemoryGame();

const rpsChoices = ["rock", "paper", "scissors"];
const rpsEmojis = { rock: "✊", paper: "✋", scissors: "✌️" };
const rpsBeats = { rock: "scissors", paper: "rock", scissors: "paper" };
const rpsResult = document.querySelector("#rps-result");
const rpsScore = document.querySelector("#rps-score");
let rpsPlayerScore = 0;
let rpsPandaScore = 0;

function updateRpsScore() {
  rpsScore.textContent = `You ${rpsPlayerScore} · Panda ${rpsPandaScore}`;
}

document.querySelectorAll(".rps-board button").forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const pandaChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];
    if (playerChoice === pandaChoice) {
      rpsResult.textContent = `You both chose ${rpsEmojis[playerChoice]} — it's a tie!`;
    } else if (rpsBeats[playerChoice] === pandaChoice) {
      rpsPlayerScore += 1;
      rpsResult.textContent = `${rpsEmojis[playerChoice]} beats ${rpsEmojis[pandaChoice]} — you win this round!`;
    } else {
      rpsPandaScore += 1;
      rpsResult.textContent = `${rpsEmojis[pandaChoice]} beats ${rpsEmojis[playerChoice]} — panda wins this round!`;
    }
    updateRpsScore();
  });
});

document.querySelector("#rps-reset").addEventListener("click", () => {
  rpsPlayerScore = 0;
  rpsPandaScore = 0;
  rpsResult.textContent = "Pick your move to start!";
  updateRpsScore();
});

const popBoard = document.querySelector("#pop-board");
const popHoles = [...popBoard.querySelectorAll("button")];
const popStatus = document.querySelector("#pop-status");
let popTimer;
let popRoundTimer;
let popActiveIndex = -1;
let popScore = 0;
let popSeconds = 15;

function movePopTarget() {
  popHoles.forEach((hole, index) => {
    const active = index === popActiveIndex;
    hole.classList.toggle("is-active", active);
    hole.textContent = active ? "🐼" : "";
    hole.setAttribute("aria-label", active ? "Panda! Tap to score" : "Empty spot");
  });
}

function endPopGame() {
  window.clearInterval(popTimer);
  window.clearInterval(popRoundTimer);
  popActiveIndex = -1;
  movePopTarget();
  popStatus.textContent = `Time! You caught ${popScore} pandas.`;
  document.querySelector("#pop-start").disabled = false;
}

document.querySelector("#pop-start").addEventListener("click", (event) => {
  window.clearInterval(popTimer);
  window.clearInterval(popRoundTimer);
  popScore = 0;
  popSeconds = 15;
  popActiveIndex = Math.floor(Math.random() * popHoles.length);
  const startButton = event.currentTarget;
  startButton.disabled = true;
  popStatus.textContent = `Catch as many as you can! ${popSeconds}s · Score: ${popScore}`;
  movePopTarget();
  popRoundTimer = window.setInterval(() => {
    popActiveIndex = (popActiveIndex + 1 + Math.floor(Math.random() * (popHoles.length - 1))) % popHoles.length;
    movePopTarget();
  }, 850);
  popTimer = window.setInterval(() => {
    popSeconds -= 1;
    if (popSeconds <= 0) {
      endPopGame();
      return;
    }
    popStatus.textContent = `Catch as many as you can! ${popSeconds}s · Score: ${popScore}`;
  }, 1000);
});

popHoles.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (index !== popActiveIndex || document.querySelector("#pop-start").disabled === false) return;
    popScore += 1;
    popStatus.textContent = `Nice catch! ${popSeconds}s · Score: ${popScore}`;
    popActiveIndex = Math.floor(Math.random() * popHoles.length);
    movePopTarget();
  });
});

const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-number");
const guessStatus = document.querySelector("#guess-status");
const guessCount = document.querySelector("#guess-count");
let secretNumber = Math.floor(Math.random() * 50) + 1;
let guessAttempts = 0;
let guessIsOver = false;

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const guess = Number(guessInput.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 50 || guessIsOver) {
    guessInput.setCustomValidity("Choose a whole number from 1 to 50.");
    guessInput.reportValidity();
    return;
  }
  guessInput.setCustomValidity("");
  guessAttempts += 1;
  guessCount.textContent = `Guesses: ${guessAttempts}`;
  if (guess === secretNumber) {
    guessStatus.textContent = `You found it in ${guessAttempts} ${guessAttempts === 1 ? "guess" : "guesses"}!`;
    guessIsOver = true;
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;
  } else {
    guessStatus.textContent = guess < secretNumber ? "A little higher!" : "A little lower!";
    guessInput.select();
  }
});

document.querySelector("#guess-reset").addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 50) + 1;
  guessAttempts = 0;
  guessIsOver = false;
  guessInput.disabled = false;
  guessInput.value = "";
  guessForm.querySelector("button").disabled = false;
  guessStatus.textContent = "Pick a number from 1 to 50.";
  guessCount.textContent = "Guesses: 0";
});

const simonBoard = document.querySelector("#simon-board");
const simonPads = [...simonBoard.querySelectorAll("button")];
const simonStatus = document.querySelector("#simon-status");
const simonRoundLabel = document.querySelector("#simon-round");
const simonStart = document.querySelector("#simon-start");
let simonSequence = [];
let simonInputIndex = 0;
let simonRoundId = 0;
let simonIsPlaying = false;

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function showSimonSequence(roundId) {
  simonIsPlaying = true;
  simonStart.disabled = true;
  simonPads.forEach((pad) => { pad.disabled = true; });
  simonStatus.textContent = "Watch the panda's pattern…";
  await wait(450);
  for (const padIndex of simonSequence) {
    if (roundId !== simonRoundId) return;
    simonPads[padIndex].classList.add("is-lit");
    await wait(450);
    simonPads[padIndex].classList.remove("is-lit");
    await wait(220);
  }
  if (roundId !== simonRoundId) return;
  simonInputIndex = 0;
  simonIsPlaying = false;
  simonStart.disabled = false;
  simonPads.forEach((pad) => { pad.disabled = false; });
  simonStatus.textContent = "Your turn — repeat the pattern!";
}

function beginSimonGame() {
  simonRoundId += 1;
  simonPads.forEach((pad) => {
    pad.classList.remove("is-lit");
    pad.disabled = false;
  });
  simonSequence = [Math.floor(Math.random() * simonPads.length)];
  simonRoundLabel.textContent = "Level: 1";
  showSimonSequence(simonRoundId);
}

simonStart.addEventListener("click", beginSimonGame);
simonPads.forEach((pad, index) => {
  pad.addEventListener("click", () => {
    if (simonIsPlaying || simonSequence.length === 0) return;
    if (index !== simonSequence[simonInputIndex]) {
      simonRoundId += 1;
      simonSequence = [];
      simonRoundLabel.textContent = "Level: 0";
      simonStatus.textContent = "Oops, not quite! Press Start to try again.";
      simonPads.forEach((item) => {
        item.disabled = true;
        item.classList.remove("is-lit");
      });
      return;
    }
    if (simonInputIndex < simonSequence.length - 1) {
      simonInputIndex += 1;
      return;
    }
    simonSequence.push(Math.floor(Math.random() * simonPads.length));
    simonRoundLabel.textContent = `Level: ${simonSequence.length}`;
    showSimonSequence(simonRoundId);
  });
});

const reactionTarget = document.querySelector("#reaction-target");
const reactionStatus = document.querySelector("#reaction-status");
const reactionStart = document.querySelector("#reaction-start");
let reactionTimer;
let reactionStartedAt = 0;
let reactionState = "idle";

function resetReactionGame() {
  window.clearTimeout(reactionTimer);
  reactionState = "waiting";
  reactionTarget.disabled = false;
  reactionTarget.classList.remove("is-ready");
  reactionTarget.textContent = "Wait for green…";
  reactionStatus.textContent = "Keep your eyes on the panda!";
  reactionStart.disabled = true;
  reactionTimer = window.setTimeout(() => {
    reactionState = "ready";
    reactionStartedAt = performance.now();
    reactionTarget.disabled = false;
    reactionTarget.classList.add("is-ready");
    reactionTarget.textContent = "TAP NOW!";
    reactionStatus.textContent = "Go go go!";
  }, 1200 + Math.floor(Math.random() * 2200));
}

reactionStart.addEventListener("click", resetReactionGame);
reactionTarget.addEventListener("click", () => {
  if (reactionState === "waiting") {
    window.clearTimeout(reactionTimer);
    reactionState = "idle";
    reactionTarget.disabled = true;
    reactionTarget.classList.remove("is-ready");
    reactionTarget.textContent = "Too soon!";
    reactionStatus.textContent = "False start! Take a breath and try again.";
    reactionStart.disabled = false;
    return;
  }
  if (reactionState !== "ready") return;
  const reactionTime = Math.round(performance.now() - reactionStartedAt);
  reactionState = "idle";
  reactionTarget.disabled = true;
  reactionTarget.classList.remove("is-ready");
  reactionTarget.textContent = `${reactionTime} ms`;
  reactionStatus.textContent = reactionTime < 250
    ? "Incredible reflexes!"
    : "Nice catch! Can you beat that?";
  reactionStart.disabled = false;
});

const chatStatus = document.querySelector("#chat-connection");
const chatDot = document.querySelector(".online-dot");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatName = document.querySelector("#chat-name");
const chatInput = document.querySelector("#chat-message");
const sendButton = chatForm.querySelector("button[type=submit]");
let firebaseDatabase;
let firebaseChatRef;
let firebasePush;
let firebaseServerTimestamp;
let firebaseSet;
let chatUnsubscribe;
const displayedMessageIds = new Set();
const profanityTerms = new Set([
  "asshole", "bastard", "bitch", "bitching", "bullshit", "dammit", "damn",
  "dick", "fucker", "fucking", "fucked", "fuck", "godverdomme", "hoer",
  "kanker", "klootzak", "kurwa", "kut", "lul", "motherfucker", "prick",
  "shit", "shitty", "tering", "tyfus"
]);

function redactContactInfo(value, replacement = "[removed]") {
  return value
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, replacement)
    .replace(/(^|[^\w])(\+?\d[\d\s().-]{5,}\d)(?!\w)/g, (match, prefix, candidate) => {
      const digits = candidate.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15 ? `${prefix}[phone removed]` : match;
    });
}

function censorProfanity(value) {
  return value.split(/(\s+)/).map((token) => {
    const normalized = token.toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[0@]/g, "o")
      .replace(/3/g, "e")
      .replace(/\$/g, "s");
    const candidates = [
      normalized.replace(/[1!|]/g, "i").replace(/[^a-z]/g, ""),
      normalized.replace(/[1!|]/g, "u").replace(/[^a-z]/g, ""),
      normalized.replace(/[^a-z]/g, "")
    ];
    if (!candidates.some((candidate) => profanityTerms.has(candidate))) return token;
    return token.replace(/[\p{L}\p{N}]/gu, "*");
  }).join("");
}

function sanitizeChatText(value, maxLength, contactReplacement = "[removed]") {
  return censorProfanity(redactContactInfo(value.trim(), contactReplacement))
    .slice(0, maxLength);
}

function addChatMessage(name, message, system = false) {
  const item = document.createElement("li");
  item.className = system ? "chat-message system-message" : "chat-message";
  if (system) {
    item.textContent = message;
  } else {
    const sender = document.createElement("span");
    sender.className = "message-name";
    sender.textContent = name;
    const content = document.createElement("span");
    content.textContent = message;
    item.append(sender, content);
  }
  chatMessages.append(item);
  while (chatMessages.children.length > 50) {
    const removed = chatMessages.firstElementChild;
    if (removed.dataset.messageId) displayedMessageIds.delete(removed.dataset.messageId);
    removed.remove();
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setChatStatus(message, connected = false) {
  chatStatus.textContent = message;
  chatDot.classList.toggle("connected", connected);
}

function addFirebaseMessage(id, message) {
  if (displayedMessageIds.has(id)) return;
  if (!message || typeof message.name !== "string" || typeof message.text !== "string") return;
  displayedMessageIds.add(id);
  const item = document.createElement("li");
  item.className = "chat-message";
  item.dataset.messageId = id;
  const sender = document.createElement("span");
  sender.className = "message-name";
  sender.textContent = sanitizeChatText(message.name, 24);
  const content = document.createElement("span");
  content.textContent = sanitizeChatText(message.text, 240, "[contact removed]");
  item.append(sender, content);
  chatMessages.append(item);
  while (chatMessages.children.length > 50) {
    const removed = chatMessages.firstElementChild;
    if (removed.dataset.messageId) displayedMessageIds.delete(removed.dataset.messageId);
    removed.remove();
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function validFirebaseConfig(config) {
  return config && config.enabled === true &&
    ["apiKey", "authDomain", "databaseURL", "projectId", "appId"]
      .every((key) => typeof config[key] === "string" && config[key].trim() &&
        !config[key].startsWith("YOUR_"));
}

async function connectFirebaseChat() {
  if (!validFirebaseConfig(firebaseConfig)) {
    setChatStatus("Chat setup needed — follow the Firebase steps in README.");
    addChatMessage("Panda note", "The chat goes live after its Firebase project is connected. See README.md for the quick setup.", true);
    return;
  }
  try {
    const sdkVersion = "11.10.0";
    const [appSdk, authSdk, databaseSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-database.js`)
    ]);
    const app = appSdk.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseURL,
      projectId: firebaseConfig.projectId,
      appId: firebaseConfig.appId
    });
    const auth = authSdk.getAuth(app);
    const database = databaseSdk.getDatabase(app);
    if (!auth.currentUser) await authSdk.signInAnonymously(auth);
    firebaseDatabase = database;
    firebaseChatRef = databaseSdk.ref(database, "public-chat/messages");
    const chatQuery = databaseSdk.query(
      firebaseChatRef,
      databaseSdk.orderByChild("timestamp"),
      databaseSdk.limitToLast(50)
    );
    const initialMessages = await databaseSdk.get(chatQuery);
    initialMessages.forEach((snapshot) => addFirebaseMessage(snapshot.key, snapshot.val()));
    firebasePush = databaseSdk.push;
    firebaseServerTimestamp = databaseSdk.serverTimestamp;
    firebaseSet = databaseSdk.set;
    chatUnsubscribe = databaseSdk.onChildAdded(
      chatQuery,
      (snapshot) => addFirebaseMessage(snapshot.key, snapshot.val()),
      (error) => {
        console.error("Firebase chat subscription failed.", error);
        setChatStatus("Database denied chat access. Publish database.rules.json in Firebase, then reload.");
        addChatMessage("Panda note", "In Firebase Console → Realtime Database → Rules, publish the contents of database.rules.json. Then reload this page.", true);
        sendButton.disabled = true;
      }
    );
    setChatStatus("Connected — say hello!", true);
    sendButton.disabled = false;
  } catch (error) {
    console.error("Firebase chat could not connect.", error);
    setChatStatus("Chat couldn't connect. Check Firebase setup and try again.");
    addChatMessage("Panda note", "If setup looks right, check the browser console and Firebase Authentication, Database, and authorized-domain settings.", true);
    sendButton.disabled = true;
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = chatName.value.trim();
  const message = chatInput.value.trim();
  if (!name || !message) return;
  if (!firebaseDatabase || !firebaseChatRef || sendButton.disabled) {
    setChatStatus("Not connected yet — your message was not sent.");
    return;
  }
  const safeName = sanitizeChatText(name, 24);
  const safeMessage = sanitizeChatText(message, 240, "[contact removed]");
  if (!safeName || !safeMessage) {
    setChatStatus("Please enter a name and a message after filtering.", true);
    return;
  }
  if (safeName !== name || safeMessage !== message) {
    addChatMessage("Panda note", "Your message was filtered to remove contact details and profanity.", true);
  }
  chatName.value = safeName;
  chatInput.value = safeMessage;
  sendButton.disabled = true;
  firebaseSet(firebasePush(firebaseChatRef), {
    name: safeName,
    text: safeMessage,
    timestamp: firebaseServerTimestamp()
  }).then(() => {
    chatInput.value = "";
    chatInput.focus();
  }).catch((error) => {
    console.error("Could not send the Firebase chat message.", error);
    setChatStatus("Message not sent. Check your connection and try again.");
  }).finally(() => {
    sendButton.disabled = false;
  });
});

window.addEventListener("pagehide", () => {
  if (chatUnsubscribe) chatUnsubscribe();
});

sendButton.disabled = true;
setChatStatus("Connecting to the clearing…");
connectFirebaseChat();
