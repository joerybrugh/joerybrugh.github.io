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
  sender.textContent = message.name.slice(0, 24);
  const content = document.createElement("span");
  content.textContent = message.text.slice(0, 240);
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
  sendButton.disabled = true;
  firebaseSet(firebasePush(firebaseChatRef), {
    name,
    text: message,
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
