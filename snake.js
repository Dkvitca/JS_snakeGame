const canvas=document.getElementById('game');
const ctx= canvas.getContext('2d');
const reset= document.getElementById('resetButton');
reset.addEventListener("click",resetButton);
document.addEventListener('keydown',keyDown);
class snakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
//canvas.
let tileCount=20;
let tileSize=canvas.width/tileCount-2;

//global variables.
let headX=10;//position on map;//position on map
let headY=10;//position on map
const snakeParts=[];
let tailLength=2;
let appleX=5;
let appleY=5;
let speed=6;
let xVelocity=0;
let yVelocity=0;
let score=0;

const eatSound=new Audio("gulp.mp3");//Eating sound. used in checkAppleCollision.

function drawGame(){
    
    //functions set
    changeSnakePosition();
    let result= isGameOver();
    if(result){return;}
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    setTimeout(drawGame,1000/speed);
    drawScore();
    
    
}

function isGameOver(x){

    if(x==1){//reset button operation, to reset game.
        return false;
    }
    if(xVelocity==0 && yVelocity==0){return false;}//extra condition to NOT get GAME OVER while starting the game.
    let gameOver=false;

    //left wall - gameover condition
    if(headX < 0){
        gameOver=true;
    }
    //right wall- gameover condition
    else if(headX == tileCount){
        gameOver=true;
    }
     //upper wall - gameover condition
     else if(headY < 0){
        gameOver=true;
    }
    //lower wall- gameover condition
    else if(headY == tileCount){
        gameOver=true;
    }

    //snake head collision with body.
    for(let i=0;i<snakeParts.length;i++){
        let tempPart=snakeParts[i];
        if(tempPart.x == headX && tempPart.y == headY){
            gameOver=true;
            break;

        }
    }
    //popUp message for game over
    if(gameOver){
        ctx.fillStyle="white";
        ctx.font="50px Verdana";
        ctx.fillText("Game Over!",canvas.width/6.5,canvas.height /2);
    }
    
    return gameOver;
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DRAW FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function drawScore(){//draws the score on top right corner.

ctx.fillStyle="white";
ctx.font="10px verdana";
ctx.fillText("score "+score, canvas.width-50,10);

}

function clearScreen(){//clears the screen.
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    
}

function drawApple(){//draws the apple.
ctx.fillStyle='red'
ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);

}


function drawSnake(){
   
    
    ctx.fillStyle='green';//snake body.
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    }

    snakeParts.push(new snakePart(headX,headY));//constructs the snake completly.
    while(snakeParts.length>tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle='orange'//snake head
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
    
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DRAW FUNCTIONS END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LOGICAL FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function checkAppleCollision(){//check if head collides with apple.
    if(appleX==headX && appleY==headY){//tile of apple == head of snake.
        eatSound.play();
        //genereates new location for apple on canvas.
        appleX=Math.floor(Math.random()*tileCount)
        appleY=Math.floor(Math.random()*tileCount)

        //increments length and score.
        tailLength++;
        score++;
        
        //spped increase.
        if(score%3 == 0){
        speed+=2;
        }
    }
  
    
}

function changeSnakePosition(){//change snake position.
    headX += xVelocity;
    headY += yVelocity;
    
}




function keyDown(event){
    //up
    if(event.keyCode==38){
    if(yVelocity==1){return;}//prevents from moving up if already going down.
    yVelocity = -1;
    xVelocity = 0;
    }
    //down
    if(event.keyCode==40){
        if(yVelocity==-1){return;}//prevents from moving down if already going up
        yVelocity = 1;
        xVelocity = 0;
        }
    //left
    if(event.keyCode==37){
        if(xVelocity==1){return;}//prevents from going right if already going left
        yVelocity = 0;
        xVelocity = -1;
        }
    //right
    if(event.keyCode==39){
        if(xVelocity==-1){return;}//prevents from going left if already going right
        yVelocity = 0;
        xVelocity = 1;
        }
        
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LOGICAL FUNCTIONS END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function resetButton(){
    
    isGameOver(1);// "1" flag used to return false from function and continue the game.

    //reset values to start
    headX=10;//position on map;//position on map
    headY=10;//position on map
    tailLength=2;
    appleX=5;
    appleY=5;
    speed=6;
    xVelocity=0;
    yVelocity=0;
     score=0;
    drawGame();
    
}
drawGame();