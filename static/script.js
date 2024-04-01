document.addEventListener("DOMContentLoaded", function() {
    const startPage = document.getElementById('start-page');
    const gamePage = document.getElementById('game-page');
    const startButton = document.getElementById('start-button');
    const board = document.getElementById('board');
    const squares = [];
    let selectedPiece = null; // Track the currently selected piece

    startButton.addEventListener('click', function() {
        startPage.style.display = 'none';
        gamePage.style.display = 'block';
        initializeBoard();
    });

    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                if ((i + j) % 2 === 0) {
                    square.classList.add('black');
                }
                square.dataset.row = i;
                square.dataset.col = j;
                squares.push(square);
                board.appendChild(square);
            }
        }
        setupPieces();
    }

    function setupPieces() {
        const pawnRow = 'P'.repeat(9);
        const blackRow = 'LNSGKGSGNL' + 'R' + pawnRow;
        const whiteRow = 'LNSGKGSGNL' + 'r' + pawnRow.toLowerCase();
    
        placeRow(0, blackRow, 'black');
        placeRow(1, pawnRow, 'black');
        placeRow(7, pawnRow, 'white');
        placeRow(8, whiteRow, 'white');
    }
    
    function placeRow(row, pieces, color) {
        for (let col = 0; col < 9; col++) {
            placePiece(col, row, pieces.charAt(col), color);
        }
    }    

    function placePiece(col, row, piece, color) {
        const index = row * 9 + col;
        const square = squares[index];
        square.innerText = piece;
        square.dataset.piece = piece;
        square.dataset.color = color;

        // Add draggable attribute to the square
        square.draggable = true;

        // Add event listeners for drag and drop
        square.addEventListener('dragstart', handleDragStart);
        square.addEventListener('dragover', handleDragOver);
        square.addEventListener('drop', handleDrop);
    }

    function handleDragStart(event) {
        // Set data to be dragged
        const square = event.target;
        event.dataTransfer.setData('text/plain', square.dataset.piece);
    
        // Set selected piece
        selectedPiece = square;
    
        // Store the position of the selected piece
        const startRow = parseInt(square.dataset.row);
        const startCol = parseInt(square.dataset.col);
        selectedPiece.dataset.startRow = startRow;
        selectedPiece.dataset.startCol = startCol;
    }    

    function handleDragOver(event) {
        // Allow drop
        event.preventDefault();
    
        // Highlight valid target squares
        const square = event.target;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const startRow = parseInt(selectedPiece.dataset.startRow);
        const startCol = parseInt(selectedPiece.dataset.startCol);
        const pieceType = selectedPiece.dataset.piece;
        const isValidDrop = isValidMovement(pieceType, startRow, startCol, row, col);
        if (isValidDrop) {
            square.classList.add('highlight');
        }
    }
    

    function handleDrop(event) {
        // Prevent default action (open as link for some elements)
        event.preventDefault();
    
        // Get dropped data
        const piece = event.dataTransfer.getData('text/plain');
    
        // Drop the piece onto the square
        const square = event.target;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
    
        // Get the type of piece being dropped
        const pieceType = selectedPiece.dataset.piece;
    
        // Validate if the drop is allowed according to the movement rules of the piece
        const isValidDrop = isValidMovement(pieceType, row, col);
    
        if (isValidDrop) {
            // Set dropped piece data
            square.innerText = piece;
            square.dataset.piece = piece;
            square.dataset.color = selectedPiece.dataset.color;
    
            // Remove piece from original square
            selectedPiece.innerText = '';
            selectedPiece.dataset.piece = '';
    
            // Reset selection
            selectedPiece = null;
        } else {
            // Invalid drop, reset selection
            selectedPiece = null;
        }
    }
    
    function isValidMovement(pieceType, row, col) {
        // Define movement rules for each piece type
        const movementRules = {
            'R': (pieceRow, pieceCol, targetRow, targetCol) => pieceRow === targetRow || pieceCol === targetCol,
            'B': (pieceRow, pieceCol, targetRow, targetCol) => Math.abs(pieceRow - targetRow) === Math.abs(pieceCol - targetCol),
            'G': (pieceRow, pieceCol, targetRow, targetCol) => Math.abs(pieceRow - targetRow) <= 1 && Math.abs(pieceCol - targetCol) <= 1,
            'S': (pieceRow, pieceCol, targetRow, targetCol) => (Math.abs(pieceRow - targetRow) <= 1 && Math.abs(pieceCol - targetCol) <= 1) &&
                                                            (Math.abs(pieceRow - targetRow) + Math.abs(pieceCol - targetCol) <= 2),
            'N': (pieceRow, pieceCol, targetRow, targetCol) => (Math.abs(pieceRow - targetRow) === 2 && Math.abs(pieceCol - targetCol) === 1) ||
                                                            (Math.abs(pieceRow - targetRow) === 1 && Math.abs(pieceCol - targetCol) === 2),
            'L': (pieceRow, pieceCol, targetRow, targetCol) => pieceCol === targetCol,
            'P': (pieceRow, pieceCol, targetRow, targetCol) => pieceCol === targetCol && Math.abs(pieceRow - targetRow) === 1
        };
    
        // Get the row and column of the piece being dropped
        const pieceRow = parseInt(selectedPiece.dataset.row);
        const pieceCol = parseInt(selectedPiece.dataset.col);
    
        // Check if the drop is valid according to the movement rules of the piece
        return movementRules[pieceType](pieceRow, pieceCol, row, col);
    }    
    
});
