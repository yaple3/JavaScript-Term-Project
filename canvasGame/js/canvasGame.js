var burger;
var gameObstacles = [];
var score;
var currentLevel;
var mySound;
var myMusic;

function startGame() {
    burger = new component(55, 50, "media/burger.png", 10, 120, "image");  //(height, width, imageURL, x-coord, y-coord, type(image))
    score = new component("20px", "Arial", "black", 300, 30, "text");
    currentLevel = new component("20px", "Arial", "black", 100, 30, "text");
    mySound = new sound("media/wahwaaahhh.mp3");
    myMusic = new sound("media/gameTune.mp3");
    myMusic.play();
    gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 700;
        this.canvas.height = 350;
        this.canvas.
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.footer);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }  
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if(type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        if(this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if(type == "image") {
            ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        }
        else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherObj) {
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myUp = this.y;
        var myDown = this.y + (this.height);
        var otherLeft = otherObj.x;
        var otherRight = otherObj.x + (otherObj.width);
        var otherUp = otherObj.y;
        var otherDown = otherObj.y + (otherObj.height);
        var crash = true;
        if ((myDown < otherUp) || (myUp > otherDown) || (myRight < otherLeft) || (myLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < gameObstacles.length; i++) {
        if (burger.crashWith(gameObstacles[i])) {
            mySound.play();
            myMusic.stop();
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyInterval(150)) {
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 170;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        gameObstacles.push(new component(30, height, "rgb(250, 184, 85)", x, 0,));
        gameObstacles.push(new component(30, x - height - gap, "rgb(250, 184, 85)",x, height + gap));
    }
    for (i = 0; i < gameObstacles.length; i++) {
        gameObstacles[i].speedX = -1;
        gameObstacles[i].newPos();
        gameObstacles[i].update();
    }
    score.text = "SCORE: " + gameArea.frameNo;
    score.update();
    currentLevel.text = "Level: " + Math.round(gameArea.frameNo/500);
    currentLevel.update();
    burger.newPos();
    burger.update();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    if(src == "media/gameTune.mp3") {
        this.sound.setAttribute("loop", true);
    }
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function everyInterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveUp() {
    burger.speedY = -1; 
}

function moveDown() {
    burger.speedY = 1; 
}

function moveLeft() {
    burger.speedX = -1; 
}

function moveRight() {
    burger.speedX = 1; 
}

function clearMove() {
    burger.speedX = 0; 
    burger.speedY = 0; 
}


//link to readme file in footer
document.getElementById("footer").addEventListener("click", function(){
    window.open("https://lisabalbach.com/yaple3/CIT190/FinalProject/canvasGame/readmeCanvasGame.txt");
});