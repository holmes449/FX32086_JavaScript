"use strict";

titleName("Home");

// Hàm để kiểm tra người dùng đã đăng nhập hay chưa
function checkLoggedIn() {
  if (currentUser) {
    // Hiển thị nút logout và chào mừng
    document.getElementById("main-content").style.display = "block";
    document.getElementById(
      "welcome-message"
    ).innerText = `Welcome ${currentUser.lastName} ${currentUser.firstName}`;
  } else {
    // Hiển thị nút đăng nhập và đăng ký
    document.getElementById("login-modal").style.display = "block";
  }
}

// Hàm đăng xuất
function logout() {
  if (confirm("Will you sign out of this account?")) {
    // Xóa thông tin người dùng hiện tại từ localStorage
    deleteDataLocalStore(KEY_USER);
    // Chuyển hướng về trang đăng nhập
    window.location.href = "./pages/login.html";
  }
}

// Gán sự kiện click cho nút Đăng Xuất
document.getElementById("btn-logout").addEventListener("click", logout);

// Kiểm tra người dùng đã đăng nhập khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  checkLoggedIn();
});
