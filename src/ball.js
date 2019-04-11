import { detectCollision } from './collisionDetection.js';
import Paddle from './paddle.js';

export default class Ball {
    
    constructor(game, size) {
        this.image = document.getElementById('img_ball');
        this.size = size;
        
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        this.reset();
    }

    reset() {

        this.position = {
            x: this.gameWidth / 2,
            y: this.gameHeight - 40 - this.size 
        }

        this.speed = {
            x: 4,
            y: -2
        }

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall collision left & right
        if(this.position.x < 0 || this.position.x > this.gameWidth - this.size) {
            this.speed.x *= -1;
        }

        // Wall collision top & bottom
        if(this.position.y < 0 ) {
            this.speed.y *= -1;
        }

        // Ball through bottom of game
        if(this.position.y > this.gameHeight) {
            this.game.lives--;
            this.reset();
        }

        // Paddle collision
        if(detectCollision(this, this.game.paddle)) {
            this.speed.y *= -1;
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }
}