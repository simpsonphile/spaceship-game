import {game, keyMapDown, meteors, bullets, supplies} from './main';
import {Bullet} from './bullet';

class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = 0.03;
    this.r = 0.16;
    this.lives = 5;
    this.points = 0;
    this.damage = 1;
    this.amo = 1000;
  }

  move(){
    if(keyMapDown[87] && this.y-this.dx-this.r>=0)this.y-=this.dx;
    else if(keyMapDown[83] && this.y+this.dx<=5)this.y+=this.dx;

    if(keyMapDown[68] && this.x+this.dx+this.r<=3)this.x+=this.dx;
    else if(keyMapDown[65] && this.x-this.dx>=0)this.x-=this.dx;

    if(keyMapDown[32]){
      this.shoot();
  }
}

  shoot(){
    if(this.amo>0 && (this.damage<5 || this.damage>=10)){
      bullets.push(new Bullet(
        this.x+this.r/2,//x
        this.y-this.r/2-0.1,//y
        0.01,//r
        0.05,//s
        this.damage,//d
        0.002,//as
        0));//dx
        this.amo--;
    }

    if(this.amo>1 && this.damage>=5){
      bullets.push(new Bullet(
        this.x,//x
        this.y-this.r/2-0.05,//y
        0.01,//r
        0.05,//s
        Math.ceil(this.damage/2),//d
        0.002,//as
        -0.005));//dx

        bullets.push(new Bullet(
          this.x+this.r,//x
          this.y-this.r/2-0.05,//y
          0.01,//r
          0.05,//s
          Math.ceil(this.damage/2),//d
          0.002,//as
          0.005));//dx
          this.amo-=2;
    }
  }


  loseLife(){
    this.lives--;
    if(this.lives<=0) this.gameOver();
    else this.reset(false);
  }

  checkForColisionWithMeteor() {
    for (var i = 0; i < meteors.length; i++) {//colision with meteors
      const dx = meteors[i].x - this.x+this.r/2;
      const dy = meteors[i].y - this.y-this.r/2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= this.r/2 + meteors[i].r) {
          this.loseLife();
      }
    }
  }


  checkForColisionWithSupply() {
    for(var i = supplies.length-1;i>=0;i--){
      const dx = supplies[i].x - this.x+this.r/2;
      const dy = supplies[i].y - this.y-this.r/2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= this.r/2 + supplies[i].r) {
        //kolizja
        if(supplies[i].kind==='live' && this.lives<5)this.lives++;
        else if(supplies[i].kind==='bullets')this.amo+=50;
        else if(supplies[i].kind==='powerBullets')this.damage+=1;
        supplies.splice(i,1);
        i--;
        this.points+=100;
      }
    }
  }

  reset(hardMode){
    if(hardMode){
      this.lives = 5;
      game.time = 0;
      this.points = 0;
      this.damage = 1;
      this.amo = 1000;
      while(supplies.length>0)supplies.pop();
    }

    this.x = 1.42;
    this.y = 4.84;
    while(meteors.length>0)meteors.pop();
    while(keyMapDown.length>0)keyMapDown.pop();
    while(bullets.length>0)bullets.pop();
  }

  gameOver(){
    const name = prompt("what's your name?");

    game.showCurrentLadderBoard(name, Math.floor(this.points));
    this.reset(true);
    game.interval = 99999999;
    game.pause = true;
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
    this.checkForColisionWithMeteor();
    this.checkForColisionWithSupply();
    this.move();
    this.draw();
  }
}

export {Player};
