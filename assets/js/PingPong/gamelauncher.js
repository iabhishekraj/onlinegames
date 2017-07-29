var b, p, bg, ball, paddleimg;

function preload() {
    bg = loadImage("assets/images/brickwall.jpg");
    ball = loadImage("assets/images/ball.png");
    paddleimg = loadImage("assets/images/block1.png");
}

function setup() {
    var c = createCanvas(640, 600);
    c.parent("gameWindow");
    b = new Ball(random(640), 0, ball);
    p = new Paddle(300, 570, paddleimg);
}

function draw() {
    imageMode(CORNER);
    background(bg);
    p.printPaddle();
    b.printball();
    b.move();
    p.move();
    gameover();
    if (gameover) {}
    else {
        keyPressed();
    }
}

function gameover() {
    if (b.y > 610) {
        fill('red');
        textSize(50);
        text('GAME OVER', 220, 240);
        noLoop();
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        p.speed = 5;
    }
    if (p.x > 0) {
        if (keyCode == LEFT_ARROW) {
            p.speed = -5;
        }
    }
}

function keyReleased() {
    p.speed = 0;
}