const canvas = document.getElementById("mycanvas");
const container = document.getElementById("container");
const c = canvas.getContext("2d");

resize();
function resize() {
    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;
}
window.addEventListener("resize", resize);

const gravity = 0.5;
const friction = 0.98; // Friction coefficient

class Ball {
    constructor(position, radius, color, bounciness) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.bounciness = bounciness;
        this.velocity = {
            x: Math.floor(Math.random() * 6) + 3,
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

        // Make the ball fall
        this.velocity.y += gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Detect collision with the ground
        if (this.radius + this.position.y + this.velocity.y > canvas.height) {
            // Stop the ball
            this.position.y = canvas.height - this.radius;
            // Add bounciness to the ball
            this.velocity.y *= -this.bounciness;

            // Apply friction to horizontal velocity when ball is rolling on the ground
            this.velocity.x *= friction;

            // Stop the ball completely if velocity is very low to prevent endless rolling
            if (Math.abs(this.velocity.x) < 0.1) {
                this.velocity.x = 0;
            }
        }

        // Detect collisions with the sides
        if (this.radius + this.position.x + this.velocity.x > canvas.width) {
            this.position.x = canvas.width - this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.x - this.radius + this.velocity.x < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }

        // Apply friction when the ball is on the ground
        if (this.position.y + this.radius >= canvas.height) {
            this.velocity.x *= friction;
        }
    }
}

//creating ball objects
const ball = new Ball(
    { x: canvas.width * 0.25, y: canvas.width * 0.25 },
    canvas.height / 20,
    'darkgoldenrod',
    1
);

const ball_1 = new Ball(
    { x: canvas.width * 0.75, y: canvas.width * 0.25 },
    canvas.height / 20,
    '#ad5c22',
    0.99
);

// Collision detection between the balls
function distance(posA, posB) {
    const disX = posA.x - posB.x;
    const disY = posA.y - posB.y;
    return Math.sqrt(disX * disX + disY * disY);
}

function collision(posA, radA, posB, radB) {
    const Distance = distance(posA, posB);
    const diameter = radA + radB;
    return Distance < diameter;
}

function resolveCollision(ballA, ballB) {
    const posA = ballA.position;
    const velA = ballA.velocity;
    const radA = ballA.radius;
    const posB = ballB.position;
    const velB = ballB.velocity;
    const radB = ballB.radius;

    const dx = posA.x - posB.x;
    const dy = posA.y - posB.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Normal vector
    const nx = dx / dist;
    const ny = dy / dist;

    // Tangent vector
    const tx = -ny;
    const ty = nx;

    // Dot product tangent
    const dpTan1 = velA.x * tx + velA.y * ty;
    const dpTan2 = velB.x * tx + velB.y * ty;

    // Dot product normal
    const dpNorm1 = velA.x * nx + velA.y * ny;
    const dpNorm2 = velB.x * nx + velB.y * ny;

    // Conservation of momentum in 1D
    const m1 = radA * radA;
    const m2 = radB * radB;
    const momentum1 = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
    const momentum2 = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);

    // Update velocities
    ballA.velocity.x = tx * dpTan1 + nx * momentum1;
    ballA.velocity.y = ty * dpTan1 + ny * momentum1;
    ballB.velocity.x = tx * dpTan2 + nx * momentum2;
    ballB.velocity.y = ty * dpTan2 + ny * momentum2;

    // Adjust positions to prevent overlap
    const overlap = (radA + radB) - dist;
    const correctionFactor = 0.5;
    const correctionX = nx * overlap * correctionFactor;
    const correctionY = ny * overlap * correctionFactor;

    ballA.position.x += correctionX;
    ballA.position.y += correctionY;
    ballB.position.x -= correctionX;
    ballB.position.y -= correctionY;
}

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    ball_1.update();

    if (collision(ball.position, ball.radius, ball_1.position, ball_1.radius)) {
        resolveCollision(ball, ball_1);
    }
}

animate();
