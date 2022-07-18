const btn = document.querySelector(".header__menu-btn");
const menu = document.querySelector(".navbar");
const closeBtn = document.querySelector(".close-icon-wrapper");

const showMenu = function () {
  menu.classList.toggle("navbar--isActive");
  closeBtn.classList.toggle("close-icon-wrapper--disabled");
};

btn.addEventListener("click", showMenu);
