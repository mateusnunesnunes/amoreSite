// Importando os módulos necessários do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getDatabase, ref, set, get, onValue, update } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGbn67nQ61A-tYWn6eRBuxBrKWWxU52Cs",
  authDomain: "amore-fe15c.firebaseapp.com",
  projectId: "amore-fe15c",
  storageBucket: "amore-fe15c.appspot.com",
  messagingSenderId: "647213016665",
  appId: "1:647213016665:web:7fd19231ecb28d52bdb348",
  databaseURL: "https://amore-fe15c-default-rtdb.firebaseio.com/",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elementos do DOM
const gameStatus = document.getElementById("gameStatus");
const gameBoard = document.getElementById("gameBoard");
const startGameBtn = document.getElementById("startGameBtn");
const gameIdDisplay = document.getElementById("gameIdDisplay");
const gameIdElement = document.getElementById("gameId");
const joinGameInput = document.getElementById("joinGameInput");
const joinGameBtn = document.getElementById("joinGameBtn");

// Variáveis do jogo
let gameRef = null; // Referência ao jogo no Firebase

function startGame() {
  // Gera um ID único para o jogo
  const gameId = Math.random().toString(36).substring(7);
  gameRef = ref(database, `games/${gameId}`);

  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Tabuleiro vazio representado por 0s

  // Configuração inicial do jogo no Firebase
  set(gameRef, {
    board: board,
    currentPlayer: "X",
    status: "inProgress",
  });

  // Exibe o ID do jogo na interface
  gameIdDisplay.style.display = "block";
  gameIdElement.innerText = gameId;

  // Atualiza o status do jogo
  gameStatus.innerText = "É a vez do jogador X!";
  addBoardListeners();
}


// Função para entrar em um jogo existente
joinGameBtn.addEventListener("click", () => {
  const gameId = joinGameInput.value.trim();
  if (!gameId) {
    alert("Por favor, insira um ID de jogo válido.");
    return;
  }

  gameRef = ref(database, `games/${gameId}`);

  // Verifica se o jogo existe
  get(gameRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Inicia a escuta das mudanças no tabuleiro
      listenForBoardChanges();
      addBoardListeners();
      gameStatus.innerText = `Jogo ${gameId} encontrado! É a vez do jogador X.`;
    } else {
      alert("Jogo não encontrado. Verifique o ID.");
    }
  }).catch((error) => {
    console.error("Erro ao buscar os dados do jogo:", error);
  });
});


// Função para escutar mudanças no tabuleiro em tempo real
function listenForBoardChanges() {
  if (!gameRef) return;

  onValue(gameRef, (snapshot) => {
    const gameData = snapshot.val();
    if (!gameData) return;

    const { board, currentPlayer, status } = gameData;

    // Atualiza o tabuleiro na interface
    board.forEach((cell, index) => {
      const cellElement = gameBoard.children[index];
      cellElement.innerText = cell ? cell : "";
    });

    // Atualiza o status do jogo
    if (status === "inProgress") {
      gameStatus.innerText = `É a vez do jogador ${currentPlayer}!`;
    } else {
      gameStatus.innerText = status === "draw" ? "Empate!" : `O jogador ${status} venceu!`;
    }
  });
}

// Função para verificar fim de jogo
function checkGameOver(board) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6],           // Diagonais
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Retorna o jogador vencedor
    }
  }

  return board.includes(0) ? null : "draw"; // Retorna "draw" se todas as células estiverem preenchidas
}

// Atualiza o `addBoardListeners`
function addBoardListeners() {
  gameBoard.addEventListener("click", (e) => {
    if (!gameRef) return;

    const cellIndex = e.target.getAttribute("data-index");
    if (cellIndex === null) return; // Verifica se foi clicado em uma célula válida

    onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      if (!gameData) return;

      const board = gameData.board;
      const currentPlayer = gameData.currentPlayer;

      // Verifica se a célula está preenchida ou se não é a vez do jogador
      if (board[cellIndex] || currentPlayer !== currentPlayer) return;

      board[cellIndex] = currentPlayer;
      const winner = checkGameOver(board);

      update(gameRef, {
        board,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
        status: winner || "inProgress",
      });
    }, { onlyOnce: true });
  });
}

// Inicia o jogo
startGameBtn.addEventListener("click", () => {
  startGame();
  listenForBoardChanges();
});


