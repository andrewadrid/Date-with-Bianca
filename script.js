const questionPage = document.getElementById('page-question');
const yesPage = document.getElementById('page-yes');
const datePage = document.getElementById('page-date');
const finalPage = document.getElementById('page-final');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const okayBtn = document.getElementById('okayBtn');
const submitBtn = document.getElementById('submitBtn');
const buttonZone = document.getElementById('buttonZone');
const noMessage = document.getElementById('noMessage');

let noAttempts = 0;

function show(page) {
  [questionPage, yesPage, datePage, finalPage].forEach(p => p.classList.add('hidden'));
  page.classList.remove('hidden');
}

function placeNoInsideZone() {
  const zone = buttonZone.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const padding = 8;
  const maxX = Math.max(padding, zone.width - btn.width - padding);
  const maxY = Math.max(padding, zone.height - btn.height - padding);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.classList.add('escape');
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function noAction(event) {
  if (event) event.preventDefault();
  noAttempts++;

  if (noAttempts === 1) {
    noBtn.textContent = 'NU 🙈';
    noMessage.textContent = 'Ești sigură? 🥺';
    placeNoInsideZone();
    return;
  }

  if (noAttempts === 2) {
    noBtn.textContent = 'NU 😅';
    noMessage.textContent = 'Mai gândește-te... 🤨';
    placeNoInsideZone();
    return;
  }

  if (noAttempts === 3) {
    noBtn.textContent = 'nu';
    noBtn.classList.add('tiny');
    noMessage.textContent = 'Butonul se face mic de rușine 😭';
    placeNoInsideZone();
    return;
  }

  noBtn.textContent = 'NU ✨';
  noMessage.textContent = 'Universul nu acceptă răspunsul NU 😌✨';
  placeNoInsideZone();
}

noBtn.addEventListener('mouseover', noAction);
noBtn.addEventListener('click', noAction);
noBtn.addEventListener('touchstart', noAction, { passive: false });

yesBtn.addEventListener('click', () => {
  show(yesPage);
  confetti();
});

okayBtn.addEventListener('click', () => show(datePage));

submitBtn.addEventListener('click', () => {
  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;
  const message = document.getElementById('messageInput').value.trim();

  if (!date) {
    alert('Alege întâi o dată 😭');
    return;
  }

  const niceDate = new Date(date + 'T12:00:00').toLocaleDateString('ro-RO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  document.getElementById('finalText').innerHTML =
    `Ne vedem <b>${niceDate}</b><br>la <b>${time}</b>${message ? `<br><br>Mesajul tău: „${escapeHtml(message)}”` : ''}<br><br>Abia aștept! 🥰`;

  show(finalPage);
  confetti();
});

function confetti() {
  const items = ['💗', '🌸', '💕', '✨', '❤️', '💖'];
  for (let i = 0; i < 32; i++) {
    const span = document.createElement('span');
    span.className = 'confetti';
    span.textContent = items[Math.floor(Math.random() * items.length)];
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDelay = Math.random() * 0.8 + 's';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 3500);
  }
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
