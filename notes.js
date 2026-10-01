const notes=[
["Good things take time. Let yourself grow gently.","today’s little reminder"],
["You don’t have to rush a beautiful chapter.","a soft thought for you"],
["Small moments can hold the sweetest kind of magic.","keep this little moment"],
["Breathe in. Slow down. There is still so much beauty ahead.","one gentle breath"],
["May today feel a little softer, lighter, and greener.","a tiny wish for today"],
["You are allowed to enjoy the little things.","save this feeling"],
["Take your time. Your story is still blooming.","for your growing days"],
["Every little step you take still counts.","for today’s journey"],
["You deserve a moment that feels calm and cozy.","a warm little reminder"]
];
const backgrounds=[
'images/sweet-bg-1.jpg','images/sweet-bg-2.jpg','images/sweet-bg-3.jpg',
'images/sweet-bg-4.jpg','images/sweet-bg-5.jpg','images/sweet-bg-6.jpg',
'images/sweet-bg-7.jpg','images/sweet-bg-8.jpg','images/sweet-bg-9.jpg'
];
const q=document.getElementById('quote'),t=document.getElementById('tiny'),b=document.getElementById('newNote');
const bgA=document.getElementById('bgA'),bgB=document.getElementById('bgB');
let activeBg=bgA;
let current=-1;
function showNote(index){
 current=index;
 const [a,c]=notes[index];
 const nextBg = activeBg === bgA ? bgB : bgA;
 nextBg.style.backgroundImage = `url(\"${backgrounds[index]}\")`;
 nextBg.style.opacity = '1';
 activeBg.style.opacity = '0';
 activeBg = nextBg;
 q.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease-out'});
 q.textContent='“'+a+'”'; t.textContent=c;
 setTimeout(()=>{},650);
}
function nextNote(){
 let next; do { next=Math.floor(Math.random()*notes.length); } while(next===current && notes.length>1);
 showNote(next);
}
b.addEventListener('click',nextNote);
showNote(0);
