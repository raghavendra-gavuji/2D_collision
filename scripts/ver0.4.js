// const canvas = document.getElementById("mycanvas");
// const container = document.getElementById("container");
// const c = canvas.getContext("2d");

// resize();
// function resize(){
//     canvas.height = container.clientHeight;
//     canvas.width = container.clientWidth;
    
//     // console.log(canvas.height,canvas.width);
// }
// window.addEventListener("resize",resize);

// const gravity = 0.5;

// class Ball{
//     constructor(position,radius,color,bounciness){
//         this.position = position;
//         this.radius = radius;
//         this.color = color;
//         this.bounciness = bounciness;
//         this.velocity = {
//             x:0,
//             y:0,
//         }
//     }
//     draw(){
//         c.beginPath();
//         c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
//         c.fillStyle = this.color;
//         c.fill();
//     }
//     update(){
//         this.radius = canvas.height/20;
//         this.draw();

//         this.position.x += this.velocity.x;

//         //this code makes the ball fall
//         this.velocity.y += gravity;
//         this.position.y += this.velocity.y;

//         //this code detects the collision with the ground
//         if(this.radius + this.position.y +this.velocity.y > canvas.height){
//             //this stops the ball
//             this.position.y = canvas.height - this.radius
//             //this adds bounciness to the ball
//             this.velocity.y *= -this.bounciness ;
//         }
//         if(this.position.y - this.radius < 0 ){
//             this.velocity.y *= -1;
//         }
//         //this code detects the collisions with the sides
//         if(this.radius + this.position.x > canvas.width || this.position.x - this.radius < 0) this.velocity.x *= -1;
        
//     }
// }

// const ball = new Ball(
//     position = {x:canvas.width * 0.25,y:canvas.width * 0.25,},
//     radius = canvas.height/20,
//     color = 'darkgoldenrod',
//     bounciness = 0
// );

// const keys = {
//     d:{pressed:false},
//     a:{pressed:false}
// }


// function animate(){
//     window.requestAnimationFrame(animate);
//     c.clearRect(0,0,canvas.width,canvas.height);
//     ball.update();  
    
//     //controls
//     // ball.velocity.x = 0 
//     if(keys.d.pressed){
//         if(this.radius + this.position.x  > canvas.width){
//             ball.position.x += 0;
//         }
//         else{
//             ball.position.x += 5;
//         }
//     } 
//     else if(keys.a.pressed){
//         if(this.position.x - this.radius < 0){
//             ball.position.x -= 0;
//         }
//         else{
//             ball.position.x -= 5;
//         }
//     }
// }
// animate();

// window.addEventListener("keypress",(event)=>{
//     switch(event.key){
//         case 'd':
//             keys.d.pressed = true;
//             break;
//         case 'a':
//             keys.a.pressed = true;
//             break; 
//         case 'w':
//             if(ball.position.y - ball.radius < 0) ball.velocity.y = 0;
//             else ball.velocity.y = -15;
//             break;           
//     }
// })
// window.addEventListener("keyup",(event)=>{
//     switch(event.key){
//         case 'd':
//             keys.d.pressed = false;
//             break;
//         case 'a':
//             keys.a.pressed = false;
//             break;            
//     }
// })
const canvas = document.getElementById("mycanvas");
const container = document.getElementById("container");
const c = canvas.getContext("2d");

// //function to resize the canvas based on container
// resize();
// function resize() {
//     canvas.height = container.clientHeight;
//     canvas.width = container.clientWidth;
// }
// window.addEventListener("resize", resize);

// Function to resize the canvas based on device pixel ratio
function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    // Save the current transformation matrix
    const transform = c.getTransform();

    // Adjust canvas size based on container size and device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set the style width and height to match the container
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Reset the transformation matrix
    c.setTransform(1, 0, 0, 1, 0, 0);

    // Scale the context to match the device pixel ratio
    c.scale(dpr, dpr);

    // Restore the previous transformation matrix
    c.setTransform(transform);
}

resize();
window.addEventListener("resize", resize);

const gravity = 0.5;
const friction = 0.98; // Friction coefficient for rolling

class Ball {
    constructor(position, radius, color, bounciness) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.bounciness = bounciness;
        this.velocity = {
            x: 0,
            y: 0,
        };
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update() {
        this.radius = canvas.height / 20;
        this.draw();

        this.position.x += this.velocity.x;

        // Make the ball fall
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;

        // Detect collision with the ground
        if (this.radius + this.position.y + this.velocity.y > canvas.height) {
            // Stop the ball
            this.position.y = canvas.height - this.radius;
            // Add bounciness to the ball
            this.velocity.y *= -this.bounciness;
            // Apply friction to horizontal velocity when ball is rolling on the ground
            this.velocity.x *= friction;
        }

        // Detect collision with the top
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }

        // Detect collisions with the sides
        if (this.position.x + this.radius > canvas.width) {
            this.position.x = canvas.width - this.radius;
            this.velocity.x *= -1;
        } else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
    }
}

const ball = new Ball(
    { x: canvas.width * 0.25, y: canvas.width * 0.25 },
    canvas.height / 20,
    'darkgoldenrod',
    1
);

const keys = {
    d: { pressed: false },
    a: { pressed: false }
};

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the instruction text
    c.font = "28px Arial";
    c.fillStyle = "#624621";
    const text = "Control the ball using 'w a d' keys";
    const textWidth = c.measureText(text).width;
    c.fillText(text, (canvas.width - textWidth) / 2, (canvas.height ) / 2);

    ball.update();

    // Controls
    if (keys.d.pressed) {
        if (ball.position.x + ball.radius < canvas.width) {
            ball.velocity.x = 6;
        } else {
            ball.velocity.x = 0;
        }
    } else if (keys.a.pressed) {
        if (ball.position.x - ball.radius > 0) {
            ball.velocity.x = -6;
        } else {
            ball.velocity.x = 0;
        }
    } 
    // else {
    //     ball.velocity.x *= friction; // Apply friction when no key is pressed
    // }
}

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            if (ball.position.y + ball.radius <= canvas.height) {
                ball.velocity.y = -15;
            }
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
});
