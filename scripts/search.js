"use strict";

titleName("Search");

// Khỏi tạo các biến toàn cục trong News
let searchText = "";
const searchInput = document.getElementById("input-query");
const submitButton = document.getElementById("btn-submit");

// hàm thực hiện tìm kiếm
function search() {
  searchText = searchInput.value.trim();

  if (searchText) {
    NewsManager.displayNews(currentPage, true);
  } else {
    alert("Cannot be left blank");
  }
}

document.getElementById("btn-prev").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
  }

  NewsManager.displayNews(currentPage, true);
});

document.getElementById("btn-next").addEventListener("click", function () {
  currentPage += 1;
  NewsManager.displayNews(currentPage, true);
});

submitButton.addEventListener("click", search);
