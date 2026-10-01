const C = document.getElementById('board'), X = C.getContext('2d'), S = document.querySelector('.value');
const W = 10, H = 20, Z = 30;
const B = Array.from({ length: H }, () => Array(W).fill(0));
let s = 0, d = 0, t = 0, A, p;

// sound gen func
const snd = (f, u = 0.08, l = 0) => {
  if (!A) A = new (window.AudioContext || window.webkitAudioContext)();
  const T = A.currentTime + l, o = A.createOscillator(), g = A.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(f, T);
  g.gain.setValueAtTime(0.15, T); g.gain.exponentialRampToValueAtTime(0.001, T + u);
  o.connect(g); g.connect(A.destination); o.start(T); o.stop(T + u);
};

// shape def
const P = [
  [[1,1,1,1]], 
  [[1,0,0],[1,1,1]], 
  [[0,0,1],[1,1,1]], 
  [[1,1],[1,1]], 
  [[0,1,1],[1,1,0]], 
  [[0,1,0],[1,1,1]], 
  [[1,1,0],[0,1,1]]
];

//rand shape gen
const cP = () => { const m = P[Math.random() * 7 | 0]; return { m, x: (W - m[0].length) / 2 | 0, y: 0 }; };
p = cP();

// draw shape func
const dM = (m, o) => m.forEach((r, y) => r.forEach((v, x) => {
  if (v) {
    X.fillStyle = '#fff'; X.fillRect((x + o.x) * Z, (y + o.y) * Z, Z, Z);
    X.fillStyle = '#000'; X.fillRect((x + o.x) * Z + 2, (y + o.y) * Z + 2, Z - 4, Z - 4);
    X.fillStyle = '#fff'; X.fillRect((x + o.x) * Z + 3, (y + o.y) * Z + 3, Z - 6, Z - 6);
  }
}));

// collision detect
const col = k => k.m.some((r, y) => r.some((v, x) => v && (B[y + k.y]?.[x + k.x] !== 0)));

// drop fun
function drp() {
  p.y++;
  if (col(p)) {
    p.y--;
    p.m.forEach((r, y) => r.forEach((v, x) => v && (B[y + p.y][x + p.x] = 1)));
    snd(90, 0.1);
    
    let l = 0;
    for (let y = H - 1; y >= 0; y--) {
      if (B[y].every(v => v)) { B.splice(y, 1); B.unshift(Array(W).fill(0)); l++; y++; }
    }
    if (l) { S.textContent = s += l * 10; snd(220, 0.15); }

    p = cP();
    if (col(p)) {
      snd(220, 0.12); snd(120, 0.12, 0.12); snd(60, 0.25, 0.24);
      B.forEach(r => r.fill(0)); S.textContent = s = 0; p = cP();
    }
  } else snd(100, 0.03);
  d = 0;
}

// main game func
function up(tm = 0) {
  if ((d += tm - t) > 800) drp();
  t = tm;
  X.fillStyle = '#000'; X.fillRect(0, 0, C.width, C.height);
  dM(B, { x: 0, y: 0 });
  dM(p.m, p);
  requestAnimationFrame(up);
}

// input an stuff
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { p.x--; col(p) ? p.x++ : snd(120, 0.04); }
  if (e.key === 'ArrowRight') { p.x++; col(p) ? p.x-- : snd(120, 0.04); }
  if (e.key === 'ArrowDown') drp();
  if (e.key === 'ArrowUp') {
    const o = p.m;
    p.m = o[0].map((_, i) => o.map(r => r[i]).reverse());
    col(p) ? p.m = o : snd(180, 0.05);
  }
});

up();