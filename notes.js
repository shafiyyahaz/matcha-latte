const notes=[
["Good things take time. Let yourself grow gently.","today’s little reminder"],
["You don’t have to rush a beautiful chapter.","a soft thought for you"],
["Small moments can hold the sweetest kind of magic.","keep this little moment"],
["Breathe in. Slow down. There is still so much beauty ahead.","one gentle breath"],
["May today feel a little softer, lighter, and greener.","a tiny wish for today"],
["You are allowed to enjoy the little things.","save this feeling"],
["Take your time. Your story is still blooming.","for your growing days"]
];
const q=document.getElementById('quote'),t=document.getElementById('tiny'),b=document.getElementById('newNote');
b.addEventListener('click',()=>{const [a,c]=notes[Math.floor(Math.random()*notes.length)];q.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out'});q.textContent='“'+a+'”';t.textContent=c;});
