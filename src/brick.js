import { detectCollision } from './collisionDetection.js';

export default class Brick {

    constructor(game, position) {
        this.image = document.getElementById('img_brick');
        this.width = 80;
        this.height = 24;
        this.position = position;
        this.game = game;

        this.markForDeletion = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y *= -1;
            this.markForDeletion = true;
        }
    }

}     