import {game, player} from './main';

class Supply {
  constructor(x,y,kind){
    this.r = 0.075;
    if(x==undefined && y==undefined){
      this.x = Math.floor(Math.random()*3)+Math.random();
      this.y = 0;
    } else {
      this.x = x;
      this.y = y;
    }

    if(kind==undefined){
      if(Math.random()<0.2 && player.lives<5)this.kind = 'live';
      else if(Math.random()<0.87)this.kind = 'bullets';
      else this.kind = "powerBullets";
    } else {
      this.kind = kind;
    }

    if(this.kind === 'bullets'){
      this.color = 'green';
      this.symbol = '⊕';
    }
    else if(this.kind === 'live'){
      this.color = 'red';
      this.symbol = '♥';
    }
    else if(this.kind === 'powerBullets'){
      this.color = 'blue';
      this.symbol = '♣';
    }

  }

  move(){
    this.y+=0.005;
  }

  draw(){
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    // game.ctx.rect(this.x*game.scale,this.y*game.scale,this.r*2*game.scale,this.r*2*game.scale);
    game.ctx.font="16px sans-serif";
    game.ctx.fillText(this.symbol, (this.x)*game.scale,(this.y)*game.scale);
    game.ctx.fill();
  }

  update(){
    this.draw();
    this.move();
  }
}

export {Supply};
