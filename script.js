document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Initialize the board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                showResult(`${currentPlayer} wins!`);
            } else if (isBoardFull()) {
                showResult('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Check if the board is full
    function isBoardFull() {
        return gameBoard.every(cell => cell !== '');
    }

    // Show result screen
    function showResult(message) {
        gameActive = false;
        result.textContent = message;
        result.style.display = 'block';
        resetBtn.style.display = 'block';
    }

    // Reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        result.style.display = 'none';
        resetBtn.style.display = 'none';
        clearBoard();
    }

    // Clear the board
    function clearBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Event listener for the reset button
    resetBtn.addEventListener('click', resetGame);

    // Initialize the board
    initializeBoard();
});
