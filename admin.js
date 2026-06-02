import { db } from './firebase.config.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// CONFIGURE THESE with your Cloudinary settings
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload';
const UPLOAD_PRESET = '<your-upload-preset>'; // unsigned preset

async function uploadImage(file){
  if(!file) return '';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
  const data = await res.json();
  return data.secure_url || '';
}

const form = document.getElementById('product-form');
const msg = document.getElementById('msg');
if(form) form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('p-name').value;
  const desc = document.getElementById('p-desc').value;
  const price = Number(document.getElementById('p-price').value);
  const file = document.getElementById('p-image').files[0];
  msg.innerText = 'Đang upload ảnh...';
  try{
    const imageUrl = await uploadImage(file);
    msg.innerText = 'Đang lưu sản phẩm...';
    await addDoc(collection(db,'products'),{ name, description: desc, price, image: imageUrl });
    msg.innerText = 'Tạo sản phẩm thành công';
    form.reset();
  }catch(err){ console.error(err); msg.innerText = 'Lỗi: ' + err.message; }
});

if (!UPLOAD_PRESET.includes('<')) {
  // fine
} else {
  console.warn('admin.js: hãy chỉnh CLOUDINARY_URL và UPLOAD_PRESET trước khi sử dụng upload ảnh.');
}
