// login.js

// danh sách tài khoản mẫu
const users = [
  {
    email: "admin@gmail.com",
    password: "123456"
  }
];

// lưu vào localStorage
localStorage.setItem("userList", JSON.stringify(users));

// lấy nút đăng nhập
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {

  // lấy dữ liệu người dùng nhập
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  // lấy danh sách tài khoản
  const userList = JSON.parse(localStorage.getItem("userList"));

  // kiểm tra tài khoản
  const user = userList.find(function(item){
    return item.email === email &&
           item.password === password;
  });

  // nếu đúng
  if(user){

    message.style.color = "green";
    message.innerText = "Đăng nhập thành công";

    // chuyển trang
    window.location.href = "home.html";

  }else{

    message.style.color = "red";
    message.innerText = "Sai tài khoản hoặc mật khẩu";

  }

});