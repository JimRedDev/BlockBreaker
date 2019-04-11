import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js'; 
import { buildLevel, level1, level2 } from './level.js';
import Brick from './brick.js';

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this, 16);
        new InputHandler(this.paddle, this);
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.lives  = 3;
        this.levels = [level1, level2];
        this.currentLevel = 0;
    }
    

    start() {
        this.gamestate = GAMESTATE.RUNNING;
        let bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.gameObjects = [this.ball, this.paddle, ...bricks];
        this.ball.reset();
    }    

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    draw(ctx) {

        this.gameObjects.forEach( obj => {
            obj.draw(ctx);
        });

        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(`Lives Remaining: ${this.lives}`, 10, 20);
        ctx.fillText(`Current Level: ${this.currentLevel}`, this.gameWidth - 120, 20);

        if(this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth /2, this.gameHeight / 2);
        }
        
        if(this.gamestate === GAMESTATE.MENU) { 
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "30px Arial";
            ctx.fillText("Press SPACEBAR To Start", this.gameWidth /2, this.gameHeight / 2);
            ctx.font = "60px Arial";
            ctx.fillText("BLOCK BREAKER", this.gameWidth /2, this.gameHeight / 4);
            ctx.font = "15px Arial";
            ctx.fillText("Coded by James Bowler   2019", this.gameWidth /2, this.gameHeight * 0.95);
        }

        if(this.gamestate === GAMESTATE.GAMEOVER) { 
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over", this.gameWidth /2, this.gameHeight * 0.3);
            ctx.font = "20px Arial";
            ctx.fillText(`You Reached Level ${this.currentLevel + 1}`, this.gameWidth /2, this.gameHeight * 0.6);
            ctx.fillText("Press ENTER For Menu", this.gameWidth /2, this.gameHeight * 0.8);
        }

    }

    update(deltaTime) {
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if(this.gamestate === GAMESTATE.PAUSED || 
           this.gamestate === GAMESTATE.MENU ||
           this.gamestate === GAMESTATE.GAMEOVER) return;

        this.gameObjects.forEach( obj => {
            obj.update(deltaTime);
        });

        this.gameObjects = this.gameObjects.filter( object => !object.markForDeletion);

        if(this.gameObjects.length < 3) {
            if(this.currentLevel + 1 < this.levels.length) {
                this.currentLevel++;
                this.start();
            } else {
                this.gamestate = GAMESTATE.GAMEOVER;
            }
            
        }
    }

}