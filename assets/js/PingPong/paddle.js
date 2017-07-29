function Paddle(x, y, paddleimg) {
    this.x = x;
    this.y = y;
    this.w = 200;
    this.h = 40;
    this.image = paddleimg;
    this.speed = 2;
    this.printPaddle = function () {
        imageMode(CORNER);
        image(this.image, this.x, this.y, this.w, this.h);
    }
    this.move = function () {
        this.x = this.x + this.speed;
    }
}