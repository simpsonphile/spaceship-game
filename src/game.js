import {player, meteors, bullets, supplies} from './main';
import {Meteor} from './meteor';
import {Supply} from './supply';
//////////////////////////////////////////////////////////////////
//game Class
class Game {
  constructor(fps){
    this.fps = fps;
    this.then = Date.now();
    this.delta;
    this.now;
    this.interval = 1000/this.fps;
    this.pause = false;


    this.canvasContainer = document.querySelector('#game-container');
    this.canvas = document.querySelector('#game-canvas');
    this.modal = document.querySelector('#ladderBoard');

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
    this.modal.style.width = this.canvas.width+'px';
    this.modal.style.height = this.canvas.height+'px';
  }

  showCurrentLadderBoard(name, score){

    //if ladderboard not exists set new one
    if(localStorage.getItem("ladderBoard") == null){
      let obj = {
        table: [
          {name: "Henry", score:9999},
          {name: "Henry", score:8000},
          {name: "Henry", score:7000},
          {name: "Paul", score:4000}
        ]
      };
      localStorage.setItem("ladderBoard", JSON.stringify(obj));
    }

    let ladderBoard = JSON.parse(localStorage.getItem("ladderBoard"));

    //if name and score is specifed add him to highscores
    if(name && score)
    ladderBoard.table.push({name: name, score: score});

    //time to show first 10 sorted highscores
    ladderBoard.table = ladderBoard.table.sort(function(a, b){
      if(a.score>b.score)return -1;
      else if(a.score<b.score)return 1;
      else return 0;
    });

    //time to actualize localStorage
    localStorage.setItem("ladderBoard",JSON.stringify(ladderBoard));


    //time to show ladderBoard
    let message = "HighScore</br>";
    for (var i = 0; i < ladderBoard.table.length; i++) {
      message+=ladderBoard.table[i].name+": "+ladderBoard.table[i].score+"</br>";
    }
    this.modal.innerHTML = message;
    this.modal.style.display = "block";
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;

    if(this.delta>this.interval){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    ////////////////////////////////////////////////////////////////////
    //code goes here

    //ladderBoard

    //player
    player.update();

    //meteors
    if(Math.random()>(0.95-(player.points/30000<7/30?player.points/30000:7/30)))meteors.push(new Meteor());

    for (var i = meteors.length-1; i>=0; i--) {

      if(meteors[i].dead){
        player.points+=meteors[i].startHp;
        player.amo+=meteors[i].startHp;
        if(Math.random()>(0.99))supplies.push(new Supply(meteors[i].x,meteors[i].y));
      }
      if((meteors[i].y-meteors[i].r>5) || meteors[i].dead){//usun jak wylecial za mapke
        meteors.splice(i,1);
        continue;
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

    //supplies
    if(Math.random()>(0.9981))supplies.push(new Supply());
    for (var i = supplies.length-1; i >= 0; i--) {
      supplies[i].update();
      console.log("x");
    }


    //lives and points and amo
    this.ctx.font="24px sans-serif";
    this.ctx.fillStyle = "red";
    let hearts="";
    for(let i = 0; i<player.lives; i++)hearts +="♥ ";
    this.ctx.fillText(hearts, 2*this.scale,0.2*this.scale,0.7*this.scale);

    this.ctx.font="16px sans-serif";
    this.ctx.fillStyle = "white";
    let amoText;
    if(player.amo>=1000)amoText ="999+";
    else amoText = player.amo;
    this.ctx.fillText("⊕ "+amoText+"   ♣ "+player.damage, 2*this.scale,0.4*this.scale,0.7*this.scale);

    this.ctx.font="18px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(player.points), 0.1*this.scale,0.2*this.scale,0.7*this.scale);



    player.points+=1/10;
    //code ends here
    ////////////////////////////////////////////////////////////////////
    this.then = this.now - (this.delta % this.interval);
    }
  }
}//end of class Game
//////////////////////////////////////////////////////////////////////
export {Game};
