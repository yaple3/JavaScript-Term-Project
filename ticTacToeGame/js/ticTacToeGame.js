$(document).ready(function(){
    /*VARIABLES*/

    //flag variable for resetting the game
    var reset = $("#reset");
    // flag variable for checking Turn
    var turn = "X";
    //flag variables for updating game info
    var xWins = 0;
    var oWins = 0;
    var draws = 0;

    /* New Game */
    $(reset).click(function() {
        $("#turn").text("Player X Goes First");
        $("#msg").text("");
        $("#msg").css("background-color", "transparent");      
        // Clear GameBoard
        $("#square1").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square2").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square3").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square4").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square5").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square6").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square7").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square8").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        $("#square9").removeClass("oLogo").removeClass("xLogo").removeClass("occupied").removeClass("xWin").removeClass("oWin").removeClass("draw");
        turn = "X";
    });//end of new game (reset() function)

    //Playing the game
    $("button").click(function() {
        if(turn === "X") {
            // add image & prevent add'tl plays on this square
            $(this).addClass("xLogo occupied");   
            //checks X win
            if (checkX()) {
                xWins++;        //add to xWins counter
                $("#msg").text("X wins!");
                $("#xWins").text(xWins); 
                $(".square").addClass("occupied xWin"); //prevent more plays on empty squares after game over and add style
                turn = 'Game Over';
            } //checks for game ended without a winner
            else if (checkDraw()) {
                draws++;
                $("#msg").text("GAME ENDED in a DRAW!");
                $("#draws").text(draws);
                $(".square").addClass("occupied draw"); //add styling if game ends in a draw
                turn = 'Game Over';
            }
            //otherwise, if X didn't win, and the game didn't end in a draw, it's O's turn 
            else {
                turn = "O";
            }     
                
        }
        else { //if it's not X's turn, then it's O's turn
            // add image & prevent add'tl plays on this square
            $(this).addClass("oLogo occupied");
            //checks O win
            if (checkO()) {
                oWins++;                    //add to oWins counter
                $("#msg").text("O wins!");
                $("#oWins").text(oWins);
                $(".square").addClass("occupied oWin"); //prevent more plays on empty squares after game over
                turn = 'Game Over';
            } //checks for game ended without a winner
            else if (checkDraw()) {
                draws++;                        //add to draws counter
                $("#msg").text("GAME ENDED in a DRAW!");
                $("#draws").text(draws);
                $(".square").addClass("draw"); //add styling if game ends in a draw
                turn = 'Game Over';
            } //if O didn't win, and the game didn't end in a draw, it's X's turn 
            else {
                turn = "X";
            }
        }
        $("#turn").text(turn);   
    });


        /* Function to check X winning move */
        function checkX() {
            if ($("#square1").hasClass("xLogo") &&
                $("#square2").hasClass("xLogo") &&
                $("#square3").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square4").hasClass("xLogo")
                    && $("#square5").hasClass("xLogo")
                    && $("#square6").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square7").hasClass("xLogo")
                    && $("#square8").hasClass("xLogo")
                    && $("#square9").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square1").hasClass("xLogo")
                    && $("#square4").hasClass("xLogo")
                    && $("#square7").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square2").hasClass("xLogo")
                    && $("#square5").hasClass("xLogo")
                    && $("#square8").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square3").hasClass("xLogo")
                    && $("#square6").hasClass("xLogo")
                    && $("#square9").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square1").hasClass("xLogo")
                    && $("#square5").hasClass("xLogo")
                    && $("#square9").hasClass("xLogo"))
            {
                return true;
            } else if ($("#square3").hasClass("xLogo")
                    && $("#square5").hasClass("xLogo")
                    && $("#square7").hasClass("xLogo"))
            {
                return true;
            } else {
                return false;
            }
        };

        /* Function to check O winning move */
        function checkO() {
            if ($("#square1").hasClass("oLogo") &&
                $("#square2").hasClass("oLogo") &&
                $("#square3").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square4").hasClass("oLogo")
                    && $("#square5").hasClass("oLogo")
                    && $("#square6").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square7").hasClass("oLogo")
                    && $("#square8").hasClass("oLogo")
                    && $("#square9").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square1").hasClass("oLogo")
                    && $("#square4").hasClass("oLogo")
                    && $("#square7").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square2").hasClass("oLogo")
                    && $("#square5").hasClass("oLogo")
                    && $("#square8").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square3").hasClass("oLogo")
                    && $("#square6").hasClass("oLogo")
                    && $("#square9").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square1").hasClass("oLogo")
                    && $("#square5").hasClass("oLogo")
                    && $("#square9").hasClass("oLogo"))
            {
                return true;
            } else if ($("#square3").hasClass("oLogo")
                    && $("#square5").hasClass("oLogo")
                    && $("#square7").hasClass("oLogo"))
            {
                return true;
            } else {
                return false;
            }
        };

        /*function to check for draw*/
        function checkDraw() {
            if (($("#square1").hasClass("occupied"))
                && ($("#square2").hasClass("occupied"))
                && ($("#square3").hasClass("occupied"))
                && ($("#square4").hasClass("occupied"))
                && ($("#square5").hasClass("occupied"))
                && ($("#square6").hasClass("occupied"))
                && ($("#square7").hasClass("occupied"))
                && ($("#square8").hasClass("occupied"))
                && ($("#square9").hasClass("occupied")))
            {
                return true;
            }
            else {
                return false;
            }
        };
  
  //link to readme file in footer
  $("#footer").click(function() {
      window.open("https://lisabalbach.com/yaple3/CIT190/FinalProject/ticTacToeGame/readmeTicTacToeGame.txt");
  });
});