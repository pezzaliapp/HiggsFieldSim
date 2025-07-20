// Registra il Service Worker (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("Service Worker registrato", reg))
    .catch(err => console.error("Service Worker non registrato", err));
}

// Variabili globali
let animazioneAttiva = null;

// Funzione: resetta il canvas
function resettaSimulazione() {
  const canvas = document.getElementById("simulazioneCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (animazioneAttiva) cancelAnimationFrame(animazioneAttiva);
  canvas.style.display = "none";
  document.getElementById("notaEsplicativa")?.remove();
}

// Simulazione: Campo di Higgs
function simulaCampoHiggs() {
  resettaSimulazione();
  const canvas = document.getElementById("simulazioneCanvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  let x = 0;
  let y = canvas.height / 2;
  let radius = 10;
  let dx = 2;
  const campoInizio = canvas.width * 0.3;
  const campoFine = canvas.width * 0.7;
  let massaPresente = false;

  function disegna() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Campo di Higgs
    ctx.fillStyle = "rgba(0, 100, 255, 0.2)";
    ctx.fillRect(campoInizio, 0, campoFine - campoInizio, canvas.height);

    // Particella
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4500";
    ctx.fill();
    ctx.closePath();

    // Rallenta e ingrandisce nel campo
    if (x > campoInizio && x < campoFine) {
      if (!massaPresente) {
        dx *= 0.5;
        radius *= 1.5;
        massaPresente = true;
      }
    }

    x += dx;
    if (x - radius < canvas.width) {
      animazioneAttiva = requestAnimationFrame(disegna);
    }
  }

  disegna();

  const nota = document.createElement("div");
  nota.id = "notaEsplicativa";
  nota.style.color = "white";
  nota.style.textAlign = "center";
  nota.style.marginTop = "10px";
  nota.innerText =
    "Nota: il campo di Higgs è presente ovunque. Nella realtà, una particella non perde la massa dopo averlo attraversato.";
  canvas.parentNode.appendChild(nota);
}

// Simulazione: CERN
function simulaCERN() {
  resettaSimulazione();
  const canvas = document.getElementById("simulazioneCanvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  let x1 = 0;
  let x2 = canvas.width;
  let y = canvas.height / 2;
  let dx1 = 3;
  let dx2 = -3;
  let collided = false;

  function disegnaCollisione() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!collided && Math.abs(x1 - x2) < 20) {
      collided = true;
    }

    if (!collided) {
      // Due particelle in avvicinamento
      ctx.beginPath();
      ctx.arc(x1, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(x2, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "magenta";
      ctx.fill();
      ctx.closePath();

      x1 += dx1;
      x2 += dx2;
      animazioneAttiva = requestAnimationFrame(disegnaCollisione);
    } else {
      // Esplosione semplice simulata con onde
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.arc((x1 + x2) / 2, y, i * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,0,${1 - i * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  disegnaCollisione();
}
