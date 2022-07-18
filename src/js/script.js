const btn = document.querySelector(".header__menu-btn");
const menu = document.querySelector(".navbar__container");
const closeBtn = document.querySelector(".close-icon-wrapper");

const showMenu = function () {
  menu.classList.toggle("navbar__container--isActive");
  closeBtn.classList.toggle("close-icon-wrapper--disabled");
};

btn.addEventListener("click", showMenu);
