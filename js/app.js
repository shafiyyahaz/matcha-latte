
const products=[
 {id:1,name:"Classic Matcha Latte",desc:"Creamy ceremonial matcha with fresh milk",price:28000,img:"images/classic-matcha.svg",cat:"classic",badge:"CLASSIC"},
 {id:2,name:"Strawberry Matcha",desc:"Sweet strawberry layer with creamy matcha",price:32000,img:"images/strawberry-matcha.svg",cat:"fruity",badge:"BEST SELLER"},
 {id:3,name:"Mango Matcha",desc:"Tropical mango meets smooth matcha latte",price:32000,img:"images/mango-matcha.svg",cat:"fruity",badge:"FRESH"},
 {id:4,name:"Choco Matcha",desc:"Rich chocolate and earthy matcha blend",price:34000,img:"images/choco-matcha.svg",cat:"choco",badge:"NEW"},
 {id:5,name:"Matcha Boba",desc:"Silky matcha latte with chewy brown sugar boba",price:35000,img:"images/boba-matcha.svg",cat:"special",badge:"FAV"},
 {id:6,name:"Honey Matcha",desc:"Natural honey sweetness with mellow matcha",price:30000,img:"images/honey-matcha.svg",cat:"special",badge:"SWEET"}
];
let cart=JSON.parse(localStorage.getItem("matchaCart")||"[]");
let activeFilter="all";
const grid=document.getElementById("productGrid"), search=document.getElementById("searchInput");
const money=n=>"Rp "+n.toLocaleString("id-ID");
function renderProducts(){
 const q=search.value.toLowerCase();
 const list=products.filter(p=>(activeFilter==="all"||p.cat===activeFilter)&&`${p.name} ${p.desc}`.toLowerCase().includes(q));
 grid.innerHTML=list.length?list.map(p=>`<article class="product-card">
 <div class="product-img"><span class="badge">${p.badge}</span><img src="${p.img}" alt="${p.name}"></div>
 <div class="product-info"><div class="product-top"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div>
 <p>${p.desc}</p><button class="add" data-add="${p.id}">+ Add to cart</button></div></article>`).join(""):`<div class="empty" style="grid-column:1/-1">No green drink found 🍃</div>`;
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add));
}
function add(id){const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({id,qty:1});save();toast("Added to your green cart 🍵");}
function save(){localStorage.setItem("matchaCart",JSON.stringify(cart));renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartCount").textContent=count;
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is waiting for something green 🍵</div>';document.getElementById("cartTotal").textContent="Rp 0";return;}
 let total=0;
 box.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><img src="${p.img}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)}</small><div class="qty"><button data-dec="${p.id}">−</button><b>${x.qty}</b><button data-inc="${p.id}">+</button></div></div><button class="remove" data-rem="${p.id}">remove</button></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(total);
 document.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>change(+b.dataset.inc,1));
 document.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>change(+b.dataset.dec,-1));
 document.querySelectorAll("[data-rem]").forEach(b=>b.onclick=()=>removeItem(+b.dataset.rem));
}
function change(id,n){const x=cart.find(x=>x.id===id);if(x){x.qty+=n;if(x.qty<1)cart=cart.filter(y=>y.id!==id);save();}}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();}
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("cartOverlay");
function openCart(){drawer.classList.add("open");overlay.classList.add("open")}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("open")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts()});
search.oninput=renderProducts;
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("matchaDark",document.body.classList.contains("dark"));};
if(localStorage.getItem("matchaDark")==="true")document.body.classList.add("dark");
let english=false;
const translations={home:"Home",menu:"Menu",story:"Our Story",contact:"Contact",order:"Order now",discover:"Discover us"};
document.getElementById("langBtn").onclick=()=>{english=!english;document.getElementById("langBtn").textContent=english?"ID":"EN";document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=english?(e.dataset.i18n==="order"?"Pesan sekarang":e.dataset.i18n==="discover"?"Kenali kami":e.dataset.i18n==="story"?"Cerita kami":e.dataset.i18n==="contact"?"Kontak":e.dataset.i18n==="menu"?"Menu":"Beranda"):translations[e.dataset.i18n]);toast(english?"English mode":"Mode Indonesia");};
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length){toast("Cart kamu masih kosong 🍵");return;}let msg="Halo kak, aku mau pesan:%0A";cart.forEach(x=>{const p=products.find(p=>p.id===x.id);msg+=`• ${p.name} x${x.qty} — ${money(p.price*x.qty)}%0A`});msg+="%0ATerima kasih 💚";window.open("https://wa.me/6281234567890?text="+msg,"_blank");};
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Welcome to the green loop 🍃");};
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}
renderProducts();renderCart();
