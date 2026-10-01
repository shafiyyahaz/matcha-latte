const notes=[
["Kamu sudah melakukan banyak hal baik hari ini, dan itu semua berarti.","pelan-pelan juga tetap maju"],
["Hal-hal baik selalu datang di waktu yang tepat.","percaya pada prosesmu"],
["Jangan terlalu keras pada diri sendiri. Kamu sudah sejauh ini, dan itu luar biasa.","kamu sudah cukup"],
["Setiap langkah kecil yang kamu ambil hari ini adalah bagian dari mimpi besar yang sedang kamu wujudkan.","small steps still count"],
["Kamu tidak harus sempurna untuk menjadi orang yang luar biasa.","cukup jadi dirimu sendiri"],
["Jangan bandingkan perjalananmu dengan orang lain. Setiap orang punya waktu, proses, dan cerita yang berbeda.","your pace is valid"],
["Istirahat juga bagian dari perjalanan. Kamu boleh berhenti sejenak, untuk kembali lebih kuat.","take a soft little break"],
["Kamu sudah cukup baik, apa adanya. Dan kamu tetap berharga, selalu.","a gentle reminder for you"],
["Jangan lupa untuk selalu bersyukur, karena hari ini juga adalah hadiah.","find one little thing to smile about"]
];
const backgrounds=[1,2,3,4,5,6,7,8,9].map(n=>`images/sweet-bg-${n}.jpg`);
const q=document.getElementById('quote'),t=document.getElementById('tiny'),b=document.getElementById('newNote');
const bgA=document.getElementById('bgA'),bgB=document.getElementById('bgB');
let activeBg=bgA,current=-1;
function showNote(index){
 current=index;
 const [quote,tiny]=notes[index];
 const nextBg=activeBg===bgA?bgB:bgA;
 nextBg.style.backgroundImage=`url("${backgrounds[index]}")`;
 nextBg.style.opacity='1';
 activeBg.style.opacity='0';
 activeBg=nextBg;
 q.classList.remove('note-enter'); t.classList.remove('note-enter');
 void q.offsetWidth;
 q.textContent='“'+quote+'”'; t.textContent=tiny;
 q.classList.add('note-enter'); t.classList.add('note-enter');
}
function nextNote(){let next;do{next=Math.floor(Math.random()*notes.length)}while(next===current&&notes.length>1);showNote(next)}
b.addEventListener('click',nextNote);
showNote(0);
