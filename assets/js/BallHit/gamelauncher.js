var song, winStatus, gameStatus = "game running"
    , timeLeft = 30
    , myTimer, nball = 16
    , missTune, bg, bal, levelTime, hitTune, level = 1
    , start, line, btnClkStart = 0
    , play = 0
    , resumeGame = 0
    , pause, resume, playagain;

function preload() {
    hitTune = loadSound('assets/images/hitit.mp3');
    missTune = loadSound('assets/images/woosh.wav');
    start = loadImage('assets/images/start.gif');
    pause = loadImage('assets/images/pause.png');
    playagain = loadImage('assets/images/replay.png');
    resume = loadImage('assets/images/resume.gif');
    line = loadImage('assets/images/redline.png');
    bg = loadImage('assets/images/bg.jpg');
    bal = loadImage('assets/images/RedSeed.png');
}

function setup() {
    var ui = createCanvas(680, 580);
    cursor(HAND);
    ui.parent("gameWindow");
    prepareBalls();
    gameTimer();
}

function draw() {
    imageMode(CORNER);
    background(bg);
    imageMode(CENTER);
    image(line, 340, 90, 680, 90);
    imageMode(CENTER);
    if (play === 0) {
        if (resumeGame === 1) {
            image(resume, 320, 240, 150, 150);
        }
        else image(start, 320, 240, 150, 150);
    }
    else {
        imageMode(CENTER);
        image(pause, 590, 40, 80, 80);
    }
    startGame();
    if ((play === 1) || (resumeGame === 1)) {
        printBalls();
    }
    fill("yellow");
    textSize(20);
    text("Level = " + level + "Score = " + hit + " Missed= = " + miss + " Time Left = " + timeLeft, 50, 60);
    gameOver();
    youWin();
}

function startGame() {
    if (play === 0) {
        noLoop();
    }
}

function prepareBalls() {
    for (var i = 0; i < nball; i++) {
        var b = new Ball(random(width), random(height));
        Balls.push(b);
    }
}

function printBalls() {
    for (var i = 0; i < Balls.length; i++) {
        Balls[i].move();
        imageMode(CENTER);
        image(bal, Balls[i].x, Balls[i].y, Balls[i].width, Balls[i].height);
    }
}

function mousePressed() {
    if (play === -1) {
        var distStart = dist(mouseX, mouseY, 320, 240);
        if (distStart < 75) {
            restartGame();
        }
    }
    else if (play === 0) {
        var distStart = dist(mouseX, mouseY, 320, 240);
        if (distStart < 75) {
            play = 1;
            resumeGame = 1;
            loop();
        }
    }
    else {
        var distpause = dist(mouseX, mouseY, 590, 40);
        if (distpause < 40) {
            play = 0;
            noLoop();
        }
        // start btn                
        if ((mouseY > 100) && (mouseY < height) && (mouseX > 0) && (mouseX < width)) {
            isHit = 0;
            for (var i = 0; i < Balls.length; i++) {
                Balls[i].ballClicked(i);
            }
            if (isHit == 0) {
                miss++;
                missTune.play();
            }
        }
    }
}

function gameTimer() {
    myTimer = setInterval(function () {
        if (play === 1) timeLeft--;
    }, 1000);
}

function gameOver() {
    gameStatus = "Game Over";
    if ((timeLeft <= 0) || (level > 5)) {
        clearInterval(myTimer);
        Balls = [];
        imageMode(CORNER);
        background(bg);
        if (Balls.length == 0) {
            fill("red");
            textSize(50);
            text(gameStatus, 190, 300);
            play = -1;
            imageMode(CENTER);
            image(playagain, 320, 240, 150, 150);
            noLoop();
        }
    }
}

function youWin() {
    winStatus = "You Lose";
    if ((timeLeft > 0) && (Balls.length == 0)) {
        winStatus = "You Win";
        clearInterval(myTimer);
        Balls.splice(0, Balls.length);
        imageMode(CORNER);
        background(bg);
        gameLevel();
        fill("red");
        textSize(50);
        text(winStatus, 120, 300);
    }
}

function gameLevel() {
    if (winStatus == "You Win") {
        level++;
        speed = speed + 1;
        timeLeft = 60 - (level - 1) * 5;
        nball = nball - 5;
        if (level > 5) {
            gameOver();
        }
        hold();
        noLoop();
        prepareBalls();
    }
    gameTimer();
}

function hold() {
    levelTime = 1;
    var holdTimer = setInterval(function () {
        levelTime--;
        if (levelTime < 0) {
            clearInterval(holdTimer);
            loop();
        }
    }, 1000);
}

function restartGame() {
    Balls = [];
    play = 1;
    level = 1;
    speed = 1;
    timeLeft = 30;
    nball = 15;
    prepareBalls();
    gameTimer();
    loop();
}