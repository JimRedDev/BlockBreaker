import { GAMESTATE } from './game.js';
export default class InputHandler {

    constructor(paddle, game) {

        document.addEventListener('keydown', event => {
            console.log(event.keyCode);

            switch(event.keyCode) {
                case 37:
                paddle.moveLeft()
                break;

                case 39:
                paddle.moveRight();
                break;

                case 27:
                game.togglePause();
                break;

                case 32:
                if(game.gamestate === GAMESTATE.MENU) {
                    game.start();
                }
                break;

                case 13:
                if(game.gamestate === GAMESTATE.GAMEOVER) {
                    game.gamestate = GAMESTATE.MENU;
                    game.currentLevel = 0;
                    game.lives = 3;
                }
                break;
            }

        });

        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case 37:
                if(paddle.speed < 0) {
                    paddle.stop();
                }
                break;

                case 39:
                if(paddle.speed > 0) {
                    paddle.stop();
                }
                break;
            }
        })

    }
}