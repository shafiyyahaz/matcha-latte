const products=[
['classic','Classic Matcha Latte',28000,'creamy','https://upload.wikimedia.org/wikipedia/commons/2/25/Matcha_Tea_Latte_%286293795173%29.jpg','Silky, earthy & mellow.'],
['strawberry','Strawberry Matcha',32000,'fresh','https://images.pexels.com/photos/34491288/pexels-photo-34491288.jpeg?auto=compress&cs=tinysrgb&w=1200','Sweet berries meet earthy green.'],
['mango','Mango Matcha',32000,'fresh','https://images.pexels.com/photos/37105479/pexels-photo-37105479.jpeg?auto=compress&cs=tinysrgb&w=1200','Tropical, bright & refreshing.'],
['coconut','Coconut Matcha',30000,'creamy','https://upload.wikimedia.org/wikipedia/commons/c/cb/Coconut_Milk_Matcha_Latte.jpg','Soft, creamy & lightly tropical.'],
['hot','Hot Matcha Latte',30000,'creamy','https://upload.wikimedia.org/wikipedia/commons/f/f7/Hot_Matcha_Latte.jpg','Warm, delicate & comforting.'],
['tall','Iced Matcha',30000,'fresh','https://upload.wikimedia.org/wikipedia/commons/c/ce/Matcha_latte_in_tall_glass.jpg','Bright, clean & refreshing.'],
['cloud','Matcha Cloud',33000,'creamy','https://upload.wikimedia.org/wikipedia/commons/8/8e/Matcha_Latte_im_Glas.jpg','Light, foamy & dreamy.'],
['choco','Chocolate Matcha',33000,'creamy','https://images.pexels.com/photos/14262578/pexels-photo-14262578.jpeg?auto=compress&cs=tinysrgb&w=1200','Cocoa comfort with green tea.']
];
let bag=[];const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);const grid=document.querySelector('#grid');
function render(f='all'){grid.innerHTML=products.filter(p=>f==='all'||p[3]===f).map(p=>`<article class="card"><img src="${p[4]}" alt="${p[1]}" loading="lazy"><div class="card-body"><h3>${p[1]}</h3><p>${p[5]}</p><div class="row"><b>${rupiah(p[2])}</b><button class="plus" onclick="add('${p[0]}')">+</button></div></div></article>`).join('')}
function add(id){bag.push(products.find(p=>p[0]===id));renderBag();openBag()}
function renderBag(){document.querySelector('#count').textContent=bag.length;document.querySelector('#items').innerHTML=bag.length?bag.map(p=>`<div class="item"><span>${p[1]}</span><b>${rupiah(p[2])}</b></div>`).join(''):'<p style="color:#777">Your bag is still empty.</p>';document.querySelector('#total').textContent=rupiah(bag.reduce((s,p)=>s+p[2],0))}
function openBag(){document.querySelector('#drawer').classList.add('open');document.querySelector('#overlay').classList.add('show')}
function closeBag(){document.querySelector('#drawer').classList.remove('open');document.querySelector('#overlay').classList.remove('show')}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.f)});document.querySelector('#bagBtn').onclick=openBag;document.querySelector('#close').onclick=closeBag;document.querySelector('#overlay').onclick=closeBag;document.querySelector('#surprise').onclick=()=>add(products[Math.floor(Math.random()*products.length)][0]);document.querySelectorAll('.add').forEach(b=>b.onclick=()=>add(b.dataset.id));document.querySelector('#order').onclick=()=>{if(!bag.length)return alert('Tambahkan minuman dulu ya ✦');const t='Halo kak, aku mau pesan:%0A'+bag.map(p=>'• '+p[1]+' — '+rupiah(p[2])).join('%0A');window.open('https://wa.me/?text='+t,'_blank')};render();renderBag();
