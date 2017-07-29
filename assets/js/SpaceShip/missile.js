function Missile(x, y, missileImg) {
    this.x = x;
    this.y = y;
    this.w = 8;
    this.h = 80;
    this.speed = 20;
    this.image = missileImg;
    this.move = function () {
        this.y = this.y - this.speed;
    }
    this.print = function () {
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }
}