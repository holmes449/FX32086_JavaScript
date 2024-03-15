"use strict";

// Tạo class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName; // Tên
    this.lastName = lastName; // Họ
    this.username = username; // Tài khoản
    this.password = password; // Mật khẩu

    this.category = "General"; // General
    this.pageSize = 5; // pageSize
  }
}

// Class mẫu cho các todo
class Task {
  constructor(task, owner) {
    this.task = task; // Nội dung công việc.
    this.owner = owner; // Username của người tạo ra task.
    this.isDone = false; // Task này đã hoàn thành hay chưa.
  }
}

// Khởi tạo Class tin tức
class NewsManager {
  // static async showNum(page, totalPages) {}

  static async displayNews(page, check = false) {
    page = page < 1 ? 1 : page;

    // Khai báo các biến bổ sung để hiển thị tin
    const country = "us"; // Quốc Gia

    // const newsKey = "6af8ff494bb64a80923b444a2bdfa568";
    const newsKey = "ff3f82c4f7444fca9af463b2f4e2e0c9";
    // const newsKey = "cd2a8e2a5f80481fb2e8ab20389b0fea";

    // Code để hiển thị tin tức dựa trên trang (page) ở đây
    const apiUrl = `https://newsapi.org/v2/${
      check === true
        ? `everything?q=${searchText}&`
        : `top-headlines?country=${country}&category=${category}&`
    }pageSize=${pageSize}&page=${page}&apiKey=${newsKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const articles = await data.articles;
      const totalResults = await data.totalResults; // Tổng bài viết
      const totalPages = Math.ceil(totalResults / pageSize); // Tính tổng trang

      document.getElementById("news-container").innerHTML = ""; // Xóa trắng trang News.html

      articles.forEach((article) => {
        let newItem = document.createElement("div");

        newItem.classList.add("card", "flex-row", "flex-wrap");
        newItem.innerHTML = `
        <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                    <img
                    src="${
                      !article.urlToImage
                        ? "../images/Image-error.png"
                        : article.urlToImage
                    }"
                    class="card-img"
                    alt="${article.title}"
                  />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">
                        ${article.title}
                        </h5>
                        <p class="card-text">
                          ${article.description}
                        </p>
                        <a
                          href="${article.url}"
                          target="_blank"
                          class="btn btn-primary"
                          >View</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
        `;

        document.getElementById("news-container").appendChild(newItem);
      });

      document.getElementById("nav-page-num").style.display = "block";

      if (totalResults > 0) {
        document.getElementById("page-num").textContent = page;

        document.getElementById("btn-prev").style.display =
          page === 1 ? "none" : "block";
        document.getElementById("btn-next").style.display =
          page >= totalPages ? "none" : "block";
      } else {
        document.getElementById("nav-page-num").textContent =
          "There are no posts";
      }
    } catch (error) {
      console.error("Error displaying news:", error);
    }
  }
}

// Khởi tạo mảng chứ các User, Trạng thái đăng nhập từ LocalStore
const KEY_USERS = "USER_ARRAY"; // Key localstore mảng chứa các user đã đăng ký
const KEY_USER = "USER_CURRENT"; // Key localstore thông tin user đang đăng nhập
const KEY_USERS_TODO = "USER_TODO"; // Key localstore

const userArr = getDataLocalStore(KEY_USERS, []); // Mảng chứa tất cả user

// const currentUser = getDataLocalStore(KEY_USER, false); // lấy người dùng đang đăng nhập
const currentUser = !getDataLocalStore(KEY_USER)
  ? false
  : Object.assign(
      {},
      userArr.filter((user) => user.username == getDataLocalStore(KEY_USER))[0]
    );
delete currentUser.password;

// console.log(currentUser);
const todoArr = !currentUser ? [] : getDataLocalStore(KEY_USERS_TODO, []); // Danh sách tất cả Toto

const category = currentUser !== false ? currentUser.category : "General"; // Thuộc tính
const pageSize = currentUser !== false ? currentUser.pageSize : 5; // Số lượng bài viết hiện

let currentPage = 1;
