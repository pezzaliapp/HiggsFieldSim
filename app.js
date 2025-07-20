
const canvas = document.getElementById("higgsCanvas");
const ctx = canvas.getContext("2d");

let x = 10, y = canvas.height / 2;
let speed = 2;
let fieldStart = 120, fieldEnd = 280;

function drawField() {
  ctx.fillStyle = "#111";
  ctx.fillRect(fieldStart, 0, fieldEnd - fieldStart, canvas.height);
  for (let i = 0; i < 100; i++) {
    let px = fieldStart + Math.random() * (fieldEnd - fieldStart);
    let py = Math.random() * canvas.height;
    ctx.fillStyle = "rgba(0,255,255,0.2)";
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParticle() {
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField();
  drawParticle();
  if (x > fieldStart && x < fieldEnd) {
    speed = 1; // rallenta nel campo
  } else {
    speed = 2;
  }
  x += speed;
  if (x > canvas.width + 10) x = -10;
  requestAnimationFrame(animate);
}

animate();
