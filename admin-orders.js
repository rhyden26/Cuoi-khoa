import { db } from './firebase.config.js';
import { collection, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

async function loadOrders(){
  const el = document.getElementById('orders');
  el.innerText = 'Đang tải...';
  try{
    const snap = await getDocs(collection(db,'orders'));
    const arr = [];
    snap.forEach(d=> arr.push({ id: d.id, ...d.data() }));
    if(arr.length===0) { el.innerText = 'Không có đơn hàng'; return; }
    el.innerHTML = '';
    arr.forEach(o=>{
      const div = document.createElement('div');
      div.className = 'order';
      div.innerHTML = `\n        <div>Đơn: ${o.id}</div>\n        <div>Khách: ${o.customer?.fullname || ''} - ${o.customer?.phone || ''}</div>\n        <div>Tổng: $${o.total}</div>\n        <div>Trạng thái: <select data-id="${o.id}" class="status">\n          <option value="pending" ${o.status==='pending'?'selected':''}>pending</option>\n          <option value="processing" ${o.status==='processing'?'selected':''}>processing</option>\n          <option value="completed" ${o.status==='completed'?'selected':''}>completed</option>\n        </select></div>\n      `;
      el.appendChild(div);
    });
    el.querySelectorAll('.status').forEach(s=> s.addEventListener('change', async (e)=>{
      const id = e.target.dataset.id; const status = e.target.value;
      await updateDoc(doc(db,'orders',id),{ status });
      alert('Cập nhật trạng thái thành công');
    }));
  }catch(err){ console.error(err); el.innerText = 'Lỗi tải đơn hàng'; }
}

loadOrders();
