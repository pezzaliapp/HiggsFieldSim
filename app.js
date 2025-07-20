
const canvas = document.getElementById("higgsCanvas");
const ctx = canvas.getContext("2d");

let x = 10, y = canvas.height / 2;
let speed = 2;
let radius = 10;
let mode = "";

function modalitaParticella() {
  mode = "particella";
  x = 10;
  radius = 10;
  document.getElementById("info").innerText = "Osserva come una particella acquisisce massa attraversando il campo di Higgs.";
  animate();
}

function modalitaCERN() {
  mode = "cern";
  angle = 0;
  document.getElementById("info").innerText = "Simulazione dell'esperimento CERN: collisione e nascita del bosone di Higgs.";
  animateCERN();
}

// CAMPO DI HIGGS
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
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  if (mode !== "particella") return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField();
  drawParticle();

  if (x > fieldStart && x < fieldEnd) {
    speed = 1;
    if (radius < 20) radius += 0.2;
  } else {
    speed = 2;
    radius = 10;
  }

  x += speed;
  if (x > canvas.width + 10) x = -10;
  requestAnimationFrame(animate);
}

// CERN SIMULATION
let angle = 0;

function animateCERN() {
  if (mode !== "cern") return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // draw collider ring
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, 2 * Math.PI);
  ctx.stroke();

  // particle beams
  ctx.fillStyle = "#00FFFF";
  ctx.beginPath();
  ctx.arc(100 * Math.cos(angle), 100 * Math.sin(angle), 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(-100 * Math.cos(angle), -100 * Math.sin(angle), 5, 0, 2 * Math.PI);
  ctx.fill();

  // collision flash
  if (Math.abs(angle - Math.PI) < 0.1) {
    ctx.fillStyle = "rgba(255,0,0,0.6)";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#FF69B4";
    ctx.beginPath();
    ctx.arc(0, 0, 5 + Math.random() * 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  angle += 0.05;
  if (angle > 2 * Math.PI) angle = 0;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(animateCERN);
}
