
let testi = {
  "it": {
    "start": "Seleziona una modalità per iniziare la simulazione.",
    "particella": "Osserva come una particella acquisisce massa attraversando il campo di Higgs.",
    "cern": "Simulazione dell'esperimento CERN: collisione e nascita del bosone di Higgs.",
    "explain_particella": "Secondo il Modello Standard, le particelle non hanno massa propria. Acquisiscono massa attraversando il campo di Higgs, che permea l'intero universo.",
    "explain_cern": "Al CERN, due fasci di protoni vengono accelerati e fatti collidere. Da queste collisioni può emergere il bosone di Higgs, confermando la teoria."
  },
  "en": {
    "start": "Select a mode to start the simulation.",
    "particella": "Watch how a particle gains mass while crossing the Higgs field.",
    "cern": "CERN experiment simulation: collision and Higgs boson appearance.",
    "explain_particella": "According to the Standard Model, particles have no intrinsic mass. They gain it by interacting with the Higgs field that fills the universe.",
    "explain_cern": "At CERN, two beams of protons are accelerated and made to collide. From these collisions, the Higgs boson can emerge, confirming the theory."
  }
};

let currentLang = "it";

function cambiaLingua() {
  currentLang = document.getElementById("lang").value;
  document.getElementById("info").innerText = testi[currentLang]["start"];
  document.getElementById("explain").innerText = "";
  document.getElementById("audioPlayer").src = "";
}


const canvas = document.getElementById("higgsCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;
let collisionStep = 0;
let mode = "";
let particles = [];

function modalitaParticella() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mode = "particella";
  x = 10;
  radius = 10;
  document.getElementById("info").innerText = testi[currentLang]["particella"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_particella"];
  document.getElementById("audioPlayer").src = "audio/particella-" + currentLang + ".mp3";
  animate();
}

function modalitaCERN() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  mode = "cern";
  angle = 0;
  collisionStep = 0;
  particles = [];
  document.getElementById("info").innerText = testi[currentLang]["cern"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_cern"];
  document.getElementById("audioPlayer").src = "audio/cern-" + currentLang + ".mp3";
  animateCERN();
}

// Simulazione campo Higgs
let x = 10, y = canvas.height / 2;
let speed = 2;
let radius = 10;
let fieldStart = 120, fieldEnd = 280;
let hasAcquiredMass = false;

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

  if (!hasAcquiredMass && x > fieldStart && x < fieldEnd) {
    speed = 1;
    if (radius < 20) {
      radius += 0.2;
    } else {
      hasAcquiredMass = true;
    }
  }

  x += speed;
  if (x > canvas.width + 10) {
    x = -10;
    if (hasAcquiredMass) {
      speed = 1;
      radius = 20;
    }
  }

  requestAnimationFrame(animate);
}

function animateCERN() {
  if (mode !== "cern") return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // disegna rivelatore ATLAS stilizzato
  for (let r = 20; r <= 100; r += 20) {
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if (particles.length === 0) {
    for (let i = 0; i < 25; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let speed = 1 + Math.random() * 2;
      particles.push({
        x: 0,
        y: 0,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        label: (i === 12 ? "H" : (Math.random() > 0.7 ? "μ⁺" : (Math.random() > 0.5 ? "γ" : "e⁻")))
      });
    }
  }

  for (let p of particles) {
    p.x += p.dx * globalSpeed;
    p.y += p.dy * globalSpeed;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "10px sans-serif";
    ctx.fillText(p.label, p.x + 4, p.y);
  }

  ctx.restore();
  requestAnimationFrame(animateCERN);
}

