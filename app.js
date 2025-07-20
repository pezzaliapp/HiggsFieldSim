
let testi = {
  "it": {
    "title": "Higgs Field Simulator",
    "btnParticella": "🔴 Particella nel Campo di Higgs",
    "btnCERN": "💥 Simula Esperimento CERN",
    "start": "Seleziona una modalità per iniziare la simulazione.",
    "particella": "Osserva come una particella acquisisce massa attraversando il campo di Higgs.",
    "cern": "Simulazione dell'esperimento CERN: collisione e nascita del bosone di Higgs.",
    "explain_particella": "Secondo il Modello Standard, le particelle non hanno massa propria. Acquisiscono massa attraversando il campo di Higgs, che permea l'intero universo.",
    "explain_cern": "Al CERN, due fasci di protoni vengono accelerati e fatti collidere. Da queste collisioni può emergere il bosone di Higgs, confermando la teoria.",
    "speed": "Velocità:"
  },
  "en": {
    "title": "Higgs Field Simulator",
    "btnParticella": "🔴 Particle in the Higgs Field",
    "btnCERN": "💥 Simulate CERN Experiment",
    "start": "Select a mode to start the simulation.",
    "particella": "Watch how a particle gains mass while crossing the Higgs field.",
    "cern": "CERN experiment simulation: collision and Higgs boson appearance.",
    "explain_particella": "According to the Standard Model, particles have no intrinsic mass. They gain it by interacting with the Higgs field that fills the universe.",
    "explain_cern": "At CERN, two beams of protons are accelerated and made to collide. From these collisions, the Higgs boson can emerge, confirming the theory.",
    "speed": "Speed:"
  }
};

let currentLang = "it";

function cambiaLingua() {
  currentLang = document.getElementById("lang").value;
  document.getElementById("title").innerText = testi[currentLang]["title"];
  document.getElementById("btnParticella").innerText = testi[currentLang]["btnParticella"];
  document.getElementById("btnCERN").innerText = testi[currentLang]["btnCERN"];
  document.getElementById("info").innerText = testi[currentLang]["start"];
  document.getElementById("speedControl").innerHTML = testi[currentLang]["speed"] + ' <input type="range" id="speedSlider" min="0.5" max="4" step="0.1" value="1" oninput="updateSpeed(this.value)">';
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
  mode = "particella";
  x = 10;
  radius = 10;
  hasAcquiredMass = false;
  document.getElementById("info").innerText = testi[currentLang]["particella"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_particella"];
  let player=document.getElementById("audioPlayer");
  player.src="audio/particella-" + currentLang + ".mp3";
  player.style.display="block";
  player.load();
  player.play().catch(()=>console.log("Autoplay bloccato"));
  animate();
}

function modalitaCERN() {
  mode = "cern";
  angle = 0;
  collisionStep = 0;
  particles = [];
  document.getElementById("info").innerText = testi[currentLang]["cern"];
  document.getElementById("explain").innerText = testi[currentLang]["explain_cern"];
  let player=document.getElementById("audioPlayer");
  player.src="audio/cern-" + currentLang + ".mp3";
  player.style.display="block";
  player.load();
  player.play().catch(()=>console.log("Autoplay bloccato"));
  animateCERN();
}

// Simulazione campo Higgs
let x = 10, y = canvas.height / 2;
let speed = 2;
let radius = 10;
  hasAcquiredMass = false;
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

  if (!hasAcquiredMass && x > fieldStart && x < fieldEnd) {
    speed = 1;
    if (radius < 20) {
      radius += 0.2 * globalSpeed;
    } else {
      hasAcquiredMass = true;
    }
  }

  x += speed * globalSpeed;
  if (x > canvas.width + 10) {
    x = -10;
    if (hasAcquiredMass) {
      // mantiene massa e velocità dopo la prima interazione
      speed = 1;
      radius = 20;
    }
  }

  requestAnimationFrame(animate);
}
function animateCERN() {
  if (mode !== "cern") return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (collisionStep < 100) {
    // disegna fasci
    ctx.fillStyle = "#00FFFF";
    ctx.beginPath();
    ctx.arc(-collisionStep + 50, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(collisionStep - 50, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    collisionStep += 2 * globalSpeed;
  } else {
    // esplosione e particelle
    if (particles.length === 0) {
      for (let i = 0; i < 20; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let speed = 1 + Math.random() * 2;
        particles.push({
          x: 0,
          y: 0,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          label: (i === 5 ? "H" : (Math.random() > 0.7 ? "e⁻" : (Math.random() > 0.5 ? "μ⁺" : "γ")))
        });
      }
    }

    for (let p of particles) {
      p.x += p.dx * globalSpeed;
      p.y += p.dy * globalSpeed;
      ctx.fillStyle = "#FF69B4";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "10px sans-serif";
      ctx.fillText(p.label, p.x + 5, p.y);
    }
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(animateCERN);
}

let globalSpeed = 1;
let hasAcquiredMass = false;
function updateSpeed(val){globalSpeed=parseFloat(val);}