const products = [
  { id: 'classic', name: 'Classic Matcha Latte', price: 28000, type: 'creamy', img: 'https://images.pexels.com/photos/35672623/pexels-photo-35672623.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Soft latte art, golden-hour light & a calm café mood.' },
  { id: 'strawberry', name: 'Strawberry Matcha', price: 32000, type: 'fresh', img: 'https://images.pexels.com/photos/34491288/pexels-photo-34491288.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Sweet berries meet earthy green.' },
  { id: 'mango', name: 'Mango Matcha', price: 32000, type: 'fresh', img: 'https://images.pexels.com/photos/37105479/pexels-photo-37105479.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Tropical, bright & refreshing.' },
  { id: 'coconut', name: 'Coconut Matcha', price: 30000, type: 'creamy', img: 'https://images.pexels.com/photos/37033512/pexels-photo-37033512.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Soft, creamy & lightly tropical.' },
  { id: 'hot', name: 'Hot Matcha Latte', price: 30000, type: 'creamy', img: 'https://images.pexels.com/photos/8004570/pexels-photo-8004570.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Warm, delicate & comforting.' },
  { id: 'tall', name: 'Iced Matcha', price: 30000, type: 'fresh', img: 'https://images.pexels.com/photos/35852545/pexels-photo-35852545.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Bright, clean & refreshing.' },
  { id: 'cloud', name: 'Matcha Cloud', price: 33000, type: 'creamy', img: 'https://images.pexels.com/photos/33493391/pexels-photo-33493391.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Creamy layers with a soft, dreamy finish.' },
  { id: 'choco', name: 'Chocolate Matcha', price: 33000, type: 'creamy', img: 'https://images.pexels.com/photos/14262578/pexels-photo-14262578.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Cocoa comfort with green tea.' }
];

let bag = JSON.parse(localStorage.getItem('matchaBag') || '[]');
const rupiah = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const grid = document.querySelector('#grid');
const modal = document.querySelector('#modal');
let currentProduct = null;

function saveBag() { localStorage.setItem('matchaBag', JSON.stringify(bag)); }

function render(f = 'all', search = '') {
  const q = search.toLowerCase();
  grid.innerHTML = products
    .filter(p => (f === 'all' || p.type === f) && (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)))
    .map(p => `
      <article class="card fade-in" data-id="${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="row">
            <b>${rupiah(p.price)}</b>
            <button class="plus" data-id="${p.id}">+</button>
          </div>
        </div>
      </article>
    `).join('');
}

// Search
document.getElementById('search').addEventListener('input', e => {
  const active = document.querySelector('.filters button.active').dataset.f;
  render(active, e.target.value);
});

function renderBag() {
  document.querySelector('#count').textContent = bag.reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelector('#items').innerHTML = bag.length
    ? bag.map((item, idx) => `
        <div class="item">
          <div>
            <strong>${item.name}</strong>
            <div style="font-size:13px;color:var(--muted)">${item.size || 'Regular'} • ${item.sweet || 'Normal'} • ${item.milk || 'Oat'}</div>
          </div>
          <div class="item-controls">
            <button onclick="changeQty(${idx}, -1)">−</button>
            <span>${item.qty || 1}</span>
            <button onclick="changeQty(${idx}, 1)">+</button>
            <button onclick="removeItem(${idx})" style="margin-left:8px">✕</button>
          </div>
          <b>${rupiah((item.price) * (item.qty || 1))}</b>
        </div>
      `).join('')
    : '<p style="color:var(--muted);padding:20px 0">Your bag is still empty.</p>';
  document.querySelector('#total').textContent = rupiah(bag.reduce((s, i) => s + i.price * (i.qty || 1), 0));
  saveBag();
}

function openModal(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;
  document.getElementById('modalImg').src = currentProduct.img;
  document.getElementById('modalTitle').textContent = currentProduct.name;
  document.getElementById('modalDesc').textContent = currentProduct.desc;
  modal.classList.add('show');
}

function addToBag(product, options = {}) {
  const existing = bag.find(i => i.id === product.id && i.size === options.size && i.sweet === options.sweet && i.milk === options.milk);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else bag.push({ ...product, qty: 1, ...options });
  renderBag();
  openBag();
}

function changeQty(idx, delta) {
  bag[idx].qty = (bag[idx].qty || 1) + delta;
  if (bag[idx].qty <= 0) bag.splice(idx, 1);
  renderBag();
}

function removeItem(idx) {
  bag.splice(idx, 1);
  renderBag();
}

function openBag() {
  document.querySelector('#drawer').classList.add('open');
  document.querySelector('#overlay').classList.add('show');
}
function closeBag() {
  document.querySelector('#drawer').classList.remove('open');
  document.querySelector('#overlay').classList.remove('show');
}

// Filters
document.querySelectorAll('.filters button').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const search = document.getElementById('search').value;
    render(b.dataset.f, search);
  };
});

// Card clicks & plus buttons
grid.addEventListener('click', e => {
  const card = e.target.closest('.card');
  const plus = e.target.closest('.plus');
  if (plus) {
    e.stopPropagation();
    const id = plus.dataset.id;
    const p = products.find(x => x.id === id);
    addToBag(p);
    return;
  }
  if (card) openModal(card.dataset.id);
});

// Modal add
document.getElementById('modalAdd').onclick = () => {
  if (!currentProduct) return;
  addToBag(currentProduct, {
    size: document.getElementById('modalSize').value,
    sweet: document.getElementById('modalSweet').value,
    milk: document.getElementById('modalMilk').value
  });
  modal.classList.remove('show');
};
document.querySelector('.modal-close').onclick = () => modal.classList.remove('show');
modal.onclick = e => { if (e.target === modal) modal.classList.remove('show'); };

// Theme
document.getElementById('themeToggle').onclick = () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = isDark ? '' : 'dark';
  document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
};
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.dataset.theme = 'dark';
  document.getElementById('themeToggle').textContent = '☀️';
}

// Mobile menu
document.getElementById('menuToggle').onclick = () => document.getElementById('nav').classList.toggle('open');

// Bag & order
document.getElementById('bagBtn').onclick = openBag;
document.getElementById('close').onclick = closeBag;
document.getElementById('overlay').onclick = closeBag;
document.getElementById('order').onclick = () => {
  if (!bag.length) return alert('Tambahkan minuman dulu ya ✦');
  const text = 'Halo kak, aku mau pesan:%0A' + bag.map(i => `• ${i.qty || 1}x ${i.name} (${i.size || 'Regular'}, ${i.sweet || 'Normal'}, ${i.milk || 'Oat'}) — ${rupiah(i.price * (i.qty || 1))}`).join('%0A');
  window.open('https://wa.me/?text=' + text, '_blank');
};

document.getElementById('surprise').onclick = () => {
  const p = products[Math.floor(Math.random() * products.length)];
  addToBag(p);
};

// Newsletter
document.getElementById('newsForm').onsubmit = e => {
  e.preventDefault();
  document.getElementById('newsMsg').textContent = 'Thank you! We’ll keep you in the green circle ✦';
  e.target.reset();
};

// Simple fade-in on load for sections
document.querySelectorAll('section').forEach((s, i) => {
  s.style.animationDelay = (i * 0.05) + 's';
  s.classList.add('fade-in');
});

// Init
render();
renderBag();