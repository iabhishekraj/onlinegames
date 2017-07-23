function Targat(x, targatImg) {
    this.x = x;
    this.y = 50;
    this.w = 80;
    this.h = 80;
    this.speed = 2;
    this.Image = targatImg;
    this.move = function () {
            this.y = this.y + random(this.speed);
        } 
}