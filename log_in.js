import { auth } from './firebase.config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const loginBtn = document.getElementById('loginBtn');
const message = document.getElementById('message');

if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      message.style.color = 'green';
      message.innerText = 'Đăng nhập thành công';
      // lưu user nhẹ vào localStorage để hiển thị tên
      localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName || '' }));
      setTimeout(() => window.location.href = 'index.html', 800);
    } catch (err) {
      console.error(err);
      message.style.color = 'red';
      message.innerText = err.message || 'Lỗi đăng nhập';
    }
  });
}

// Optional: react to auth state changes (keep localStorage in sync)
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName || '' }));
  } else {
    localStorage.removeItem('currentUser');
  }
});