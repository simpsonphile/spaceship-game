//imports
import {Player} from './player';
import {Meteor} from './meteor';
import {Bullet} from './bullet';
import {Supply} from './supply';
import {Game} from './game';



//initialization
const keyMapDown = [];
const game = new Game(30);
const player = new Player(1.42,5-0.16);
let meteors = [];
let bullets = [];
let supplies = [];
game.animate();
game.resize();

//eventListeners
window.addEventListener('resize', function(){game.resize();});
window.addEventListener('orientationchange', function(){game.resize();});

window.addEventListener('keydown', function(e){
  keyMapDown[e.keyCode] = true;
});

window.addEventListener('keyup', function(e){
  keyMapDown[e.keyCode] = false;
  if(e.keyCode==80 && game.pause==false){
    game.interval = 10000;
    game.pause = true;
  }

  else if(e.keyCode==80 && game.pause==true){
    game.interval = 1000/game.fps;
    game.pause = false;
  }
});



//exports
export {game, player, keyMapDown, meteors, bullets, supplies};
