var gameoverImg, thumbnailImg, bgMusic, eatFruitTune, bgImg, player, flip = 1
    , tree, score = 0, charImg1, charImg2, charImg3, charImg4, treeImg1, treeImg2, treeImg3, randomTree, heightFruit, enemyImg1, enemyImg2, randomForEnemy, trees = []
    , fruits = []
    , enemies = [], enemy, flipEnemy;

function preload() {
    bgMusic = loadSound("assets/images/Farty-Crooks_Looping.mp3");
    eatFruitTune = loadSound("assets/images/eatfruits.wav");
    bgImg = loadImage("assets/images/light-blue-background-2.jpg");
    charImg1 = loadImage("assets/images/1char1.png");
    charImg2 = loadImage("assets/images/2char1.png");
    charImg3 = loadImage("assets/images/3char1.png");
    charImg4 = loadImage("assets/images/4char1.png");
    charImg5 = loadImage("assets/images/5char1.png");
    treeImg1 = loadImage("assets/images/tree4.jpg");
    treeImg2 = loadImage("assets/images/tree2.png");
    gameoverImg = loadImage("assets/images/gameover1.png");
    treeImg3 = loadImage("assets/images/tree3.png");
    fruitImg1 = loadImage("assets/images/fruit1.png");
    fruitImg2 = loadImage("assets/images/fruit3.png");
    enemyImg1 = loadImage("assets/images/enemy1.png");
    enemyImg2 = loadImage("assets/images/enemy2.png");
}

function setup() {
    var c = createCanvas(1200, 620);
    c.parent("gameWindow");
    player = new Player(charImg1, charImg2, charImg3, charImg4, charImg5);
    tree = new Tree(treeImg1, treeImg2, treeImg3);
    bgMusic.loop();
}

function draw() {
    imageMode(CORNER);
    background(bgImg);
    textSize(22);
    fill("blue");
    textStyle(BOLD);
    text("Score = " + score, 1043, 25);
    addMoreTrees();
    printTrees();
    line(0, 600, 1200, 600);
    fill('green');
    rect(0, 600, 1200, 20);
    addMoreFruits();
    printAllFruits();
    printPlayer();
    player.fall();
    addMoreEnemy();
    printEnemies();
    eatFruits();
    isOut();
}

function eatFruits() {
    for (var i = 0; i < fruits.length; i++) {
        var distPF = dist(player.x, player.y, fruits[i].x, fruits[i].y);
        if (distPF < 40) {
            eatFruitTune.play();
            if (fruits[i].img == fruitImg1) score += 2;
            else score += 4;
            fruits.splice(i, 1);
        }
    }
}

function printPlayer() {
    if (frameCount % 7 == 0) {
        if (flip < 4) flip++;
        else {
            flip = 1;
        }
    }
    if (player.y < 559) {
        player.printPlayer1();
    }
    else {
        if (flip == 1) player.printPlayer1();
        else if (flip == 2) player.printPlayer2();
        else if (flip == 3) player.printPlayer3();
        else player.printPlayer4();
    }
}

function printTrees() {
    randomTree = random(6);
    for (var i = 0; i < trees.length; i++) {
        trees[i].printTrees1();
        trees[i].move();
        if (trees[i].outOfScreen()) {
            trees.splice(i, 1);
        }
    }
}

function addMoreTrees() {
    var whichTree = random(3);
    var randomHeight = random(250);
    var randomForTrees = Math.floor(random(100));
    randomForTrees += 150;
    randomHeight += 100;
    if (frameCount % randomForTrees == 0) trees.push(new Tree(treeImg1, treeImg2, treeImg3, whichTree, randomHeight));
}

function addMoreFruits() {
    // generate random no. to confirm which fruit to generate(grapes or pineapple)
    var whichFruit = random(2);
    heightFruit = random(100); // height of the money (where it appears)
    randomForFruit = Math.floor(random(100)); // generating random no.
    randomForFruit += 100; //takes some time to appear fruits    
    // on the basis of random no. generate money
    if (frameCount % randomForFruit == 0) {
        fruits.push(new Fruit(heightFruit, whichFruit, fruitImg1, fruitImg2));
    }
}

function printAllFruits() {
    for (var i = 0; i < fruits.length; i++) {
        fruits[i].printFruit();
        fruits[i].move();
        if (fruits[i].outOfScreen()) fruits.splice(i, 1);
    }
}

function addMoreEnemy() {
    var randomHeightOfEnemy = 500 + random(50);
    randomForEnemy = Math.floor(random(100));
    randomForEnemy = randomForEnemy + 270;
    if (randomForEnemy > 300) {
        randomForEnemy = 200;
    } 
    if (frameCount % 200 == 0) {
        enemies.push(new Enemy(enemyImg1, enemyImg2, randomHeightOfEnemy));
    }
}

function printEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (frameCount % 20 == 0) {
            if (flipEnemy == 1) flipEnemy = 0;
            else flipEnemy = 1;
        }
        if (flipEnemy == 1) enemies[i].printEnemy1();
        else enemies[i].printEnemy2();
        enemies[i].move();
        if (enemies[i].outOfScreen()) {
            enemies.splice(i, 1);
        }
    }
}

function keyPressed() {
    const SPACE = 32
        , DOWN = 40;
    if (keyCode == SPACE) {
        player.jump();
    }
    if (keyCode == DOWN) {
        player.sit();
    }
}

function isOut() {
    for (var i = 0; i < enemies.length; i++) {
        var distPlayerEnemy = dist(player.x, player.y, enemies[i].x, enemies[i].y);
        if (distPlayerEnemy <= 50) {
            imageMode(CORNER);
            background(bgImg);
            textSize(22);
            fill("blue");
            textStyle(BOLD);
            text("Score = " + score, 1043, 20);
            printTrees();
            line(0, 600, 1200, 600);
            fill('green');
            rect(0, 600, 1200, 20);
            printAllFruits();
            printEnemies();
            imageMode(CENTER);
            image(gameoverImg, 610, 200, 600, 170);
            player.printPlayer5();
            bgMusic.stop();
            noLoop();
        }
    }
}

