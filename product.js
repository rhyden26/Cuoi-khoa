import { db } from './firebase.config.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function render() {
  const id = getQueryParam('id');
  const container = document.getElementById('product-detail');
  if (!id) {
    container.innerText = 'Sản phẩm không hợp lệ';
    return;
  }
  try {
    const ref = doc(db, 'products', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      container.innerText = 'Không tìm thấy sản phẩm';
      return;
    }
    const p = { id: snap.id, ...snap.data() };
    container.innerHTML = `
      <div class="details">
        <img src="${p.image || 'https://via.placeholder.com/500x400'}" alt="${p.name}">
        <div class="details-text">
          <h2>${p.name}</h2>
          <p>${p.description || ''}</p>
          <div class="price">${p.price ? '$' + p.price : ''}</div>
          <button id="addToCart" class="btn">Thêm vào giỏ</button>
        </div>
      </div>
    `;

    document.getElementById('addToCart').addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((i) => i.id === p.id);
      if (existing) existing.qty += 1; else cart.push({ id: p.id, name: p.name, price: p.price || 0, image: p.image || '', qty: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm vào giỏ hàng');
    });

  } catch (err) {
    console.error(err);
    container.innerText = 'Lỗi tải sản phẩm';
  }
}

// show user name if logged
(function showUser(){
  const u = localStorage.getItem('currentUser');
  const el = document.getElementById('user-display');
  if (!el) return;
  if (u) {
    const user = JSON.parse(u);
    el.innerText = user.displayName || user.email || '';
  } else el.innerHTML = '<a href="login.html">Đăng nhập</a>';
})();

render();
