var bgImg, runnerImg3, runnerImg1, runnerImg2, runCharacter, hurdle, hurdles = []
    , hurdleImg, cloudImg, cloud, gameOverImg, fiftyPointstune, last_speed, jumpTune, clouds = []
    , myTimer, timer = 0
    , temp, enemyCrow, flip = 0
    , addHurdle = 100, last_speed = 5;
function preload() {
    runnerImg1 = loadImage("assets/images/char1.png");
    runnerImg2 = loadImage("assets/images/char2.png");
    runnerImg3 = loadImage("assets/images/char1.5.png");
    hurdleImg = loadImage("assets/images/cactus.png");
    cloudImg = loadImage("assets/images/cloud.png");
    gameOverImg = loadImage("assets/images/gameover2.png");
    jumpTune = loadSound("assets/images/jump.wav");
    fiftyPointstune = loadSound("assets/images/50Points.wav");
}
function setup() {
    var c = createCanvas(800, 600);
    c.parent("gameWindow");
    runCharacter = new runner(runnerImg1, runnerImg2, runnerImg3);
    hurdle = new Hurdle();
    hurdles.push(hurdle);
    cloud = new Cloud();
    clouds.push(cloud);
    gameTimer();
}

function draw() {
    background('white');
    line(0, height / 2 - 9, 800, height / 2 - 9);
    if (frameCount % 5 == 0) {
        if (flip == 0) flip = 1;
        else flip = 0;
    }
    if (runCharacter.y < 272) {
        runCharacter.printRunner2();
    }
    else {
        if (flip == 1) runCharacter.printRunner1();
        else runCharacter.printRunner3();
    }
    runCharacter.fall();
    printHurdles();
    addMoreHurdles();
    printClouds();
    addMoreClouds();
    printTimer();
    gameOver();
}
function gameTimer() {
    myTimer = setInterval(function () {
        timer++;
        if (timer % 50 == 0) fiftyPointstune.play();
        if (timer % 5 == 0) {
            for (var i = 0; i < hurdles.length; i++) {
                hurdles[i].speedUp();
            }
        }
    }, 1000);
}

function printTimer() {
    textSize(22);
    text("Total Score: " + timer, 600, 19);
}

function printHurdles() {
    for (var i = 0; i < hurdles.length; i++) {
        hurdles[i].printHurdle();
        if (hurdles[i].outOfScreen()) {
            if (hurdles[i].speed > 12) {
                last_speed = 5;
            }
            else {
                last_speed = hurdles[i].speed;
            }
            hurdles.splice(i, 1);
        }
    }
}

function printClouds() {
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].outOfScreenCloud()) {
            clouds.splice(i, 1);
        }
        clouds[i].printCloud();
    }
}

function addMoreHurdles() {
    if (frameCount % 100 == 0) {
        hurdles.push(new Hurdle(last_speed));
    }
}

function addMoreClouds() {
    if (frameCount % 400 == 0) {
        clouds.push(new Cloud());
    }
}

function keyPressed() {
    const SPACE = 32;
    if (keyCode === SPACE) {
        jumpTune.play();
        runCharacter.UP();
    }
}

function gameOver() {
    for (var i = 0; i < hurdles.length; i++) {
        if (runCharacter.x >= hurdles[i].x && runCharacter.x <= (hurdles[i].x + 25)) {
            if (runCharacter.y >= (291 - hurdles[i].height)) {
                noLoop();
                clearInterval(myTimer);
                image(gameOverImg, 400, 200, 200, 200);
            }
        }
    }
}