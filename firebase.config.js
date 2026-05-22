// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore-compat.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kJDVG7XBWv3gFSdkCdQA_k9Df2qOj4k",
  authDomain: "quanganh-dc7c4.firebaseapp.com",
  projectId: "quanganh-dc7c4",
  storageBucket: "quanganh-dc7c4.firebasestorage.app",
  messagingSenderId: "45936787005",
  appId: "1:45936787005:web:dd351641ab446b83e63454",
  measurementId: "G-KJXXRCYCP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);

export const db = app.getFireStore()
