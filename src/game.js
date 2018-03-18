import {player, meteors, bullets} from './main';
import {Meteor} from './meteor';
//////////////////////////////////////////////////////////////////
//game Class
class Game {
  constructor(fps){
    this.fps = fps;
    this.then = Date.now();
    this.delta;
    this.now;
    this.interval = 1000/this.fps;


    this.canvasContainer = document.querySelector('#game-container');
    this.canvas = document.querySelector('#game-canvas');

    this.width = 3;
    this.height = 5;
    this.scale = 1;
    this.widthToHeight = this.width/this.height;
    this.ctx = this.canvas.getContext('2d');
  }

  resize(){
    const scaleOfHeight = window.innerHeight/this.height;
    const scaleOfWidth = window.innerWidth/this.width;

    if(scaleOfHeight>scaleOfWidth){
      this.scale = scaleOfWidth;
    } else {
      this.scale = scaleOfHeight;
    }

    this.canvas.height = this.scale * this.height;
    this.canvas.width = this.scale * this.width;
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;

    if(this.delta>this.interval){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    ////////////////////////////////////////////////////////////////////
    //code goes here

    //player
    player.update();

    //meteors
    if(Math.random()>(0.95-player.points/10000))meteors.push(new Meteor());
    for (var i = meteors.length-1; i>=0; i--) {

      if((meteors[i].y-meteors[i].r>5) || meteors[i].dead){//usun jak wylecial za mapke
        meteors.splice(i,1);
      }

      meteors[i].update();
    }

    //bullets
    for (var i = bullets.length-1; i >= 0; i--) {
      if((bullets[i].y<0) || bullets[i].dead){
        bullets.splice(i,1);
        continue;
      }
      bullets[i].update();
    }
    

    //lives and points
    this.ctx.font="24px sans-serif";
    this.ctx.strokeStyle = "red";
    let hearts="";
    for(let i = 0; i<player.lives; i++)hearts +="♥ ";
    this.ctx.strokeText(hearts, 2*this.scale,0.2*this.scale,0.7*this.scale);
    this.ctx.stroke();


    this.ctx.font="18px sans-serif";
    this.ctx.strokeStyle = "white";
    this.ctx.strokeText(Math.floor(player.points), 0.1*this.scale,0.2*this.scale,0.7*this.scale);
    this.ctx.stroke();


    player.points+=1/10;
    //code ends here
    ////////////////////////////////////////////////////////////////////
    this.then = this.now - (this.delta % this.interval);
    }
  }
}//end of class Game
//////////////////////////////////////////////////////////////////////
export {Game};
