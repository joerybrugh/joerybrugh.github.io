import { firebaseConfig } from "./firebase-config.js";

const gameTypes = [
  { name: "Four in a Row", icon: "●", description: "Connect four before the other player.", format: "2 players · local", category: "Strategy" },
  { name: "Memory Match", icon: "▦", description: "Flip cards and find all eight pairs.", format: "Solo · matching", category: "Memory" },
  { name: "Tic-Tac-Toe", icon: "×", description: "Get three in a row against the computer.", format: "Solo · vs computer", category: "Strategy" },
  { name: "Snake", icon: "⌁", description: "Eat, grow, and avoid your tail.", format: "Solo · keyboard", category: "Arcade" },
  { name: "2048", icon: "▣", description: "Slide tiles and build up to 2048.", format: "Solo · keyboard", category: "Puzzle" },
  { name: "Minesweeper", icon: "✹", description: "Reveal safe cells and flag every mine.", format: "Solo · puzzle", category: "Puzzle" },
  { name: "Hangman", icon: "Aa", description: "Guess the hidden word before the drawing is complete.", format: "Solo · word", category: "Word" },
  { name: "Simon", icon: "◉", description: "Watch the sequence and repeat it.", format: "Solo · memory", category: "Memory" },
  { name: "Whack-a-Mole", icon: "✦", description: "Catch the mole before the 20-second timer ends.", format: "Solo · timed", category: "Arcade" },
  { name: "Rock Paper Scissors", icon: "✊", description: "Pick a move and play against the computer.", format: "Solo · vs computer", category: "Quick play" }
];

const wordBank = [
  "reflect", "listen", "observe", "perspective", "signal", "affect", "notice",
  "response", "context", "emotion", "curious", "pattern", "insight", "mirror",
  "bamboo", "shadow", "focus", "memory", "reason", "empathy", "attention",
  "meaning", "question", "balance", "thought", "feeling", "social", "action",
  "neuron", "evidence", "research", "cognition", "perception", "behavior"
];
const symbols = ["◆", "●", "▲", "■", "✦", "⬟", "✚", "◉", "☾", "✧", "◇", "○"];
const factQuestions = [
  { question: "In which animals were mirror neurons first reported?", answer: "Macaque monkeys", options: ["Macaque monkeys", "Songbirds", "Dolphins", "Humans only"] },
  { question: "What did the first reported mirror neurons respond to?", answer: "Performing and observing similar actions", options: ["Performing and observing similar actions", "Hearing any sound", "Feeling another person's emotion", "Recognizing faces only"] },
  { question: "Does action observation alone prove someone feels another person's emotion?", answer: "No", options: ["No", "Yes, in every case", "Only in children", "Only during conversation"] },
  { question: "How is human mirror-neuron activity often studied?", answer: "With indirect measures", options: ["With indirect measures", "By reading thoughts directly", "Only with single-cell recordings", "With personality quizzes"] },
  { question: "Which is one distinction made in empathy research?", answer: "Affective and perspective-taking processes", options: ["Affective and perspective-taking processes", "Memory and eyesight", "Hearing and balance", "Speed and strength"] },
  { question: "Are perspective-taking and sharing another person's affect identical processes?", answer: "No", options: ["No", "Yes, always", "Only in adults", "Only when observed"] },
  { question: "What did the 2021 'dark empath' study report?", answer: "A personality profile in a research sample", options: ["A personality profile in a research sample", "A new clinical diagnosis", "A brain scan that detects motives", "A validated way to identify strangers"] },
  { question: "Is 'dark empath' a formal clinical diagnosis?", answer: "No", options: ["No", "Yes, worldwide", "Only for adults", "Only in neuroscience"] },
  { question: "Can a research label by itself diagnose another person?", answer: "No", options: ["No", "Yes, if they seem empathetic", "Yes, from a single conversation", "Only with an online quiz"] },
  { question: "Do researchers agree on every proposed role of mirror neurons?", answer: "No; their scope is debated", options: ["No; their scope is debated", "Yes; every role is settled", "Yes; they explain all empathy", "No research has examined them"] }
];
const directions = ["↑", "→", "↓", "←"];
const handMoves = ["rock", "paper", "scissors"];

