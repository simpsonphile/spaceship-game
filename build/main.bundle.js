/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullets = exports.meteors = exports.keyMapDown = exports.player = exports.game = undefined;

var _player = __webpack_require__(3);

var _meteor = __webpack_require__(2);

var _bullet = __webpack_require__(1);

var _game = __webpack_require__(4);

//initialization
//imports
var keyMapDown = [];
var game = new _game.Game(30);
var player = new _player.Player(1.42, 5 - 0.16);
var meteors = [];
var bullets = [];
game.animate();
game.resize();

//eventListeners
window.addEventListener('resize', function () {
  game.resize();
});
window.addEventListener('orientationchange', function () {
  game.resize();
});

window.addEventListener('keydown', function (e) {
  keyMapDown[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  keyMapDown[e.keyCode] = false;
});

//exports
exports.game = game;
exports.player = player;
exports.keyMapDown = keyMapDown;
exports.meteors = meteors;
exports.bullets = bullets;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(x, y, r, s, d) {
    _classCallCheck(this, Bullet);

    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.dead = false;
    this.damage = d;
  }

  _createClass(Bullet, [{
    key: "checkForColision",
    value: function checkForColision() {
      for (var i = 0; i < _main.meteors.length; i++) {
        var dx = _main.meteors[i].x - this.x;
        var dy = _main.meteors[i].y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= this.r + _main.meteors[i].r) {
          this.dead = true;
          _main.meteors[i].gotHit(this.damage);
          _main.player.points += _main.meteors[i].startHp;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      _main.game.ctx.beginPath();
      _main.game.ctx.strokeStyle = "rgb(255,48,48)";
      _main.game.ctx.fillStyle = "rgb(255,48,48)";
      _main.game.ctx.ellipse(this.x * _main.game.scale, this.y * _main.game.scale, this.r * _main.game.scale, this.r * _main.game.scale, 0, 0, Math.PI * 2, false);
      _main.game.ctx.stroke();
      _main.game.ctx.fill();
    }
  }, {
    key: "move",
    value: function move() {
      this.y -= this.s;
    }
  }, {
    key: "update",
    value: function update() {
      this.checkForColision();
      this.move();
      this.draw();
    }
  }]);

  return Bullet;
}();

exports.Bullet = Bullet;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meteor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Meteor = function () {
  function Meteor() {
    _classCallCheck(this, Meteor);

    this.dx = (Math.random() - Math.ceil(Math.random() - 0.5)) / 20;
    this.dy = Math.random() / 20;
    this.r = Math.random() / 5;
    this.dead = false;
    this.hp = 3;
    this.startHp = this.hp;

    if (Math.random <= 0.3) {
      //spanwujemy na gorze
      this.y = 0;
    } else if (this.dx > 0) {
      //spawnujemy z lewej
      this.y = Math.random();
      this.x = 0;
    } else {
      //spawnujemy z prawej
      this.y = Math.random();
      this.x = 3;
    }
  }

  _createClass(Meteor, [{
    key: "move",
    value: function move() {
      this.x += this.dx;
      this.y += this.dy;
    }
  }, {
    key: "gotHit",
    value: function gotHit() {
      this.hp--;
      if (this.hp <= 0) this.dead = true;
    }
  }, {
    key: "draw",
    value: function draw() {
      _main.game.ctx.beginPath();
      _main.game.ctx.strokeStyle = "rgb(128,128,255)";
      _main.game.ctx.ellipse(this.x * _main.game.scale, this.y * _main.game.scale, this.r * _main.game.scale, this.r * _main.game.scale, 0, 0, Math.PI * 2, false);
      _main.game.ctx.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.move();
      this.draw();
    }
  }]);

  return Meteor;
}();

exports.Meteor = Meteor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

var _bullet = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(x, y) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
    this.dx = 0.03;
    this.r = 0.16;
    this.lives = 5;
    this.points = 0;
    this.damage = 1;
  }

  _createClass(Player, [{
    key: 'move',
    value: function move() {
      if (_main.keyMapDown[87] && this.y - this.dx - this.r >= 0) this.y -= this.dx;else if (_main.keyMapDown[83] && this.y + this.dx <= 5) this.y += this.dx;

      if (_main.keyMapDown[68] && this.x + this.dx + this.r <= 3) this.x += this.dx;else if (_main.keyMapDown[65] && this.x - this.dx >= 0) this.x -= this.dx;

      if (_main.keyMapDown[32]) _main.bullets.push(new _bullet.Bullet(this.x + this.r / 2, this.y - this.r / 2, 0.01, 0.1, 1));
    }
  }, {
    key: 'loseLife',
    value: function loseLife() {
      this.lives--;
      if (this.lives <= 0) this.gameOver();else this.reset(false);
    }
  }, {
    key: 'checkForColision',
    value: function checkForColision() {
      for (var i = 0; i < _main.meteors.length; i++) {
        var dx = _main.meteors[i].x - this.x + this.r / 2;
        var dy = _main.meteors[i].y - this.y - this.r / 2;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= this.r / 2 + _main.meteors[i].r) {
          this.loseLife();
        }
      }
    }
  }, {
    key: 'reset',
    value: function reset(hardMode) {
      if (hardMode) {
        this.lives = 5;
        _main.game.time = 0;
        this.points = 0;
      }

      this.x = 1.42;
      this.y = 4.84;
      while (_main.meteors.length > 0) {
        _main.meteors.pop();
      }while (_main.keyMapDown.length > 0) {
        _main.keyMapDown.pop();
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.reset(true);
      alert("game over");
    }
  }, {
    key: 'draw',
    value: function draw() {
      _main.game.ctx.beginPath();
      _main.game.ctx.strokeStyle = "white";
      _main.game.ctx.fillStyle = "black";
      _main.game.ctx.moveTo(this.x * _main.game.scale, this.y * _main.game.scale);
      _main.game.ctx.lineTo((this.x + this.r) * _main.game.scale, this.y * _main.game.scale);
      _main.game.ctx.lineTo((this.x + this.r / 2) * _main.game.scale, (this.y - this.r) * _main.game.scale);
      _main.game.ctx.lineTo(this.x * _main.game.scale, this.y * _main.game.scale);
      _main.game.ctx.stroke();
      _main.game.ctx.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      this.checkForColision();
      this.move();
      this.draw();
    }
  }]);

  return Player;
}();

