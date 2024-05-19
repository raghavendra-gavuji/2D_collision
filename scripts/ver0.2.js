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
    position = {x:canvas.width * 0.75, y:canvas.width * 0.20,},
    radius = canvas.height/20,
    color = '#ad5c22'
);

//collision detection between the balls
function distance(posA,posB){
    var disX = posA.x - posB.x;
    var disY = posA.y - posB.y;
    return Math.sqrt(disX*disX + disY*disY)
}
function collision(posA,radA,posB,radB){
    var Distance = distance(posA,posB);
    var diameter = radA+radB;

    return Distance < diameter
}
function resolveCollision(
    posA, velA, radA,
    posB, velB, radB
  ) {
    // Calculate the distance between the two balls
    var dx = posA.x - posB.x;
    var dy = posA.y - posB.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
  
    // Normal vector
    var nx = dx / dist;
    var ny = dy / dist;
  
    // Tangent vector
    var tx = -ny;
    var ty = nx;
  
    // Dot product tangent
    var dpTan1 = velA.x * tx + velA.y * ty;
    var dpTan2 = velB.x * tx + velB.y * ty;
  
    // Dot product normal
    var dpNorm1 = velA.x * nx + velA.y * ny;
    var dpNorm2 = velB.x * nx + velB.y * ny;
  
    // Conservation of momentum in 1D
    var m1 = radA * radA;
    var m2 = radB * radB;
    var momentum1 = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
    var momentum2 = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);
  
    // Update velocities
    var vx1Final = tx * dpTan1 + nx * momentum1;
    var vy1Final = ty * dpTan1 + ny * momentum1;
    var vx2Final = tx * dpTan2 + nx * momentum2;
    var vy2Final = ty * dpTan2 + ny * momentum2;
  
    return {
      vx1: vx1Final,
      vy1: vy1Final,
      vx2: vx2Final,
      vy2: vy2Final
    };
  }
  

function animate(){
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    ball.update(); 
    ball_1.update(); 

    if(collision(ball.position,ball.radius,ball_1.position,ball_1.radius)){
        var new_velocity =  resolveCollision(ball.position,ball.velocity,ball.radius,
            ball_1.position,ball_1.velocity,ball_1.radius)

        ball.velocity.x = new_velocity.vx1;
        ball.velocity.y  = new_velocity.vy1;

        ball_1.velocity.x = new_velocity.vx2;
        ball_1.velocity.y = new_velocity.vy2;
    }

    // console.log(ball.position.x,ball.position.y,ball.velocity.x,ball.velocity.y)
    
}
animate();


