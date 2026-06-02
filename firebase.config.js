// Firebase initialization (modular SDK via CDN imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4kJDVG7XBWv3gFSdkCdQA_k9Df2qOj4k",
  authDomain: "quanganh-dc7c4.firebaseapp.com",
  projectId: "quanganh-dc7c4",
  storageBucket: "quanganh-dc7c4.firebasestorage.app",
  messagingSenderId: "45936787005",
  appId: "1:45936787005:web:dd351641ab446b83e63454",
  measurementId: "G-KJXXRCYCP8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
