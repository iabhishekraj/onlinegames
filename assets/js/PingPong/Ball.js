function Ball(x, y, ball) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 70;
    this.speed = 2;
    this.image = ball;
    this.xvelocity = this.speed;
    this.yvelocity = this.speed;
    this.printball = function () {
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }
    this.move = function () {
        if (this.x >= width) {
            this.xvelocity = (-this.speed) - 1;
        }
        else
        if (this.x < 0) {
            this.xvelocity = (this.speed) + 1;
        }
        else
        if (this.y < 0) {
            this.yvelocity = (this.speed) + 1;
        }
        else if (this.y == height - 50) {
            if ((this.x >= p.x) && (this.x <= p.x + 200)) {
                this.yvelocity = (-this.speed) - 1;
            }
        }
        this.x = this.x + this.xvelocity;
        this.y = this.y + this.yvelocity;
    }
}