var wordBank = ["DON QUIXOTE", "MIGUEL DE CERVANTES", 
				"TALE OF TWO CITIES", "CHARLES DICKENS", 
				"PRIDE AND PREJUDICE", "JANE AUSTEN",
				"THE MOONSTONE", "WILKIE COLLINS",
				"VILLETTE", "CHARLOTTE BRONTE"];

var winsCount = 0; 
var currentWord = wordBank[Math.floor(Math.random() * 10)]; 
var currentGuess = "";
var guessesRemaining = 10; 
var lettersGuessed = []; 

function updateCurrentGuess(letter){
	var updatedGuess = "";
	if(currentGuess == ""){
		for(var i=0; i<currentWord.length; i++){
			currentGuess += "_"; 
		}
	}
	for(var i=0; i<currentWord.length; i++){
		if(currentWord[i] == letter || currentWord[i] == " " || currentGuess[i].match(/[A-Z]/g)){
			updatedGuess += currentWord[i]; 
		}else{
			updatedGuess += "_";
		}
	}
	currentGuess = updatedGuess;
}

function printWord(){
	var updateGuess = "";
	for(var i=0; i<currentGuess.length; i++){
		if(currentGuess[i].match(/[A-Z]/g) || currentGuess[i] == " "){
			updateGuess += currentWord[i]; 
		}else{
			updateGuess += "_ ";
		}
	}
	return updateGuess;
}

function updatePage(){
	document.querySelector("#current").innerText = printWord();
	document.querySelector("#wins").innerText = winsCount;
	document.querySelector("#guesses").innerText = guessesRemaining;
	document.querySelector("#letters").innerText = lettersGuessed;
}

function confirmLetter(){
	var letter = (event.key).toUpperCase(); 
	if(letter.match(/[A-Z]/g)){ //confirming is a letter
		if(!lettersGuessed.includes(letter) && !currentGuess.includes(letter)){ //confirming letter not guessed already
			if(currentWord.includes(letter)){//checking if letter is in the word to guess
				updateCurrentGuess(letter); 			
				if(currentGuess == currentWord){ //checking for win condition
					winsCount++; 
					if(currentWord == wordBank[0] || currentWord == wordBank[1]){
						document.querySelector("img").src="./assets/images/donQuixote.png"; 
					}else if(currentWord == wordBank[2] || currentWord == wordBank[3]){
						document.querySelector("img").src="./assets/images/charlesDickens.jpeg"; 
					}else if(currentWord == wordBank[4] || currentWord == wordBank[5]){
						document.querySelector("img").src="./assets/images/prideAndPrejudice.jpeg"; 
					}else if(currentWord == wordBank[6] || currentWord == wordBank[7]){
						document.querySelector("img").src="./assets/images/wilkieCollins.jpeg"; 
					}else if(currentWord == wordBank[8] || currentWord == wordBank[9]){
						document.querySelector("img").src="./assets/images/charlotteBronte.jpeg"; 
					}
					currentWord = wordBank[Math.floor(Math.random() * 10)]; 
					guessesRemaining = 10; 
					currentGuess = ""; 
					updateCurrentGuess("");
					lettersGuessed = [];
				}
			}
			else{ // letter was not in the word to guess
				lettersGuessed.push(letter);
				guessesRemaining -= 1; 
				if(guessesRemaining == 0){
					currentWord = wordBank[Math.floor(Math.random() * 10)]; 
					guessesRemaining = 10;
					currentGuess = ""; 
					updateCurrentGuess("");
					lettersGuessed = [];
				}
			}
		}
	}
	updatePage(); 
}

updateCurrentGuess("");
updatePage(); 
document.onkeyup = confirmLetter;
	  