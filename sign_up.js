import { auth } from './firebase.config.js';
import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { styleText, validateEmail } from './function_validate.js'

const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regexPwd = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

const btn = document.getElementById('btn-SignUp');
if (btn) {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('e-Sign') ? document.getElementById('e-Sign').value : '';
    const password = document.getElementById('pwd-Sign') ? document.getElementById('pwd-Sign').value : '';
    const confirm = document.getElementById('cfPwd-Sign') ? document.getElementById('cfPwd-Sign').value : '';
    const nameInput = document.getElementById('name-Sign') ? document.getElementById('name-Sign').value : '';
    const textEmail = document.getElementById('textEmailSignUp');
    const textPWD = document.getElementById('textPwdSignUp');
    if (textEmail) styleText(textEmail);
    if (textPWD) styleText(textPWD);

    if (!email.match(regexEmail)) {
      if (textEmail) textEmail.innerText = '* Email nhập không hợp lệ';
      return;
    }
    if (!password.match(regexPwd)) {
      if (textPWD) textPWD.innerText = '* Vui lòng nhập ít nhất 8 ký tự (bao gồm: chữ thường, in hoa, số)';
      return;
    }
    if (password !== confirm) {
      if (textPWD) textPWD.innerText = '* Mật khẩu nhập không khớp';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('createUserWithEmailAndPassword result:', userCredential);
      const user = userCredential.user;
      // set display name if provided
      if (nameInput) {
        await updateProfile(user, { displayName: nameInput });
      }
      console.log('after updateProfile, auth.currentUser =', auth.currentUser);
      // save light info for UI
      localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName || nameInput || '' }));
      window.location.href = './index.html';
    } catch (err) {
      console.error(err);
      if (textEmail) textEmail.innerText = err.message;
    }
  });
}