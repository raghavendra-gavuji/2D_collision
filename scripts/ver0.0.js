const canvas = document.getElementById("mycanvas");
const c = canvas.getContext("2d");
const container = document.getElementById("container");

resize();
function resize(){
    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;
}
window.addEventListener("resize",resize);

//ball object with all its properties
//x: x-position, y: y-position, size: radius, dx dx: x and y direction velocities
const ball = {
    x:200,
    y:200,
    size:25,
    dx:5,
    dy:4
};

//function to draw the circle
function drawBall(){
    c.beginPath();
    c.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
    c.fillStyle = 'darkgoldenrod';
    c.fill();
}

//funcction to update the animation
function update(){
    //clears canvas for each frame
    c.clearRect(0,0,canvas.width,canvas.height);

    drawBall();

    //change the position of the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    //detect side walls
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1; //change the direction
    }
    //detect top and bottom walls
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }


    requestAnimationFrame(update);//this is required to start the animation it takes the animation holding function(basically loop in pygame)
}

update()
