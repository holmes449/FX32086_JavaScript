"use strict";

titleName("Login");

// Hàm kiểm tra giá trị từ form
function validate(username, password, userArr) {
  // Nhập đủ
  if (!username || !password) {
    alert("Cannot be left blank");
    return false;
  }

  // Tài khoản trùng hay không
  let user = userArr.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    alert("Account or password is incorrect");
    return false;
  }

  // Khớp thì lưu lại thông tin vào LocalStore
  saveDataLocalStore(KEY_USER, JSON.stringify(user.username));

  return true;
}

// Hàm Login
function login() {
  // Khởi tạo các input
  const username = document.getElementById("input-username").value.trim();
  const password = document.getElementById("input-password").value;

  if (validate(username, password, userArr)) {
    alert("Logged in successfully!");
    window.location.href = "../index.html";
  }
}

// Click đăng nhập
document.getElementById("btn-submit").addEventListener("click", login);
