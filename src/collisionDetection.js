export function detectCollision(ball, gameObject) {

    // Paddle collision
    let ballBottom = ball.position.y + ball.size;
    let ballTop = ball.position.y;

    let objectTop = gameObject.position.y;
    let objectLeftSide = gameObject.position.x;
    let objectRightSide = gameObject.position.x + gameObject.width;
    let objectBottom = gameObject.position.y  + gameObject.height;
    
    if(
        ballBottom >= objectTop && 
        ballTop <= objectBottom &&
        ball.position.x >= objectLeftSide &&
        ball.position.x + ball.size <= objectRightSide
    ) {
        return true;
    } else {
        return false;
    }

}