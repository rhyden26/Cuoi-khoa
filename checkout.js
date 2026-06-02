import { db } from './firebase.config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

(function showUser(){
  const u = localStorage.getItem('currentUser');
  const el = document.getElementById('user-display');
  if (!el) return;
  if (u) {
    const user = JSON.parse(u);
    el.innerText = user.displayName || user.email || '';
  } else el.innerHTML = '<a href="login.html">Đăng nhập</a>';
})();

function renderSummary(){
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const sumEl = document.getElementById('order-summary');
  if(!sumEl) return;
  if(cart.length===0) { sumEl.innerText = 'Giỏ hàng trống'; return; }
  let total=0; let html='<div class="cart">';
  cart.forEach(it=>{ total+= (Number(it.price)||0)*it.qty; html += `<div>${it.name} x ${it.qty} - $${(Number(it.price)||0)*it.qty}</div>`});
  html += `<div class="total">Tổng: $${total}</div></div>`;
  sumEl.innerHTML = html;
}

renderSummary();

const form = document.getElementById('checkout-form');
if(form) form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if(cart.length===0) { document.getElementById('message').innerText = 'Giỏ hàng trống'; return; }
  const total = cart.reduce((s,it)=> s + (Number(it.price)||0)*it.qty, 0);
  try{
    const docRef = await addDoc(collection(db,'orders'),{
      customer: { fullname, address, phone },
      items: cart,
      total,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    localStorage.removeItem('cart');
    document.getElementById('message').innerText = 'Đặt hàng thành công. Mã đơn: ' + docRef.id;
  }catch(err){ console.error(err); document.getElementById('message').innerText = 'Lỗi đặt hàng'; }
});
