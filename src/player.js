import {game, keyMapDown, meteors} from './main';

class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = 0.03;
    this.r = 0.16;
    this.lives = 5;
  }

  move(){
    if(keyMapDown[87] && this.y-this.dx-this.r>=0)this.y-=this.dx;
    else if(keyMapDown[83] && this.y+this.dx<=5)this.y+=this.dx;

    if(keyMapDown[68] && this.x+this.dx+this.r<=3)this.x+=this.dx;
    else if(keyMapDown[65] && this.x-this.dx>=0)this.x-=this.dx;
  }

  loseLife(){
    while(meteors.length>0)meteors.pop();
    this.x = 1.42;
    this.y = 4.84;
    this.lives--;
    if(this.lives<=0) this.gameOver();
  }

  checkForColision() {
    for (var i = 0; i < meteors.length; i++) {
      const dx = meteors[i].x - this.x+this.r/2;
      const dy = meteors[i].y - this.y+this.r/2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.r + meteors[i].r/2) {
          this.loseLife();
      }
    }
  }



  gameOver(){
    this.lives = 5;
    game.time = 0;
    alert("game over");
  }

  draw(){
    game.ctx.beginPath();
    game.ctx.strokeStyle = "white";
    game.ctx.fillStyle = "black";
    game.ctx.moveTo(this.x*game.scale, this.y*game.scale);
    game.ctx.lineTo((this.x+this.r)*game.scale, (this.y)*game.scale);
    game.ctx.lineTo((this.x+this.r/2)*game.scale, (this.y-this.r)*game.scale);
    game.ctx.lineTo(this.x*game.scale, this.y*game.scale);
    game.ctx.stroke();
    game.ctx.fill();
  }

  update(){
    this.move();
    this.checkForColision();
    this.draw();
  }
}

export {Player};
