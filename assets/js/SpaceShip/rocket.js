function rocket(rocketImg, rocketspeed) {
    this.x = 200;
    this.y = 600;
    this.width = 80;
    this.height = 100;
    this.image = rocketImg;
    this.speed = rocketspeed;
    this.printrocket = function () {
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.width, this.height);
    }
    this.move = function () {
        this.x = this.x + this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > width) {
            this.x = width;
        }
    }
}