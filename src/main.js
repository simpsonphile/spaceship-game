//imports
import {Player} from './player';
import {Meteor} from './meteor';
import {Game} from './game';


//initialization
const keyMapDown = [];
const game = new Game(30);
const player = new Player(1.42,5-0.16);
let meteors = [];
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
});



//exports
export {game, player, keyMapDown, meteors};
