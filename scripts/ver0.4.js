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

const gravity = 0.5;

class Ball{
    constructor(position,radius,color,bounciness){
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.bounciness = bounciness;
        this.velocity = {
            x:0,
            y:0,
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

        //this code makes the ball fall
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;

        //this code detects the collision with the ground
        if(this.radius + this.position.y +this.velocity.y > canvas.height){
            //this stops the ball
            this.position.y = canvas.height - this.radius
            //this adds bounciness to the ball
            this.velocity.y *= -this.bounciness ;
        }
        //this code detects the collisions with the sides
        if(this.radius + this.position.x > canvas.width || this.position.x - this.radius < 0) this.velocity.x *= -1;
        
    }
}

const ball = new Ball(
    position = {x:canvas.width * 0.25,y:canvas.width * 0.25,},
    radius = canvas.height/20,
    color = 'darkgoldenrod',
    bounciness = 0.9
);

const keys = {
    d:{pressed:false},
    a:{pressed:false}
}


function animate(){
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    ball.update();  
    
    //controls
    ball.velocity.x = 0 
    if(keys.d.pressed) ball.velocity.x = 5;
    else if(keys.a.pressed) ball.velocity.x = -5;
}
animate();

window.addEventListener("keypress",(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break; 
        case 'w':
            if(ball.position.y >= canvas.height - ball.radius-5) ball.velocity.y = -15;
            break;           
    }
})
window.addEventListener("keyup",(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;            
    }
})
