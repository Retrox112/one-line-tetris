# one-line-tetris
a one line URL tetris

use the URL:

data:text/html,<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>One Line Tertis</title><style>*{box-sizing:border-box;margin:0;padding:0;user-select:none}body{background-color:%23000;color:%23fff;font-family:'Courier New',Courier,monospace;min-height:100vh;display:flex;justify-content:center;align-items:center;overflow:hidden}.game{display:flex;flex-direction:row;align-items:flex-start;gap:24px}.box{border:2px solid %23fff;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px}.value{font-size:20px;font-weight:bold;width:100%25;text-align:center;margin-bottom:4px}.board-container{position:relative;border:2px solid %23fff}%23board{background-color:%23000;display:block}</style>></head><body><div class="game"><div class="box"><h2>One Line Tetris</h2><div>Score</div><div class="value">0</div></div><div class="board-container"><canvas id="board" width="300" height="600"></canvas></div><script>const e=document.getElementById("board"),t=e.getContext("2d"),n=document.querySelector(".value"),o=30,l=Array.from({length:20},()=>Array(10).fill(0));let i,r,c=0,f=0,a=0;const y=(e,t=.08,n=0)=>{i||(i=new(window.AudioContext||window.webkitAudioContext));const o=i.currentTime+n,l=i.createOscillator(),r=i.createGain();l.type="sine",l.frequency.setValueAtTime(e,o),r.gain.setValueAtTime(.15,o),r.gain.exponentialRampToValueAtTime(.001,o+t),l.connect(r),r.connect(i.destination),l.start(o),l.stop(o+t)},m=[[[1,1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[1,1],[1,1]],[[0,1,1],[1,1,0]],[[0,1,0],[1,1,1]],[[1,1,0],[0,1,1]]],s=()=>{const e=m[7*Math.random()|0];return{m:e,x:(10-e[0].length)/2|0,y:0}};r=s();const u=(e,n)=>e.forEach((e,l)=>e.forEach((e,i)=>{e&&(t.fillStyle="%23fff",t.fillRect((i+n.x)*o,(l+n.y)*o,o,o),t.fillStyle="%23000",t.fillRect((i+n.x)*o+2,(l+n.y)*o+2,26,26),t.fillStyle="%23fff",t.fillRect((i+n.x)*o+3,(l+n.y)*o+3,24,24))})),x=e=>e.m.some((t,n)=>t.some((t,o)=>t&&0!==l[n+e.y]?.[o+e.x]));function d(){if(r.y++,x(r)){r.y--,r.m.forEach((e,t)=>e.forEach((e,n)=>e&&(l[t+r.y][n+r.x]=1))),y(90,.1);let e=0;for(let t=19;t>=0;t--)l[t].every(e=>e)&&(l.splice(t,1),l.unshift(Array(10).fill(0)),e++,t++);e&&(n.textContent=c+=10*e,y(220,.15)),r=s(),x(r)&&(y(220,.12),y(120,.12,.12),y(60,.25,.24),l.forEach(e=>e.fill(0)),n.textContent=c=0,r=s())}else y(100,.03);f=0}document.addEventListener("keydown",e=>{if("ArrowLeft"===e.key&&(r.x--,x(r)?r.x++:y(120,.04)),"ArrowRight"===e.key&&(r.x++,x(r)?r.x--:y(120,.04)),"ArrowDown"===e.key&&d(),"ArrowUp"===e.key){const e=r.m;r.m=e[0].map((t,n)=>e.map(e=>e[n]).reverse()),x(r)?r.m=e:y(180,.05)}}),function n(o=0){(f+=o-a)>800&&d(),a=o,t.fillStyle="%23000",t.fillRect(0,0,e.width,e.height),u(l,{x:0,y:0}),u(r.m,r),requestAnimationFrame(n)}();</script></body></html>

copy and paste this into your url bar to play tetris

controls are:

Left arrow key --> move left
Right arrow key --> move right
Up arrow key --> rotate
Down arrow key --> drop faster

the keymap is not in the website cause i just cant put it in without passing the 3kb limit, trust me, i tried HARD.

i managed to integrate sounds using sine waves, and i do not wanna js for at-least a few days after this.

AI Disclosure: AI was used in the js part cause i could not figure out this language, i still dont know how my code works, and i did use AI to shorthand the variable and function names for me cause i was too exhausted to do it myself by the end of it. thanks for aknowledging this.

i hope you enjoy this game i made, and do play it whenever you may want. thanks.
