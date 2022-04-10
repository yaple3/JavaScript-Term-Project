document.addEventListener('DOMContentLoaded', memoryGame)   //waits until content is loaded
        function memoryGame() {       

            //Memory Cards (2 of each card in array)
            var memoryCardArray = [
                {
                    cardTitle: 'fryCard',                   //giving each card a title
                    alt: 'fries memory card',            //setting alt text for each of the cards
                    img: 'media/fryCard.png'                //setting the path for each of the cards
                },
                {
                    cardTitle: 'fryCard',
                    alt: 'fries memory card',  
                    img: 'media/fryCard.png'
                },
                {
                    cardTitle: 'milkshakeCard',
                    alt: 'milkshake memory card',  
                    img: 'media/milkshakeCard.png' 
                },
                {
                    cardTitle: 'milkshakeCard',
                    alt: 'milkshake memory card',  
                    img: 'media/milkshakeCard.png'
                },
                {
                    cardTitle: 'burgerCard',
                    alt: 'burger memory card',  
                    img: 'media/burgerCard.png' 
                },
                {
                    cardTitle: 'burgerCard',
                    alt: 'burger memory card',  
                    img: 'media/burgerCard.png'
                },
                {
                    cardTitle: 'tacoCard',
                    alt: 'taco memory card',  
                    img: 'media/tacoCard.png' 
                },
                {
                    cardTitle: 'tacoCard',
                    alt: 'taco memory card',  
                    img: 'media/tacoCard.png'
                },
                {
                    cardTitle: 'hotDogCard',
                    alt: 'hot dog memory card',  
                    img: 'media/hotDogCard.png' 
                },
                {
                    cardTitle: 'hotDogCard',
                    alt: 'hot dog memory card',  
                    img: 'media/hotDogCard.png'
                },
                {
                    cardTitle: 'pizzaCard',
                    alt: 'pizza memory card',  
                    img: 'media/pizzaCard.png' 
                },
                {
                    cardTitle: 'pizzaCard',
                    alt: 'pizza memory card',  
                    img: 'media/pizzaCard.png'
                }
            ];

            //Randomize card picks so each game is different (using .sort and Math.random functions)
            memoryCardArray.sort(() => 0.5 - Math.random());

            var gameboardGrid = document.querySelector('.gameBoard'); //selecting element where game board will go and giving it a variable name
            var showScore = document.querySelector('#score');          //selecting element where score will go
            var showMsg = document.querySelector('#msg');             //selecting element where messages will be displayed
            var cardsPicked = [];                                     //card array for each card that's been clicked on
            var cardsPickedID = [];                                  //card array for ID number of each card that's been clicked on
            var matchesFound = [];                                   //card array for each pair of matching cards that's been found

            //Create the game board
            function createGameBoardGrid() {
                for (var i = 0; i < memoryCardArray.length; i++) {  //go through each of the memory cards
                    var card = document.createElement('img');        //create img element and save to card variable
                    card.setAttribute('src', 'media/blankCard.png'); //set the src attribute of ea. card and set path so to start the cards out as blank images
                    card.setAttribute('alt', 'blank card');         //set alt text of blank cards
                    card.setAttribute('data-id', i); //using custom data attribute (data-)to add IDs for each card
                    card.addEventListener('click', revealCard); //reveal card when grid box is clicked using event listener
                    gameboardGrid.appendChild(card); //add card to the game board
                }
            }

            //checks for matching cards
            function findMate() {
                var cards = document.querySelectorAll('img'); //find all img elements and save as card variables
                var firstID = cardsPickedID[0];              //first card picked gets added to cardsPickedID array
                var secondID = cardsPickedID[1];             //second card picked gets added to cardsPickedID array
                if(cardsPicked[0] === cardsPicked[1]) {     //if the first and second cards picked are the same,
                    showMsg.textContent = 'Yay! You found the mate!';       //display winner message
                    cards[firstID].setAttribute('src', 'media/cardFront-Lunapic.png'); //change the back of the cards (so you know not to click there again)
                    cards[secondID].setAttribute('src', 'media/cardFront-Lunapic.png');
                    matchesFound.push(cardsPicked);  //add the matching cards picked to the matchesFound array
                }
                else{                                                           //otherwise,
                    cards[firstID].setAttribute('src', 'media/blankCard.png');   //reset cards to blank again
                    cards[secondID].setAttribute('src', 'media/blankCard.png');
                    showMsg.textContent = 'Oops! Not a match. Keep looking!';   //display no match found message
                }
                //clear cards picked arrays (regardless if matches were found or not)
                cardsPicked = [];
                cardsPickedID = [];
                //Update Score
                showScore.textContent = matchesFound.length;                     //for every match found update score by 1 point
                if(matchesFound.length === memoryCardArray.length/2) {          //check for win by seeing if all cards in array have been chosen
                    showMsg.textContent = 'Yay! You have a great memory! You won!'; //if won, display winner message
                }
            }

            //reveal cards
            function revealCard() {
                var memoryCardID = this.getAttribute('data-id');             //get the id for current card (from createGameBoardGrid() function above)
                cardsPicked.push(memoryCardArray[memoryCardID].cardTitle);   //add card details to cardsPicked array and get title
                cardsPickedID.push(memoryCardID);                            //add cardID to cardsPickedID array
                this.setAttribute('src', memoryCardArray[memoryCardID].img); //show the card that was picked by adding the correct image based on the ID no.
                this.setAttribute('alt', memoryCardArray[memoryCardID].img); //add the correct alt text for the card picked.
                if(cardsPicked.length === 2) {                              //if you clicked on 2 cards, 
                    setTimeout(findMate, 500);                              //invoke the function to see if cards match (using setTimout so it doesn't happen too fast)
                }
            }

            createGameBoardGrid();

            //link to new game button
            document.getElementById('newGame').addEventListener('click', () => {
                location.reload();
            });

            //link to readme file in footer
            document.getElementById('footer').addEventListener('click', () => {
                window.open("https://lisabalbach.com/yaple3/CIT190/FinalProject/memoryGame/readmeMemoryGame.txt");
            });

        }; //end of memoryGame() function