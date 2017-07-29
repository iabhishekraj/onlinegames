var replay, space, play = 1
    , rocketspeed = 0
    , myrocket, rocketImg, targatImg, targats = []
    , ntargat = 10;
var missileImg, m, score = 0
    , missileArr = []
    , hittune, spacetune;

function preload() {
    space = loadImage("assets/images/space.jpg");
    rocketImg = loadImage("assets/images/rocket.png");
    targatImg = loadImage("assets/images/ufo2.png");
    missileImg = loadImage("assets/images/missile.png");
    spacetune = loadSound("assets/images/spacetune1.mp3");
    replay = loadImage("assets/images/replay.png");
    hittune = loadSound("assets/images/hitit.mp3");
}

function setup() {
    var c = createCanvas(1100, 620);
    c.parent("gameWindow");
    spacetune.play();
    myrocket = new rocket(rocketImg, rocketspeed);
}

function draw() {
    imageMode(CORNER);
    background(space);
    fill('white');
    textSize(30);
    text("Score = " + score, 900, 30);
    textSize(15);
    text("**Use Space bar to Fire", 20, 30);
    text("**Use Left Arrow and Right Arrow to Move", 20, 50)
    myrocket.printrocket();
    myrocket.move();
    printMissile();
    hit();
    // if these two lines are placed before myrocket.printrocket() function, an error occurs
    preparetargat();
    printtargat();
    if (play == 0) {
        gameOver();
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        myrocket.speed = 5;
    }
    else if (keyCode == LEFT_ARROW) {
        myrocket.speed = -5;
    }
    if (keyCode == 32) {
        m = new Missile(myrocket.x, myrocket.y - 50, missileImg);
        missileArr.push(m);
    }
}

function printMissile() {
    for (var i = 0; i < missileArr.length; i++) {
        missileArr[i].print();
        missileArr[i].move();
        if (missileArr[i].y < 0) {
            missileArr.splice(i, 1);
        }
    }
}

function preparetargat() {
    for (var i = 0; i < ntargat; i++) {
        if (frameCount % 200 == 0) {
            var t = new Targat(random(width), targatImg);
            targats.push(t);
        }
    }
}

function mousePressed() {
    if (play == -1) {
        var distStart = dist(mouseX, mouseY, 500, 250);
        if (distStart < 75) {
            restartGame();
        }
    }
}

function restartGame() {
    targats = [];
    missileArr = [];
    play = 1;
    ntargat = 10;
    myrocket = new rocket(rocketImg, rocketspeed);
    preparetargat();
    printtargat();
    loop();
}

function gameOver() {
    fill('red');
    textSize(20);
    play = -1;
    imageMode(CORNER);
    background(space);
    imageMode(CENTER);
    image(replay, 500, 250);
    spacetune.stop();
    noLoop();
}

function printtargat() {
    for (var i = 0; i < targats.length; i++) {
        imageMode(CENTER);
        image(targatImg, targats[i].x, targats[i].y, targats[i].w, targats[i].h);
        targats[i].move();
        if (targats[i].y >= height) {
            targats = [];
            play = 0;
            break;
        }
    }
}

function hit() {
    for (var i = 0; i < targats.length; i++) {
        for (var j = 0; j < missileArr.length; j++) {
            var disthit = dist(targats[i].x, targats[i].y, missileArr[j].x, missileArr[j].y);
            if (disthit < 50) {
                hittune.play();
                targats.splice(i, 1);
                missileArr.splice(j, 1);
                score++;
                break;
            }
        }
    }
}