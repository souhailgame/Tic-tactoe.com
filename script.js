let currentPlayer = "X";
let cells = document.querySelectorAll('.cell');
let difficulty = "medium";

function handleClick(index) {
    if (cells[index].textContent === '' && currentPlayer === "X") {
        cells[index].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
            return;
        }
        currentPlayer = "O";
        if (currentPlayer === "O") {
            if (difficulty === "easy") {
                aiMoveEasy();
            } else if (difficulty === "medium") {
                aiMoveMedium();
            } else {
                aiMoveHard();
            }
        }
    }
}

function aiMoveEasy() {
    let index = Math.floor(Math.random() * 9);
    while (cells[index].textContent !== '') {
        index = Math.floor(Math.random() * 9);
    }
    cells[index].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
        return;
    }
    currentPlayer = "X";
}

function aiMoveMedium() {
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            emptyCells.push(i);
        }
    }
    let index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    cells[index].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
        return;
    }
    currentPlayer = "X";
}

function aiMoveHard() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = currentPlayer;
            let score = minimax(cells, 0, false);
            cells[i].textContent = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    cells[move].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
        return;
    }
    currentPlayer = "X";
}

function minimax(cells, depth, isMaximizing) {
    let result = checkResult();
    if (result !== null) {
        if (result === "X") {
            return -10 + depth;
        } else if (result === "O") {
            return 10 - depth;
        } else {
            return 0;
        }
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = "O";
                let score = minimax(cells, depth + 1, false);
                cells[i].textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = "X";
                let score = minimax(cells, depth + 1, true);
                cells[i].textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkResult() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (cells[i].textContent !== '' && cells[i].textContent === cells[i + 3].textContent && cells[i].textContent === cells[i + 6].textContent) {
            return cells[i].textContent;
        }
    }
    // Check columns
    for (let i = 0; i < 9; i += 3) {
        if (cells[i].textContent !== '' && cells[i].textContent === cells[i + 1].textContent && cells[i].textContent === cells[i + 2].textContent) {
            return cells[i].textContent;
        }
    }
    // Check diagonals
    if (cells[0].textContent !== '' && cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent) {
        return cells[0].textContent;
    }
   
