"use strict";

// Hàm thêm dữ liệu vào LocalStore
function saveDataLocalStore(key, value) {
  localStorage.setItem(key, value);
}

// Hàm lấy dữ liệu từ LocalStore
function getDataLocalStore(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}

// Hàm xóa một phần tử từ LocalStore
function deleteDataLocalStore(key) {
  localStorage.removeItem(key);
}

// Hàm trả về title
function titleName(string) {
  document.title = `FX32086 | ${string}`;
}
