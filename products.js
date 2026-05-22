import { db } from "./firebase.config";
import {
    collection,
    getlocks,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js"

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// --- HÀM FETCH PRODUCTS ---
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        
        querySnapshot.forEach((doc) => {
            // gộp ID và data của document
            products.push({ id: doc.id, ...doc.data() });
        });

        console.log(products);
        
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        document.getElementById("product-list").innerText = "Lỗi tải dữ liệu!";
    }
}