exports.Player = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

var _meteor = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//////////////////////////////////////////////////////////////////
//game Class
var Game = function () {
  function Game(fps) {
    _classCallCheck(this, Game);

    this.fps = fps;
    this.then = Date.now();
    this.delta;
    this.now;
    this.interval = 1000 / this.fps;

    this.canvasContainer = document.querySelector('#game-container');
    this.canvas = document.querySelector('#game-canvas');

    this.width = 3;
    this.height = 5;
    this.scale = 1;
    this.widthToHeight = this.width / this.height;
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(Game, [{
    key: 'resize',
    value: function resize() {
      var scaleOfHeight = window.innerHeight / this.height;
      var scaleOfWidth = window.innerWidth / this.width;

      if (scaleOfHeight > scaleOfWidth) {
        this.scale = scaleOfWidth;
      } else {
        this.scale = scaleOfHeight;
      }

      this.canvas.height = this.scale * this.height;
      this.canvas.width = this.scale * this.width;
    }
  }, {
    key: 'animate',
    value: function animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.now = Date.now();
      this.delta = this.now - this.then;

      if (this.delta > this.interval) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ////////////////////////////////////////////////////////////////////
        //code goes here

        //player
        _main.player.update();

        //meteors
        if (Math.random() > 0.95 - _main.player.points / 10000) _main.meteors.push(new _meteor.Meteor());
        for (var i = _main.meteors.length - 1; i >= 0; i--) {

          if (_main.meteors[i].y - _main.meteors[i].r > 5 || _main.meteors[i].dead) {
            //usun jak wylecial za mapke
            _main.meteors.splice(i, 1);
          }

          _main.meteors[i].update();
        }

        //bullets
        for (var i = _main.bullets.length - 1; i >= 0; i--) {
          if (_main.bullets[i].y < 0 || _main.bullets[i].dead) {
            _main.bullets.splice(i, 1);
            continue;
          }
          _main.bullets[i].update();
        }

        //lives and points
        this.ctx.font = "24px sans-serif";
        this.ctx.strokeStyle = "red";
        var hearts = "";
        for (var _i = 0; _i < _main.player.lives; _i++) {
          hearts += "♥ ";
        }this.ctx.strokeText(hearts, 2 * this.scale, 0.2 * this.scale, 0.7 * this.scale);
        this.ctx.stroke();

        this.ctx.font = "18px sans-serif";
        this.ctx.strokeStyle = "white";
        this.ctx.strokeText(Math.floor(_main.player.points), 0.1 * this.scale, 0.2 * this.scale, 0.7 * this.scale);
        this.ctx.stroke();

        _main.player.points += 1 / 10;
        //code ends here
        ////////////////////////////////////////////////////////////////////
        this.then = this.now - this.delta % this.interval;
      }
    }
  }]);

  return Game;
}(); //end of class Game
//////////////////////////////////////////////////////////////////////


exports.Game = Game;

/***/ })
/******/ ]);