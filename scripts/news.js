"use strict";

titleName("News");

// Hàm gọi displayNews
document.getElementById("btn-prev").addEventListener("click", function () {
  currentPage--;
  NewsManager.displayNews(currentPage);
});

document.getElementById("btn-next").addEventListener("click", function () {
  currentPage++;
  NewsManager.displayNews(currentPage);
});

NewsManager.displayNews(currentPage);
