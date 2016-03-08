var winners = [
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
];

/* var whosTurn = 1 */
var playerOneMarkings = [];
var playerTwoMarkings = [];

function addSymbol(element) {
	var gameHeader = document.getElementById('game-header')
	if (element.innerHTML == '') {
		//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
		element.innerHTML = 'X';
		/* whosTurn = 2;
		gameHeader.innerHTML = "player 2's turn";
		gameHeader.className = 'player-two'; */
		//Get rid of class 'empty', and add who took the square
		element.classList.remove('empty');
		element.classList.add('playerOneHasThisSpace');
		playerOneMarkings.push(element.id);
		checkWin();
		if (checkWin() === true) {
			return;
		} else {
			computersTurn();
		}
	} /* else{
		//It has to be O's turn. Put an O in.
		element.innerHTML = 'O';
		whosTurn = 1;
		gameHeader.innerHTML = "player 1's turn";
		gameHeader.className = 'player-one';
		element.classList.remove('empty');
		element.classList.add('playerTwoHasThisSpace');
		playerTwoMarkings.push(element.id);
	} */
	else {
		gameHeader.innerHTML = "This box is taken.";
		gameHeader.className = 'red';
	}
}

function computersTurn() {
	var gameHeader = document.getElementById('game-header')
	var emptySquares = document.getElementsByClassName('empty');
	var randomEmptySquare = Math.floor(Math.random() * emptySquares.length);
	console.log("length of array: " + emptySquares.length);
	console.log("random empty square: " + randomEmptySquare);
	var element = emptySquares[randomEmptySquare];
	element.innerHTML = 'O';
	gameHeader.innerHTML = 'your turn';
	gameHeader.className = 'player-one';
	element.classList.remove('empty');
	element.classList.add('playerTwoHasThisSpace');
	playerTwoMarkings.push(element.id);
	checkWin();
}

function checkWin() {
	// if rowCount gets to 3, then we have a winner
	var playerOneRowCount = 0;
	var playerTwoRowCount = 0;
	var thisWinCombination = [];
	// loop through all winning combinations
	for (i=0; i<winners.length; i++) {
		playerOneRowCount = 0;
		playerTwoRowCount = 0;
		thisWinCombination = winners[i];
		// check if all elements in the winners array exist in the current player
		for (j=0; j<thisWinCombination.length; j++) {
			if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1) {
				playerOneRowCount++; // if the the index is not -1, then it's in there
			} else if (playerTwoMarkings.indexOf(thisWinCombination[j]) > -1) {
				playerTwoRowCount++;
			}
		}
	if (playerOneRowCount === 3 || playerTwoRowCount === 3) {
		gameOver(thisWinCombination);
		return true; // we need to break out of the outer for-loop when one of the row count variables gets to 3, otherwise the counter will reset
		} 
	}
}

function gameOver(combo) {
	var gameHeader = document.getElementById('game-header');
	var theWinner = document.getElementById(combo[0]).innerHTML;
	for (i=0;i<combo.length;i++) {
		document.getElementById(combo[i]).classList.add('winner');
	}
	if (theWinner === "X") {
			gameHeader.className = 'player-one';
			gameHeader.innerHTML = "You won the game!";
	} else if (theWinner === "O") {
			gameHeader.className = 'player-two';
			gameHeader.innerHTML = "The computer won the game!";
	}
}

function startOver() {
	// returns to Player 1
	/* whosTurn = 1; */
	var gameHeader = document.getElementById("game-header");
	gameHeader.className = 'player-one';
	gameHeader.innerHTML = "your turn";
	
	// clears all squares
	playerOneMarkings = [];
	playerTwoMarkings = [];
	var squares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
	var resetSquares = [];
	for (i = 0; i < squares.length; i++) {
		resetSquares.push(document.getElementById(squares[i]));
		resetSquares[i].innerHTML = "";
		resetSquares[i].classList.remove('winner');
		resetSquares[i].classList.add('empty');
	}
}

var squareWidth = document.getElementById('a1').clientWidth;
var squares = document.getElementsByClassName('square');
for(i=0; i<squares.length; i++){
	squares[i].style.height = squareWidth + 'px';
}