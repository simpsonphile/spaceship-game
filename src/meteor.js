import {game, player} from './main';

class Meteor {
  constructor(){
    this.dx = (Math.random()-Math.ceil(Math.random()-0.5))/20;
    this.dy = Math.random()/20;
    this.r = Math.random()/5+0.1;
    this.dead = false;
    this.hp = 3+Math.floor(player.points/1000);
    this.startHp = this.hp;

    if(Math.random<=0.3){//spanwujemy na gorze
      this.y=0;
    } else if(this.dx>0){//spawnujemy z lewej
      this.y = Math.random();
      this.x = 0;
    } else{//spawnujemy z prawej
      this.y = Math.random();
      this.x = 3;
    }

  }

  move() {
    this.x+=this.dx;
    this.y+=this.dy;
  }

  gotHit(damage){
    this.hp-=damage;
    if(this.hp<=0)this.dead = true;
  }

  draw() {
    game.ctx.beginPath();
    const darkerColor = Math.floor(255-this.hp*10)>0 ? Math.floor(255-this.hp*10) : 0;
    game.ctx.strokeStyle = "rgb("+darkerColor+","+darkerColor+",255)";

    game.ctx.ellipse(
      this.x*game.scale,
      this.y*game.scale,
      this.r*game.scale,
      this.r*game.scale,
      0,0,Math.PI*2,false);
    game.ctx.stroke();
  }

  update() {
    this.move();
    this.draw();
  }
}

export {Meteor};
