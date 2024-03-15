"use strict";

titleName("Register");

// Hàm kiểm tra giá trị từ form
function validate(
  firstName,
  lastName,
  username,
  password,
  passwordConfirm,
  userArr
) {
  // Nhập đủ
  if (!firstName || !lastName || !username || !password || !passwordConfirm) {
    alert("Cannot be left blank");
    return false;
  }

  // Mật khẩu giống nhau
  if (password !== passwordConfirm) {
    alert("Password must be the same");
    return false;
  }

  // Mật khẩu dài hơn 8 ký tự
  if (password.length < 8) {
    alert("Password more than 8 characters");
    return false;
  }

  // Tài khoản trùng hay không
  const existingUser = userArr.find((user) => user.username === username);
  if (existingUser) {
    alert("UserName is already occupied");
    return false;
  }

  return true;
}

// Hàm thực hiện đăng ký
function register() {
  // Khởi tạo các input
  const firstName = document.getElementById("input-firstname").value.trim();
  const lastName = document.getElementById("input-lastname").value.trim();
  const username = document.getElementById("input-username").value.trim();
  const password = document.getElementById("input-password").value;
  const passwordConfirm = document.getElementById(
    "input-password-confirm"
  ).value;

  if (
    validate(firstName, lastName, username, password, passwordConfirm, userArr)
  ) {
    const user = new User(firstName, lastName, username, password);
    userArr.push(user);
    saveDataLocalStore(KEY_USERS, JSON.stringify(userArr));

    alert("Sign Up Success!");

    // Chuyển đến đăng nhập
    window.location.href = "../pages/login.html";
  }
}

// Gán sự kiện click cho button Submit
document.getElementById("btn-submit").addEventListener("click", register);
