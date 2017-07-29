var speed=2;
function Ball(x,y){
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.xvelocity=speed;
    this.yvelocity=speed;

this.move=function(){
 
    if(this.x>=width){
     this.xvelocity=random(-speed)-1;
 }   
    else
        if(this.x<0){
            this.xvelocity=random(speed)+1;
        }
    else
        if(this.y>=height){
            this.yvelocity=random(-speed)-1;
        }
    else
        if(this.y<125){
            this.yvelocity=random(speed)+1;
        }
    this.x=this.x+this.xvelocity;
    this.y=this.y+this.yvelocity;
}
this.ballClicked=function(index){
    var distance=dist(mouseX,mouseY,this.x,this.y);    
    if(distance<=25){
        hit++;
        hitTune.play();
        Balls.splice(index,1);
        isHit = 1;
    }   
    }
}