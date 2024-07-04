document.addEventListener('DOMContentLoaded', () => {
	const cells = document.querySelectorAll('.cell');
	const statusDisplay = document.getElementById('status');
	const resetButton = document.getElementById('reset');
	let gameActive = true;
	let currentPlayer = 'x';
	let gameState = ['', '', '', '', '', '', '', '', ''];
	
	const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
	
	if (gameState[clickedCellIndex] !== '' || !gameActive) {
		return;
	}
	
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.classList.add(currentPlayer.toLowerCase());
	clickedCell.textContent = currentPlayer;
	
	checkResult();
};

const checkResult = () => {
	let roundWon = false;
	
	for (let i = 0; i < winningConditions.length; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];
		
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			roundWon = true;
			break;
		}
	}
	
	if (roundWon) {
		statusDisplay.textContent = `${currentPlayer} has won!`;
		gameActive = false;
		return;
	}
	
	let roundDraw = !gameState.includes('');
	if(roundDraw) {
		statusDisplay.textContent = 'Game ended in a draw!';
		gameActive = false;
		return;
	}
	
	currentPlayer = currentPlayer === 'x' ? 'o' : 'x' ;
	statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
};

const handleRestartGame = () => {
	gameActive = true;
	currentPlayer = 'x';
	gameState = ['', '', '', '', '', '', '', '', ''];
	statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
	
	cells.forEach(cell => {
		cell.textContent = '';
		cell.classList.remove('x', 'o');
	});
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
});
	
	
	
