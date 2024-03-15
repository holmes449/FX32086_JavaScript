"use strict";

titleName("Setting");

// Khai báo các input
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitButton = document.getElementById("btn-submit");

// Hàm in ra
function showSetting() {
  pageSizeInput.value = pageSize;
  categoryInput.value = category;
}

// Hàm kiểm tra giá trị từ form
function validate(pageSize) {
  // Nhập đủ
  if (!pageSize) {
    alert("Cannot be left blank");
    return false;
  }

  if (pageSize <= 0) {
    alert("PageSize must be greater than 0");
    return false;
  }

  return true;
}

// Hàm thực hiện cập nhật dữ liệu
function updateSetting() {
  if (validate(pageSizeInput.value) && currentUser) {
    userArr.map((user) => {
      if (user.username === currentUser.username) {
        user.pageSize = pageSizeInput.value;
        user.category = categoryInput.value;
      }
    });

    // Khớp thì lưu lại thông tin vào LocalStore
    saveDataLocalStore(KEY_USERS, JSON.stringify(userArr));

    // console.log(userArrTwo);
    alert("Installed successfully!");
    window.location.href = "../pages/news.html";
  }
}

submitButton.addEventListener("click", function () {
  if (currentUser === false) {
    alert("Please log in");
  } else {
    updateSetting();
  }
});

showSetting();
