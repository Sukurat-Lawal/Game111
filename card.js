
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
  
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    const isSpotEmpty = (index) => board[index] === '';
  
    const markSpot = (index, marker) => {
      if (isSpotEmpty(index)) {
        board[index] = marker;
        return true; 
      }
      return false; 
    };
  
    const checkWin = () => {
    };
  
    const checkTie = () => {
    };
  
    return {
      getBoard,
      resetBoard,
      markSpot,
      checkWin,
      checkTie
    };
  })();
  
  const Player = (name, marker) => {
    return { name, marker };
  };
  
  const GameController = (() => {
    let currentPlayer;
    let player1;
    let player2;
    let gameOver = false;
  
    const startGame = () => {
      const player1Name = document.getElementById('player1-name').value || 'Player 1';
      const player2Name = document.getElementById('player2-name').value || 'Player 2';
      player1 = Player(player1Name, 'X');
      player2 = Player(player2Name, 'O');
      currentPlayer = player1;
      gameOver = false;
      Gameboard.resetBoard();
      DisplayController.renderBoard(Gameboard.getBoard());
      DisplayController.showTurn(currentPlayer.name);
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.showTurn(currentPlayer.name);
    };
  
    const playTurn = (index) => {
      if (!gameOver && Gameboard.markSpot(index, currentPlayer.marker)) {
        DisplayController.renderBoard(Gameboard.getBoard());
  
        if (Gameboard.checkWin()) {
          gameOver = true;
          DisplayController.showResult(`${currentPlayer.name} wins!`);
        } else if (Gameboard.checkTie()) {
          gameOver = true;
          DisplayController.showResult("It's a tie!");
        } else {
          switchPlayer();
        }
      }
    };
  
    return {
      startGame,
      playTurn
    };
  })();
  
  const DisplayController = (() => {
    const boardContainer = document.querySelector('.board-container');
    const gameResult = document.getElementById('game-result');
  
    const renderBoard = (board) => {
      boardContainer.innerHTML = '';
      board.forEach((cell, index) => {
        const square = document.createElement('div');
        square.classList.add('board-square');
        square.textContent = cell;
        square.addEventListener('click', () => {
          if (cell === '' && !GameController.gameOver) {
            GameController.playTurn(index);
          }
        });
        boardContainer.appendChild(square);
      });
    };
  
    const showTurn = (playerName) => {
      gameResult.textContent = `${playerName}'s turn`;
    };
  
    const showResult = (result) => {
      gameResult.textContent = result;
    };
  
    return {
      renderBoard,
      showTurn,
      showResult
    };
  })();
  
  document.getElementById('start-game').addEventListener('click', GameController.startGame);
  
  document.getElementById('restart-game').addEventListener('click', GameController.startGame);