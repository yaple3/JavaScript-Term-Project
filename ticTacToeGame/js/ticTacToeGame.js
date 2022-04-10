/* differentiate player and computer game pieces */
var player = $("#playerPic");                           //<<<<<<<<game images not showing up>>>>>>>>>>>
var computer = $("#computerPic");

/****** create variable that checks to see if the game board is full ******/
var fullBoard = false;

/****** declare gameBoard array ******/
var gameBoard = ["", "", "", "", "", "", "", "", ""];



/****** declare container variable for gameBoard array ******/
var boardContainer = $(".gameBoard");

/****** winner message ******/  
var winner = $("#winner");
 
/****** check to see if the game board is full ******/
var verifyFullBoard = () => {
  var full = true;
  gameBoard.forEach(element => {
    if (element != player && element != computer) {
      full = false;
    }
  });
  fullBoard = full;
}; //end verifyFullBoard function

/****** the checkRow function should return the symbol of the player with three in a row ******/
var checkRow = (a, b, c) => { // checks if all elements in a row are the same 
    return (
        gameBoard[a] == gameBoard[b] &&
        gameBoard[b] == gameBoard[c] &&
        (gameBoard[a] == player || gameBoard[a] == computer)    // checks to see if elements are the player's or computer's moves 
    );
}; //end checkRow function

var checkMatch = () => {
    /****** Use loop to check if there are row matches ******/
    for (i = 0; i < 9; i += 3) {
      if (checkRow(i, i + 1, i + 2)) {
        return gameBoard[i];
      }
    }
    /****** Use loop to check if there are column matches ******/
    for (i = 0; i < 3; i++) {
      if (checkRow(i, i + 3, i + 6)) {
        return gameBoard[i];
      }
    }
    /****** Use loop to check if there are diagonal matches ******/
    if (checkRow(0, 4, 8)) {
      return gameBoard[0];
    }
    if (checkRow(2, 4, 6)) {
      return gameBoard[2];
    }
    return "";
}; //end of checkMatch function
  
/****** Check for winner ******/
var findWinner = () => {        // declare findWinner function 
    var result = checkMatch();    // assign checkMatch function to new variable 
    if (result == player) {           // if player has three in a row... 
      winner.html = "Congratulations! You've beaten the computer!"; // add winning message 
      winner.addClass("playerWin");  // add new class in order to add more styling in css 
      fullBoard = true;                   // show the board is full so game is over 
    } 
    else if (result == computer) {            // if computer has three in a row... 
      winner.html = "The computer has won.";  // add winning message */
      winner.addClass("computerWin");    // add new class in order to add more styling in css
      fullBoard = true;                       // show the board is full so game is over 
    } 
    else if (fullBoard) {                     // if the board is full before three in a row is achieved 
      winner.html = "It's a tie!";            // declare tie 
      winner.addClass("tie");            // add new class in order to add more styling in css 
    }
}; //end of findWinner function

/****** update game board******/
var updateBoard = () => {
    boardContainer.innerHTML = "";    // clear board 
    gameBoard.forEach((e, i) => {     // add div for each square w/ each individual id and player move
      boardContainer.innerHTML += `<div id="square${i}" class="square" onclick="playerMove(${i})">${gameBoard[i]}</div>`;
      if (e == player || e == computer) {
        document.querySelector(`#square${i}`).classList.add("occupied");  // add occupied class to squares that are occupied 
      }
    });
};  //end of updateBoard function                                                                   //<<<<<<<<<<<<<<<this also isn't working>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/******since both updateBoard and verifyFullBoard need to be checked at each turn, combine them in new function while also checking for winner ******/
var gameTurn = () => {
    updateBoard();
    verifyFullBoard();
    findWinner();
};  //end of gameTurn function

/******prevent plays once board is full ******/
var playerMove = e => {
    if (!fullBoard && gameBoard[e] == "") {   // if the board isn't full and there's space available on the clicked div... 
      gameBoard[e] = player;                 // allow player to play on selected square 
      gameTurn();
      computerMove();
    }
}; //end of playerMove function
  
  var computerMove = () => {
    if (!fullBoard) {                // if the board isn't full... 
      do {
        selected = Math.floor(Math.random() * 9); // choose random play for computer 
      } while (gameBoard[selected] != "");       // as long as the random play is empty... 
      gameBoard[selected] = computer;             // random space becomes computer's new turn 
      gameTurn();
    }
}; //end of computerMove function

/****** Clear game board for new game ******/
var clearBoard = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""]; //clear the  game board
    fullBoard = false;                                  
    winner.removeClass("playerWin");             //remove winner classes  
    winner.removeClass("computerWin");
    winner.removeClass("tie");
    winner.html = "";                                 //clear winner message  
    updateBoard();
}; //end of clearBoard function

// link to readme file in footer
$("footer").on("click", function(){
    window.open("https://lisabalbach.com/yaple3/CIT190/FinalProject/ticTacToeGame/readmeTicTacToe.txt");
});

// button to start new game
$("#reset").on("click", clearBoard());