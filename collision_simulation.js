
const canvas = document.getElementById("cernCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let animationId;

function createParticles() {
  particles = [];
  const colors = ["#ffcc00", "#00ff99", "#66ccff", "#ff6699", "#ccff00"];
  for (let i = 0; i < 150; i++) {
    let angle = Math.random() * 2 * Math.PI;
    let speed = Math.random() * 5 + 1;
    particles.push({
      x: centerX,
      y: centerY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + 2,
    });
  }
  const sound = document.getElementById("explosionSound");
  sound.currentTime = 0;
  sound.play();
}

function updateParticles() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
  }
  animationId = requestAnimationFrame(updateParticles);
}

function restartSimulation() {
  cancelAnimationFrame(animationId);
  createParticles();
  updateParticles();
}

createParticles();
updateParticles();
