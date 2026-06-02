import { db } from './firebase.config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// Render products into #product-list
export async function fetchProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;
    container.innerHTML = 'Đang tải...';
    try {
        const q = collection(db, 'products');
        const snapshot = await getDocs(q);
        const products = [];
        snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

        if (products.length === 0) {
            container.innerHTML = '<p>Không có sản phẩm.</p>';
            return;
        }

        container.innerHTML = '';
        products.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.image || 'https://via.placeholder.com/400x300'}" alt="${p.name}">
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <p>${p.description || ''}</p>
                    <div class="price">${p.price ? '$' + p.price : ''}</div>
                    <a class="btn" href="product.html?id=${p.id}">Xem chi tiết</a>
                    <button class="btn add-to-cart">Thêm vào giỏ</button>
                </div>
            `;

            const addBtn = card.querySelector('.add-to-cart');
            addBtn.addEventListener('click', () => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existing = cart.find((i) => i.id === p.id);
                if (existing) existing.qty += 1; else cart.push({ id: p.id, name: p.name, price: p.price || 0, image: p.image || '', qty: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Đã thêm vào giỏ hàng');
            });

            container.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        container.innerText = 'Lỗi tải dữ liệu!';
    }
}

// Auto-run when loaded in pages that include it
if (document.readyState !== 'loading') fetchProducts(); else document.addEventListener('DOMContentLoaded', fetchProducts);