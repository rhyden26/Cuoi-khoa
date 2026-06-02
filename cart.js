// simple cart UI using localStorage
(function showUser(){
  const u = localStorage.getItem('currentUser');
  const el = document.getElementById('user-display');
  if (!el) return;
  if (u) {
    const user = JSON.parse(u);
    el.innerText = user.displayName || user.email || '';
  } else el.innerHTML = '<a href="login.html">Đăng nhập</a>';
})();

function renderCart(){
  const container = document.getElementById('cart-container');
  const checkoutArea = document.getElementById('checkout-area');
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if(!container) return;
  if(cart.length === 0){
    container.innerHTML = '<p>Giỏ hàng trống</p>';
    checkoutArea.innerHTML = '';
    return;
  }
  let html = '<div class="cart">';
  let total = 0;
  cart.forEach((it, idx) => {
    total += (Number(it.price)||0) * it.qty;
    html += `\n      <div class="cart-item">\n        <div>${it.name}</div>\n        <div>\n          <button class=\"dec\" data-idx=\"${idx}\">-</button>\n          <span> ${it.qty} </span>\n          <button class=\"inc\" data-idx=\"${idx}\">+</button>\n        </div>\n        <div>$${(Number(it.price)||0) * it.qty}</div>\n      </div>`;
  });
  html += `\n  <div class="total">Tổng: $${total}</div>`;
  html += '</div>';
  container.innerHTML = html;

  checkoutArea.innerHTML = `<a class="btn" href="checkout.html">Tiến hành thanh toán</a>`;

  container.querySelectorAll('.inc').forEach(b => b.addEventListener('click', (e)=>{
    const i = Number(e.target.dataset.idx);
    cart[i].qty += 1; localStorage.setItem('cart', JSON.stringify(cart)); renderCart();
  }));
  container.querySelectorAll('.dec').forEach(b => b.addEventListener('click', (e)=>{
    const i = Number(e.target.dataset.idx);
    if(cart[i].qty>1) cart[i].qty -= 1; else cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart)); renderCart();
  }));
}

renderCart();