function randomInt(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function makeChoices(answer, options) {
  return shuffled([...new Set([...options, answer])]).map((text) => ({ text, correct: text === answer }));
}

function buildChallenge(game) {
  if (game.typeIndex === 0) {
    const first = randomInt(3, 60);
    const second = randomInt(2, 20);
    const operation = randomInt(0, 2);
    const prompt = operation === 0 ? `What is ${first} + ${second}?`
      : operation === 1 ? `What is ${Math.max(first, second)} − ${Math.min(first, second)}?`
        : `What is ${first} × ${second}?`;
    const answer = operation === 0 ? first + second
      : operation === 1 ? Math.abs(first - second)
        : first * second;
    return { prompt, mode: "text", answer: String(answer), inputLabel: "Type the answer", inputType: "number" };
  }

  if (game.typeIndex === 1) {
    const step = randomInt(2, 14) * (Math.random() < .25 ? -1 : 1);
    const start = randomInt(3, 45);
    const values = Array.from({ length: 4 }, (_, index) => start + step * index);
    const answer = start + step * 4;
    return {
      prompt: `What number comes next?  ${values.join("  ·  ")}  ·  ?`,
      mode: "text",
      answer: String(answer),
      inputLabel: "Next number",
      inputType: "number"
    };
  }

  if (game.typeIndex === 2) {
    const word = wordBank[randomInt(0, wordBank.length - 1)];
    let letters = word.split("");
    for (let attempt = 0; attempt < 8 && letters.join("") === word; attempt += 1) letters = shuffled(letters);
    return {
      prompt: `Unscramble the letters:  ${letters.join("").toUpperCase()}`,
      mode: "text",
      answer: word,
      inputLabel: "Unscrambled word",
      inputType: "text"
    };
  }

  if (game.typeIndex === 3) {
    const target = symbols[randomInt(0, symbols.length - 1)];
    const tiles = Array.from({ length: 12 }, () => {
      const distractor = symbols[randomInt(0, symbols.length - 1)];
      return distractor === target ? symbols[(symbols.indexOf(target) + 1) % symbols.length] : distractor;
    });
    tiles[randomInt(0, tiles.length - 1)] = target;
    return { prompt: `Find and tap the only ${target}.`, mode: "symbol", target, tiles };
  }

  if (game.typeIndex === 4) {
    const length = randomInt(3, 6);
    const tiles = shuffled(symbols).slice(0, length);
    const sequence = shuffled(tiles);
    return { prompt: `Memorize the sequence:  ${sequence.join("  ")}`, mode: "memory", sequence, tiles };
  }

  if (game.typeIndex === 5) {
    const fact = factQuestions[randomInt(0, factQuestions.length - 1)];
    return { prompt: fact.question, mode: "choice", choices: makeChoices(fact.answer, fact.options) };
  }

  if (game.typeIndex === 6) {
    const multiplier = randomInt(2, 16);
    const offset = randomInt(2, 18);
    const target = multiplier * 3 + offset;
    return {
      prompt: `Solve for x:  3x + ${offset} = ${target}`,
      mode: "text",
      answer: String(multiplier),
      inputLabel: "Value of x",
      inputType: "number"
    };
  }

  if (game.typeIndex === 7) {
    const first = randomInt(10, 999);
    let second = randomInt(10, 999);
    while (second === first) second = randomInt(10, 999);
    const answer = String(Math.max(first, second));
    return { prompt: `Tap the larger number:  ${first}  or  ${second}`, mode: "choice", choices: makeChoices(answer, [String(first), String(second)]) };
  }

  if (game.typeIndex === 8) {
    const opponent = handMoves[randomInt(0, handMoves.length - 1)];
    const answer = opponent === "rock" ? "paper" : opponent === "paper" ? "scissors" : "rock";
    return {
      prompt: `Your opponent plays ${opponent}. Choose the move that beats it.`,
      mode: "choice",
      choices: makeChoices(answer, handMoves)
    };
  }

  const turns = randomInt(1, 3);
  const start = randomInt(0, directions.length - 1);
  const answer = directions[(start + turns) % directions.length];
  return {
    prompt: `Start at ${directions[start]} and turn clockwise ${turns} quarter-turn${turns === 1 ? "" : "s"}. Which way are you facing?`,
    mode: "choice",
    choices: makeChoices(answer, directions)
  };
}

const games = shuffled(gameTypes.map((type, typeIndex) => {
  return {
    id: typeIndex,
    typeIndex,
    title: type.name,
    type: type.name,
    icon: type.icon,
    description: type.description,
    format: type.format,
    category: type.category
  };
}));

const gameGrid = document.querySelector("#games-grid");
const gameFilter = document.querySelector("#game-filter");
const gameSearch = document.querySelector("#game-search");
const gameCount = document.querySelector("#game-count");
const gameDialog = document.querySelector("#game-dialog");
const challengeTitle = document.querySelector("#challenge-title");
const challengeType = document.querySelector("#challenge-type");
const challengePrompt = document.querySelector("#challenge-prompt");
const challengeResult = document.querySelector("#challenge-result");
const classicGame = document.querySelector("#classic-game");
const classicActions = document.querySelector("#classic-actions");
let activeGame;
let gameTimers = [];

for (const category of [...new Set(gameTypes.map((type) => type.category))]) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  gameFilter.append(option);
}

