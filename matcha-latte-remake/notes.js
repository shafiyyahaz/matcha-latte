const notes=[
"Pelan-pelan saja. Hal indah juga tumbuh dengan waktu.",
"You are allowed to have soft days, too.",
"Semoga hari ini terasa selembut cahaya pagi.",
"One small step is still a step forward.",
"Tarik napas. Kamu tidak harus menyelesaikan semuanya hari ini.",
"May your little efforts bloom into something beautiful.",
"Keep going gently. Your pace is still a pace.",
"Semoga ada satu hal kecil hari ini yang membuatmu tersenyum.",
"Rest is not falling behind. It is making room to breathe.",
"Let today be simple, warm, and a little bit green."
];
const quote=document.querySelector('#quote'), num=document.querySelector('#noteNumber'), button=document.querySelector('#another');
let last=0;
function nextNote(){
  let i=Math.floor(Math.random()*notes.length);
  while(i===last && notes.length>1)i=Math.floor(Math.random()*notes.length);
  last=i;
  quote.style.opacity='0';
  quote.style.transform='translateY(8px)';
  setTimeout(()=>{quote.textContent=notes[i];num.textContent=String(i+1).padStart(2,'0');quote.style.opacity='1';quote.style.transform='translateY(0)'},180);
}
button.addEventListener('click',nextNote);
