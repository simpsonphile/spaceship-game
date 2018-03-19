import {game, player, meteors} from './main';

class Bullet {
  constructor(x,y,r,s,d,as,dx){
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.as = as;
    this.dead = false;
    this.damage = d;
    this.dx = dx;
  }

  checkForColision() {
    for (var i = 0; i < meteors.length; i++) {
      const dx = meteors[i].x - this.x;
      const dy = meteors[i].y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= this.r + meteors[i].r) {
          this.dead = true;
          meteors[i].gotHit(this.damage);
      }
    }
  }

  draw(){
    game.ctx.beginPath();
     game.ctx.strokeStyle = "rgb(255,48,48)";
    game.ctx.fillStyle = "rgb(255,48,48)";
    game.ctx.ellipse(
      this.x*game.scale,
      this.y*game.scale,
      this.r*game.scale,
      this.r*game.scale,
      0,0,Math.PI*2,false);
      game.ctx.stroke();
      game.ctx.fill();
  }

  move(){
    this.x+=this.dx;
    this.y-=this.s;
    this.s+=this.as;
  }

  update(){
    this.checkForColision();
    this.move();
    this.draw();
  }
}

export {Bullet};
