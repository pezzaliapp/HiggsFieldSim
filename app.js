
let testi = {
  "it": {
    "start": "Seleziona una modalità per iniziare la simulazione.",
    "particella": "Osserva come una particella acquisisce massa attraversando il campo di Higgs.",
    "cern": "Simulazione dell'esperimento CERN: collisione e nascita del bosone di Higgs.",
    "explain_particella": "Secondo il Modello Standard, le particelle non hanno massa propria. Acquisiscono massa attraversando il campo di Higgs, che permea l'intero universo.",
    "explain_cern": "Al CERN, due fasci di protoni vengono accelerati e fatti collidere. Da queste collisioni può emergere il bosone di Higgs, confermando la teoria.",
    "note_mass": "Nota: il campo di Higgs è presente ovunque. Nella realtà, una particella non perde la massa dopo averlo attraversato."
  },
  "en": {
    "start": "Select a mode to start the simulation.",
    "particella": "Watch how a particle gains mass while crossing the Higgs field.",
    "cern": "CERN experiment simulation: collision and Higgs boson appearance.",
    "explain_particella": "According to the Standard Model, particles have no intrinsic mass. They gain it by interacting with the Higgs field that fills the universe.",
    "explain_cern": "At CERN, two beams of protons are accelerated and made to collide. From these collisions, the Higgs boson can emerge, confirming the theory.",
    "note_mass": "Note: The Higgs field is present everywhere. In reality, a particle does not lose its mass after passing through it."
  }
};

let currentLang = "it";

function cambiaLingua() {
  currentLang = document.getElementById("lang").value;
  document.getElementById("info").innerText = testi[currentLang]["start"];
  document.getElementById("explain").innerText = "";
  document.getElementById("note").innerText = "";  resetCanvas();
}

const canvas = document.getElementById("higgsCanvas");
const ctx = canvas.getContext("2d");

let animationId;
let angle = 0;
let collisionStep = 0;
let mode = "";
let particles = [];

function resetCanvas() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function modalitaParticella() {
  resetCanvas();
  mode = "particella";
  x = 10;
  radius = 10;
  acquiredMass = false;
  document.getElementById("info").innerText = testi[currentLang]["particella"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_particella"];
  document.getElementById("note").innerText = testi[currentLang]["note_mass"];  animate();
}

function modalitaCERN() {
  resetCanvas();
  mode = "cern";
  angle = 0;
  collisionStep = 0;
  particles = [];
  document.getElementById("info").innerText = testi[currentLang]["cern"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_cern"];
  document.getElementById("note").innerText = "";  animateCERN();
}

// Particella
let x = 10, y = canvas.height / 2;
let speed = 2;
let radius = 10;
let fieldStart = 120, fieldEnd = 280;
let acquiredMass = false;

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
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField();

  if (x >= fieldStart && x <= fieldEnd && !acquiredMass) {
    radius = 20;
    speed = 1;
    acquiredMass = true;
  }

  drawParticle();
  x += speed;
  if (x > canvas.width + 20) {
    x = 10;
    radius = 10;
    speed = 2;
    acquiredMass = false;
  }
}

// CERN
function animateCERN() {
  animationId = requestAnimationFrame(animateCERN);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (collisionStep === 0) {
    let p1 = { x: canvas.width / 4, y: canvas.height / 2, dx: 2 };
    let p2 = { x: 3 * canvas.width / 4, y: canvas.height / 2, dx: -2 };
    particles = [p1, p2];
    collisionStep = 1;
  }

  if (collisionStep === 1) {
    for (let p of particles) {
      p.x += p.dx;
      ctx.fillStyle = "#00FFFF";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    if (Math.abs(particles[0].x - particles[1].x) < 5) {
      collisionStep = 2;
      explosionFrame = 0;
    }
  }

  if (collisionStep === 2) {
    explosionFrame++;
    for (let r = 10; r < 100; r += 10) {
      ctx.strokeStyle = `rgba(255, 255, 0, ${1 - explosionFrame / 30})`;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, r + explosionFrame, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (explosionFrame > 30) {
      collisionStep = 0;
    }
  }
}
