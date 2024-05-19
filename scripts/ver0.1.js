const canvas = document.getElementById("mycanvas");
const container = document.getElementById("container");
const c = canvas.getContext("2d");

resize();
function resize(){
    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;
    
    // console.log(canvas.height,canvas.width);
}
window.addEventListener("resize",resize);


class Ball{
    constructor(position,radius,color){
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x:Math.floor(Math.random() * 6)+3,
            y:Math.floor(Math.random() * 6)+3
        }
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.radius = canvas.height/20;
        this.draw();

        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //this code detects the collision with the ceiling and ground
        if(this.position.y - this.radius < 0 || this.radius + this.position.y  > canvas.height){
            this.velocity.y *= -1;
        }
        //this code detects the collisions with the sides
        if(this.radius + this.position.x > canvas.width || this.position.x - this.radius < 0) {
            this.velocity.x *= -1;
        }
        
    }
}

const ball = new Ball(
    position = {x:canvas.width * 0.25, y:canvas.width * 0.20,},
    radius = canvas.height/20,
    color = 'darkgoldenrod'
);

const ball_1 = new Ball(
    position = {x:canvas.width * 0.25, y:canvas.width * 0.20,},
    radius = canvas.height/20,
    color = '#ad5c22'
);


function animate(){
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    ball.update(); 
    ball_1.update(); 

    // console.log(ball.position.x,ball.position.y,ball.velocity.x,ball.velocity.y)
    
}
animate();