function renderGames() {
  const query = gameSearch.value.trim().toLocaleLowerCase();
  const selectedType = gameFilter.value;
  const visibleGames = games.filter((game) =>
    (selectedType === "all" || game.category === selectedType) &&
    `${game.title} ${game.category} ${game.description}`.toLocaleLowerCase().includes(query)
  );
  const fragment = document.createDocumentFragment();
  for (const game of visibleGames) {
    const article = document.createElement("article");
    article.className = `game-card game-card-${game.id}`;
    const art = document.createElement("div");
    art.className = "game-card-art";
    art.setAttribute("aria-hidden", "true");
    const top = document.createElement("div");
    top.className = "game-card-top";
    const number = document.createElement("span");
    number.className = "game-number";
    number.textContent = `NO. ${String(game.id + 1).padStart(3, "0")}`;
    const icon = document.createElement("span");
    icon.className = "game-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = game.icon;
    top.append(number, icon);
    art.append(top);
    const title = document.createElement("h3");
    title.textContent = game.title;
    const description = document.createElement("p");
    description.textContent = game.description;
    const format = document.createElement("span");
    format.className = "game-format";
    format.textContent = game.category;
    const mode = document.createElement("span");
    mode.className = "game-mode";
    mode.textContent = game.format;
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Play ${game.title}`);
    button.addEventListener("click", () => openGame(game));
    article.append(art, title, description, format, mode, button);
    fragment.append(article);
  }
  gameGrid.replaceChildren(fragment);
  gameCount.textContent = `${visibleGames.length} of 10 games`;
  if (visibleGames.length === 0) {
    const empty = document.createElement("p");
    empty.className = "catalog-note";
    empty.textContent = "No games match that search. Try another word or game type.";
    gameGrid.append(empty);
  }
}

function openGame(game) {
  activeGame = game;
  if (!gameDialog.open) gameDialog.showModal();
  startGameRound();
}

function playRandomGame(excludeActive = false) {
  const choices = excludeActive && activeGame
    ? games.filter((game) => game.id !== activeGame.id)
    : games;
  openGame(choices[randomInt(0, choices.length - 1)]);
}

function startGameRound() {
  if (!activeGame) return;
  gameTimers.forEach((timer) => {
    if (typeof timer === "function") timer();
    else {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    }
  });
  gameTimers = [];
  classicGame.replaceChildren();
  classicActions.replaceChildren();
  challengeResult.textContent = "";
  challengeType.textContent = `HEYOKA ARCADE / ${String(activeGame.id + 1).padStart(2, "0")} OF 10`;
  challengeTitle.textContent = activeGame.type;

  const action = (label, callback, className = "button button-secondary") => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", callback);
    classicActions.append(button);
    return button;
  };
  const status = (message) => { challengeResult.textContent = message; };
  const board = (className) => {
    const element = document.createElement("div");
    element.className = className;
    classicGame.append(element);
    return element;
  };
  const schedule = (callback, delay, repeat = false) => {
    const timer = repeat ? window.setInterval(callback, delay) : window.setTimeout(callback, delay);
    gameTimers.push(timer);
    return timer;
  };
  const restart = () => startGameRound();

  if (activeGame.id === 0) {
    challengePrompt.textContent = "Two players take turns dropping discs. First to connect four wins.";
    const cells = Array(42).fill(null);
    let turn = "red";
    let finished = false;
    const grid = board("connect-four-board");
    const drop = (column) => {
      if (finished) return;
      let row = 5;
      while (row >= 0 && cells[row * 7 + column]) row -= 1;
      if (row < 0) return;
      cells[row * 7 + column] = turn;
      const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
      const count = (dr, dc) => {
        let total = 0;
        let r = row + dr;
        let c = column + dc;
        while (r >= 0 && r < 6 && c >= 0 && c < 7 && cells[r * 7 + c] === turn) {
          total += 1;
          r += dr;
          c += dc;
        }
        return total;
      };
      if (directions.some(([dr, dc]) => 1 + count(dr, dc) + count(-dr, -dc) >= 4)) {
        finished = true;
        status(`${turn === "red" ? "Red" : "Yellow"} wins!`);
      } else if (cells.every(Boolean)) {
        finished = true;
        status("It's a draw.");
      } else {
        turn = turn === "red" ? "yellow" : "red";
        status(`${turn === "red" ? "Red" : "Yellow"} to play.`);
      }
      grid.querySelectorAll("button").forEach((button, index) => {
        button.className = `connect-four-cell${cells[index] ? ` ${cells[index]}` : ""}`;
        button.disabled = finished;
      });
    };
    cells.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "connect-four-cell";
      button.setAttribute("aria-label", `Drop in column ${index % 7 + 1}, row ${Math.floor(index / 7) + 1}`);
      button.addEventListener("click", () => drop(index % 7));
      grid.append(button);
    });
    status("Red to play.");
    action("New game", restart);
  } else if (activeGame.id === 1) {
    challengePrompt.textContent = "Flip two cards at a time. Find all eight pairs in as few moves as you can.";
    const faces = shuffled(["◆", "●", "▲", "■", "✦", "☾", "♥", "★", "◆", "●", "▲", "■", "✦", "☾", "♥", "★"]);
    const matched = new Set();
    const flipped = [];
    let moves = 0;
    let locked = false;
    const grid = board("memory-game-board");
    const render = () => {
      grid.replaceChildren();
      faces.forEach((face, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `memory-game-card${flipped.includes(index) || matched.has(index) ? " face-up" : ""}${matched.has(index) ? " matched" : ""}`;
        button.textContent = flipped.includes(index) || matched.has(index) ? face : "?";
        button.setAttribute("aria-label", matched.has(index) ? `Matched ${face}` : flipped.includes(index) ? `Card ${face}` : "Hidden card");
        button.disabled = locked || matched.has(index) || flipped.includes(index);
        button.addEventListener("click", () => {
          flipped.push(index);
          if (flipped.length === 2) {
            moves += 1;
            locked = true;
            render();
            if (faces[flipped[0]] === faces[flipped[1]]) {
              flipped.forEach((cardIndex) => matched.add(cardIndex));
              flipped.length = 0;
              locked = false;
              if (matched.size === faces.length) status(`All pairs found in ${moves} moves!`);
              else { status(`${moves} moves · ${matched.size / 2} of 8 pairs`); render(); }
            } else {
              schedule(() => { flipped.length = 0; locked = false; render(); }, 750);
              status(`${moves} moves · no match`);
            }
          } else {
            render();
          }
        });
        grid.append(button);
      });
    };
    status("0 moves · 0 of 8 pairs");
    render();
    action("New deal", restart);
  } else if (activeGame.id === 2) {
    challengePrompt.textContent = "You are X. The computer is O. Get three in a row.";
    const cells = Array(9).fill("");
    let finished = false;
    const grid = board("tic-tac-toe-board");
    const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const outcome = () => {
      const line = winningLines.find(([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
      return line ? cells[line[0]] : cells.every(Boolean) ? "draw" : "";
    };
    const render = () => {
      grid.replaceChildren();
      cells.forEach((value, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `tic-tac-toe-cell${value ? ` ${value.toLowerCase()}` : ""}`;
        button.textContent = value;
        button.setAttribute("aria-label", value ? `${value}, square ${index + 1}` : `Empty square ${index + 1}`);
        button.disabled = Boolean(value) || finished;
        button.addEventListener("click", () => {
          cells[index] = "X";
          let result = outcome();
          if (!result) {
            const available = cells.map((value, cellIndex) => value ? -1 : cellIndex).filter((cellIndex) => cellIndex >= 0);
            const winningMove = (player) => available.find((cellIndex) => {
              cells[cellIndex] = player;
              const wins = outcome() === player;
              cells[cellIndex] = "";
              return wins;
            });
            const move = winningMove("O") ?? winningMove("X") ?? (cells[4] ? undefined : 4) ?? available[randomInt(0, available.length - 1)];
            cells[move] = "O";
            result = outcome();
          }
          if (result) {
            finished = true;
            status(result === "draw" ? "Draw game." : `${result} wins!`);
          } else {
            status("Your turn.");
          }
          render();
        });
        grid.append(button);
      });
    };
    status("Your turn.");
    render();
    action("New game", restart);
  } else if (activeGame.id === 3) {
    challengePrompt.textContent = "Use the arrow keys or the buttons. Eat the dots; don't hit the wall or yourself.";
    const canvas = document.createElement("canvas");
    canvas.className = "snake-board";
    canvas.width = 320;
    canvas.height = 320;
    canvas.setAttribute("aria-label", "Snake game board");
    classicGame.append(canvas);
    const context = canvas.getContext("2d");
    const size = 16;
    let snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
    let direction = { x: 1, y: 0 };
    let nextDirection = direction;
    let food = { x: 11, y: 8 };
    let running = false;
    let over = false;
    const draw = () => {
      context.fillStyle = "#19171d";
      context.fillRect(0, 0, 320, 320);
      context.fillStyle = "#d7f36a";
      context.fillRect(food.x * size + 3, food.y * size + 3, size - 6, size - 6);
      snake.forEach((part, index) => {
        context.fillStyle = index ? "#ad91de" : "#f0edf1";
        context.fillRect(part.x * size + 1, part.y * size + 1, size - 2, size - 2);
      });
    };
    let snakeInterval;
    const turn = (x, y) => {
      if (x + nextDirection.x === 0 && y + nextDirection.y === 0) return;
      nextDirection = { x, y };
      if (!running && !over) {
        running = true;
        status("Score: 0");
        snakeInterval = schedule(step, 135, true);
      }
    };
    function step() {
      if (over) return;
      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      const eating = head.x === food.x && head.y === food.y;
      const body = eating ? snake : snake.slice(0, -1);
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || body.some((part) => part.x === head.x && part.y === head.y)) {
        over = true;
        window.clearInterval(snakeInterval);
        status(`Game over · score ${snake.length - 3}`);
        return;
      }
      snake.unshift(head);
      if (eating) {
        do { food = { x: randomInt(0, 19), y: randomInt(0, 19) }; } while (snake.some((part) => part.x === food.x && part.y === food.y));
        status(`Score: ${snake.length - 3}`);
      } else snake.pop();
      draw();
    }
    const controls = document.createElement("div");
    controls.className = "snake-controls";
    [["↑",0,-1],["←",-1,0],["↓",0,1],["→",1,0]].forEach(([label, x, y]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "classic-control";
      button.textContent = label;
      button.setAttribute("aria-label", `Move ${label}`);
      button.addEventListener("click", () => turn(x, y));
      controls.append(button);
    });
    classicGame.append(controls);
    const keyHandler = (event) => {
      if (!gameDialog.open) return;
      const moves = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0], w: [0,-1], s: [0,1], a: [-1,0], d: [1,0] };
      const move = moves[event.key] || moves[event.key.toLowerCase()];
      if (move) { event.preventDefault(); turn(move[0], move[1]); }
    };
    document.addEventListener("keydown", keyHandler);
    gameTimers.push(() => document.removeEventListener("keydown", keyHandler));
    action("New game", restart);
    status("Press an arrow key or direction button to start.");
    draw();
  } else if (activeGame.id === 4) {
    challengePrompt.textContent = "Use the arrow keys, swipe, or buttons to slide. Matching numbers merge; reach 2048.";
    let tiles = Array(16).fill(0);
    let finished = false;
    let won = false;
    let score = 0;
    const grid = board("tile-game-board");
    const addTile = () => {
      const empty = tiles.map((value, index) => value ? -1 : index).filter((index) => index >= 0);
      if (empty.length) tiles[empty[randomInt(0, empty.length - 1)]] = Math.random() < .9 ? 2 : 4;
    };
    const render = () => {
      grid.replaceChildren();
      tiles.forEach((value) => {
        const cell = document.createElement("div");
        cell.className = `tile-game-cell${value ? ` tile-${Math.min(value, 2048)}` : ""}`;
        cell.textContent = value ? String(value) : "";
        grid.append(cell);
      });
      status(`Score: ${score} · Best tile: ${Math.max(...tiles)}`);
    };
    const move = (direction) => {
      if (finished) return;
      const previous = [...tiles];
      for (let line = 0; line < 4; line += 1) {
        const indices = Array.from({ length: 4 }, (_, offset) => direction === "left" ? line * 4 + offset
          : direction === "right" ? line * 4 + 3 - offset
            : direction === "up" ? offset * 4 + line : (3 - offset) * 4 + line);
        const values = indices.map((index) => tiles[index]).filter(Boolean);
        for (let index = 0; index < values.length - 1; index += 1) {
          if (values[index] === values[index + 1]) {
            values[index] *= 2;
            score += values[index];
            values.splice(index + 1, 1);
          }
        }
        while (values.length < 4) values.push(0);
        indices.forEach((index, offset) => { tiles[index] = values[offset]; });
      }
      if (tiles.every((value, index) => value === previous[index])) return;
      addTile();
      render();
      if (tiles.includes(2048) && !won) {
        won = true;
        status("2048! You win. Keep going or start a new game.");
      }
      const hasMoves = tiles.includes(0) || tiles.some((value, index) =>
        index % 4 < 3 && value === tiles[index + 1] ||
        index < 12 && value === tiles[index + 4]
      );
      if (!hasMoves) {
        finished = true;
        status("No more moves. Start a new game to play again.");
      }
    };
    addTile();
    addTile();
    render();
    const keyHandler = (event) => {
      if (!gameDialog.open) return;
      const directionsByKey = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
      if (directionsByKey[event.key]) { event.preventDefault(); move(directionsByKey[event.key]); }
    };
    document.addEventListener("keydown", keyHandler);
    gameTimers.push(() => document.removeEventListener("keydown", keyHandler));
    let touchStart;
    grid.addEventListener("pointerdown", (event) => {
      touchStart = { x: event.clientX, y: event.clientY };
    });
    grid.addEventListener("pointerup", (event) => {
      if (!touchStart) return;
      const deltaX = event.clientX - touchStart.x;
      const deltaY = event.clientY - touchStart.y;
      touchStart = undefined;
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 30) return;
      move(Math.abs(deltaX) > Math.abs(deltaY)
        ? deltaX > 0 ? "right" : "left"
        : deltaY > 0 ? "down" : "up");
    });
    [["←","left"],["↑","up"],["↓","down"],["→","right"]].forEach(([label, direction]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "classic-control";
      button.textContent = label;
      button.setAttribute("aria-label", `Move ${direction}`);
      button.addEventListener("click", () => move(direction));
      classicActions.append(button);
    });
    action("New game", restart);
  } else if (activeGame.id === 5) {
    challengePrompt.textContent = "Reveal every safe square. Right-click a cell or use flag mode to mark suspected mines.";
    const width = 8;
    const mineCount = 10;
    const mines = new Set();
    let minesPlaced = false;
    const revealed = new Set();
    const flags = new Set();
    let flagMode = false;
    let finished = false;
    const grid = board("minesweeper-board");
    const neighboring = (index) => {
      const row = Math.floor(index / width);
      const column = index % width;
      const around = [];
      for (let dr = -1; dr <= 1; dr += 1) for (let dc = -1; dc <= 1; dc += 1) {
        const r = row + dr;
        const c = column + dc;
        if ((dr || dc) && r >= 0 && r < width && c >= 0 && c < width) around.push(r * width + c);
      }
      return around;
    };
    const render = () => {
      grid.replaceChildren();
      for (let index = 0; index < width * width; index += 1) {
        const button = document.createElement("button");
        button.type = "button";
        const isRevealed = revealed.has(index);
        const adjacent = neighboring(index).filter((cell) => mines.has(cell)).length;
        button.className = `mine-cell${isRevealed ? " revealed" : ""}${mines.has(index) && finished ? " mine" : ""}`;
        button.textContent = finished && mines.has(index) ? "✹"
          : flags.has(index) && !isRevealed ? "⚑"
            : isRevealed ? (mines.has(index) ? "✹" : adjacent || "") : "";
        button.setAttribute("aria-label", finished && mines.has(index) ? "Mine"
          : flags.has(index) ? "Flagged square"
            : isRevealed ? `Revealed square${adjacent ? `, ${adjacent} nearby mines` : ""}` : "Hidden square");
        button.disabled = finished || isRevealed;
        const reveal = () => {
          if (finished) return;
          if (flagMode) {
            if (flags.has(index)) flags.delete(index); else flags.add(index);
          } else if (flags.has(index)) {
            return;
          } else {
            if (!minesPlaced) {
            const safeCells = new Set([index, ...neighboring(index)]);
            const available = Array.from({ length: width * width }, (_, cell) => cell)
              .filter((cell) => !safeCells.has(cell));
            shuffled(available).slice(0, mineCount).forEach((cell) => mines.add(cell));
            minesPlaced = true;
            }
            if (mines.has(index)) {
            finished = true;
            status("Boom! You hit a mine. Start a new board.");
            } else {
            const revealCell = (cell) => {
              if (revealed.has(cell) || mines.has(cell)) return;
              revealed.add(cell);
              if (neighboring(cell).every((neighbor) => !mines.has(neighbor))) neighboring(cell).forEach(revealCell);
            };
            revealCell(index);
            if (revealed.size === width * width - mineCount) {
              finished = true;
              status("Board cleared! You found every safe square.");
            }
            }
          }
          render();
        };
        button.addEventListener("click", reveal);
        button.addEventListener("contextmenu", (event) => { event.preventDefault(); flagMode = true; reveal(); flagMode = false; });
        grid.append(button);
      }
      if (!finished) status(`${flags.size} flags · ${revealed.size} safe squares revealed`);
    };
    render();
    action("Flag mode: off", (event) => {
      flagMode = !flagMode;
      event.currentTarget.textContent = `Flag mode: ${flagMode ? "on" : "off"}`;
    });
    action("New board", restart);
  } else if (activeGame.id === 6) {
    challengePrompt.textContent = "Guess the hidden word one letter at a time. You have six misses.";
    const word = wordBank[randomInt(0, wordBank.length - 1)].toUpperCase();
    const guessed = new Set();
    const misses = new Set();
    const wordDisplay = document.createElement("p");
    wordDisplay.className = "hangman-word";
    classicGame.append(wordDisplay);
    const gallows = document.createElement("p");
    gallows.className = "hangman-drawing";
    classicGame.append(gallows);
    const keyboard = board("hangman-keyboard");
    const wrongPictures = ["", "◔", "◔\n │", "◔\n╱│", "◔\n╱│╲", "◔\n╱│╲\n╱", "◔\n╱│╲\n╱ ╲"];
    const render = () => {
      wordDisplay.textContent = [...word].map((letter) => guessed.has(letter) ? letter : "_").join(" ");
      gallows.textContent = wrongPictures[misses.size];
      keyboard.replaceChildren();
      for (let code = 65; code <= 90; code += 1) {
        const letter = String.fromCharCode(code);
        const key = document.createElement("button");
        key.type = "button";
        key.className = "hangman-key";
        key.textContent = letter;
        key.disabled = guessed.has(letter) || misses.size >= 6 || [...word].every((item) => guessed.has(item));
        key.addEventListener("click", () => {
          guessed.add(letter);
          if (!word.includes(letter)) misses.add(letter);
          if ([...word].every((item) => guessed.has(item))) status(`You got it: ${word}!`);
          else if (misses.size === 6) status(`The word was ${word}. Try again!`);
          else status(`${6 - misses.size} guesses left`);
          render();
        });
        keyboard.append(key);
      }
    };
    status("6 guesses left");
    render();
    action("New word", restart);
  } else if (activeGame.id === 7) {
    challengePrompt.textContent = "Watch the color sequence, then repeat it. Each round adds one more step.";
    const colors = ["green", "violet", "rose", "blue"];
    let sequence = [];
    let inputIndex = 0;
    let locked = true;
    let runId = 0;
    const grid = board("simon-board");
    const pads = colors.map((color, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `simon-pad ${color}`;
      button.setAttribute("aria-label", `${color} pad`);
      button.addEventListener("click", () => {
        if (locked || !sequence.length) return;
        button.classList.add("lit");
        schedule(() => button.classList.remove("lit"), 160);
        if (index !== sequence[inputIndex]) {
          locked = true;
          status(`Wrong sequence. You reached level ${sequence.length - 1}.`);
          return;
        }
        inputIndex += 1;
        if (inputIndex === sequence.length) {
          locked = true;
          status(`Level ${sequence.length} complete!`);
          schedule(playRound, 600);
        }
      });
      grid.append(button);
      return button;
    });
    async function playRound() {
      const thisRun = runId;
      sequence.push(randomInt(0, pads.length - 1));
      inputIndex = 0;
      locked = true;
      status(`Watch · level ${sequence.length}`);
      for (const padIndex of sequence) {
        if (thisRun !== runId) return;
        await new Promise((resolve) => schedule(resolve, 420));
        pads[padIndex].classList.add("lit");
        await new Promise((resolve) => schedule(resolve, 320));
        pads[padIndex].classList.remove("lit");
      }
      if (thisRun === runId) {
        locked = false;
        status(`Your turn · level ${sequence.length}`);
      }
    }
    action("Start sequence", () => { runId += 1; sequence = []; playRound(); }, "button button-primary");
    action("New game", restart);
  } else if (activeGame.id === 8) {
    challengePrompt.textContent = "Click the mole when it appears. Score as many as you can in 20 seconds.";
    const grid = board("mole-board");
    let score = 0;
    let seconds = 20;
    let active = -1;
    let running = false;
    const render = () => {
      grid.replaceChildren();
      for (let index = 0; index < 9; index += 1) {
        const hole = document.createElement("button");
        hole.type = "button";
        hole.className = `mole-hole${index === active ? " has-mole" : ""}`;
        hole.textContent = index === active ? "●" : "";
        hole.setAttribute("aria-label", index === active ? "Whack the mole!" : "Empty hole");
        hole.addEventListener("click", () => {
          if (running && index === active) {
            score += 1;
            active = -1;
            status(`${seconds}s left · score ${score}`);
            render();
          }
        });
        grid.append(hole);
      }
    };
    render();
    let roundInterval;
    let moleInterval;
    action("Start 20 seconds", () => {
      if (running) return;
      running = true;
      score = 0;
      seconds = 20;
      status(`${seconds}s left · score ${score}`);
      active = randomInt(0, 8);
      render();
      moleInterval = schedule(() => {
        if (running) {
          active = randomInt(0, 8);
          render();
        }
      }, 650, true);
      roundInterval = schedule(() => {
        if (!running) return;
        seconds -= 1;
        if (seconds <= 0) {
          running = false;
          active = -1;
          status(`Time! Final score: ${score}`);
          window.clearInterval(roundInterval);
          window.clearInterval(moleInterval);
        } else status(`${seconds}s left · score ${score}`);
        render();
      }, 1000, true);
    }, "button button-primary");
    action("New game", restart);
  } else {
    challengePrompt.textContent = "Choose rock, paper, or scissors. First to five wins.";
    const grid = board("rps-board");
    const score = { you: 0, computer: 0 };
    const moves = ["Rock", "Paper", "Scissors"];
    const beats = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };
    const scoreDisplay = document.createElement("p");
    scoreDisplay.className = "rps-score";
    classicGame.append(scoreDisplay);
    moves.forEach((move) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rps-choice";
      button.textContent = move;
      button.addEventListener("click", () => {
        const computer = moves[randomInt(0, 2)];
        const result = move === computer ? "Tie round."
          : beats[move] === computer ? (score.you += 1, "You win this round!")
            : (score.computer += 1, "Computer wins this round.");
        scoreDisplay.textContent = `You ${score.you} · ${score.computer} Computer`;
        status(`${result} You: ${move} · Computer: ${computer}`);
        if (score.you === 5 || score.computer === 5) {
          status(`${score.you === 5 ? "You win the match!" : "Computer wins the match!"} ${result}`);
          grid.querySelectorAll("button").forEach((choice) => { choice.disabled = true; });
        }
      });
      grid.append(button);
    });
    scoreDisplay.textContent = "You 0 · 0 Computer";
    action("New match", restart);
  }

  action("Try another game", () => playRandomGame(true));
}

document.querySelectorAll("[data-random-game]").forEach((button) => {
  button.addEventListener("click", () => playRandomGame());
});
gameSearch.addEventListener("input", renderGames);
gameFilter.addEventListener("change", renderGames);
gameDialog.addEventListener("close", () => {
  gameTimers.forEach((timer) => {
    if (typeof timer === "function") timer();
    else { window.clearInterval(timer); window.clearTimeout(timer); }
  });
  gameTimers = [];
});
renderGames();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a, [data-open-chat]")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }
});

const chatDialog = document.querySelector("#chat-dialog");
const chatBubble = document.querySelector("#chat-bubble");
const chatBadge = document.querySelector("#chat-badge");
const chatToast = document.querySelector("#chat-toast");
let unreadCount = 0;
let toastTimer;

function setUnreadCount(count) {
  unreadCount = count;
  chatBadge.hidden = count === 0;
  chatBadge.textContent = count > 9 ? "9+" : String(count);
  chatBubble.setAttribute("aria-label", count > 0 ? `Open community chat, ${count} new notes` : "Open community chat");
}

function showChatNote(message, notify = false) {
  chatToast.textContent = message;
  chatToast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { chatToast.hidden = true; }, 5000);
  if (notify && !chatDialog.open) setUnreadCount(unreadCount + 1);
}

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!chatDialog.open) chatDialog.showModal();
    setUnreadCount(0);
    chatToast.hidden = true;
  });
});
chatDialog.addEventListener("close", () => {
  if (unreadCount === 0) chatToast.hidden = true;
});

const chatStatus = document.querySelector("#chat-connection");
const chatDot = document.querySelector(".chat-status-dot");
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
  "asshole", "bastard", "bitch", "bullshit", "dammit", "damn", "dick",
  "fucker", "fucking", "fuck", "godverdomme", "hoer", "kanker",
  "klootzak", "kurwa", "kut", "lul", "motherfucker", "prick", "shit",
  "shitty", "tering", "tyfus"
]);

function sanitizeChatText(value, maxLength) {
  const withoutContactInfo = value.trim()
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[contact removed]")
    .replace(/(^|[^\w])(\+?\d[\d\s().-]{5,}\d)(?!\w)/g, (match, prefix, candidate) => {
      const digits = candidate.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15 ? `${prefix}[contact removed]` : match;
    });
  return withoutContactInfo.split(/(\s+)/).map((token) => {
    const normalized = token.toLocaleLowerCase().normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[0@]/g, "o").replace(/3/g, "e")
      .replace(/\$/g, "s").replace(/[1!|]/g, "i").replace(/[^a-z]/g, "");
    return profanityTerms.has(normalized) ? token.replace(/[\p{L}\p{N}]/gu, "*") : token;
  }).join("").slice(0, maxLength);
}

function appendChatMessage(name, message, system = false, id = "") {
  const item = document.createElement("li");
  item.className = system ? "chat-message system-message" : "chat-message";
  if (id) item.dataset.messageId = id;
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
  while (chatMessages.children.length > 50) chatMessages.firstElementChild.remove();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setChatStatus(message, connected = false) {
  chatStatus.textContent = message;
  chatDot.classList.toggle("connected", connected);
}

function addFirebaseMessage(id, message, notify = false) {
  if (!id || displayedMessageIds.has(id) || !message ||
      typeof message.name !== "string" || typeof message.text !== "string") return;
  displayedMessageIds.add(id);
  const name = sanitizeChatText(message.name, 24);
  const text = sanitizeChatText(message.text, 240);
  appendChatMessage(name, text, false, id);
  if (notify) showChatNote("A new note arrived in the community chat.", true);
}

function validFirebaseConfig(config) {
  return config && config.enabled === true &&
    ["apiKey", "authDomain", "databaseURL", "projectId", "appId"]
      .every((key) => typeof config[key] === "string" && config[key].trim() && !config[key].startsWith("YOUR_"));
}

async function connectFirebaseChat() {
  if (!validFirebaseConfig(firebaseConfig)) {
    setChatStatus("Chat setup needed — see README for Firebase steps.");
    appendChatMessage("System note", "Live chat needs Firebase configuration. The game catalog and journal work without it.", true);
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
    if (!auth.currentUser) await authSdk.signInAnonymously(auth);
    firebaseDatabase = databaseSdk.getDatabase(app);
    firebaseChatRef = databaseSdk.ref(firebaseDatabase, "public-chat/messages");
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
      (snapshot) => addFirebaseMessage(snapshot.key, snapshot.val(), true),
      (error) => {
        console.error("Firebase chat subscription failed.", error);
        setChatStatus("Database denied access. Publish database.rules.json in Firebase.");
        appendChatMessage("System note", "Chat access failed. Check the Firebase Realtime Database rules and reload.", true);
        sendButton.disabled = true;
      }
    );
    setChatStatus("Connected — messages are public.", true);
    sendButton.disabled = false;
  } catch (error) {
    console.error("Firebase chat could not connect.", error);
    setChatStatus("Chat could not connect. Check the Firebase setup.");
    appendChatMessage("System note", "Connection failed. The games and journal remain available.", true);
    sendButton.disabled = true;
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rawName = chatName.value.trim();
  const rawMessage = chatInput.value.trim();
  if (!rawName || !rawMessage) return;
  if (!firebaseDatabase || !firebaseChatRef || sendButton.disabled) {
    setChatStatus("Not connected — your note was not sent.");
    return;
  }
  const name = sanitizeChatText(rawName, 24);
  const message = sanitizeChatText(rawMessage, 240);
  if (!name || !message) {
    setChatStatus("Enter a name and a message after filtering.");
    return;
  }
  if (name !== rawName || message !== rawMessage) {
    appendChatMessage("System note", "Contact details and some profanity were filtered before sending.", true);
  }
  chatName.value = name;
  chatInput.value = message;
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
setChatStatus("Connecting to the community chat…");
connectFirebaseChat();
