/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/modules/issafari.js
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
if (isSafari) {
  document.documentElement.classList.add('safari');
}
;// CONCATENATED MODULE: ./src/js/modules/iswebp.js
// check support webp
function isWebp(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
}
// add class webp/no-webp to html
isWebp(function (support) {
  var className = support === true ? 'webp' : 'no-webp';
  document.documentElement.classList.add(className);
});
;// CONCATENATED MODULE: ./src/js/modules/mobilemenu.js
document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement;
  var burger = document.querySelector('.burger');
  var burgerIcon = burger.querySelector('.burger__icon');
  var menu = document.querySelector('.menu');
  var menuLinks = document.querySelectorAll('.menu__link');

  // add burger icon
  if (burger && !burgerIcon) {
    burger.innerHTML = "\n\t\t\t  <span class=\"burger__icon\">\n\t\t\t\t\t<span class=\"burger__line burger__line_1\"></span>\n\t\t\t\t\t<span class=\"burger__line burger__line_2\"></span>\n\t\t\t\t\t<span class=\"burger__line burger__line_3\"></span>\n\t\t\t  </span>";
  }
  var toggleClass = function toggleClass(element, className) {
    return element.classList.toggle(className);
  };
  var removeClass = function removeClass(element, className) {
    return element.classList.remove(className);
  };

  // open/close mobile menu
  var toggleMenu = function toggleMenu() {
    toggleClass(burger.querySelector('.burger__icon'), 'burger__icon_close');
    toggleClass(menu, 'menu_open');
    toggleClass(html, 'scroll-disable');
  };

  // close mobile menu
  var closeMenu = function closeMenu() {
    removeClass(burger.querySelector('.burger__icon'), 'burger__icon_close');
    removeClass(menu, 'menu_open');
    removeClass(html, 'scroll-disable');
  };

  // click on burger
  burger.addEventListener('click', toggleMenu);
  // закрываем меню после нажатия на ссылку (если меню якорное и не ведет на другую страницу)
  menuLinks.forEach(function (link) {
    return link.addEventListener('click', closeMenu);
  });
});
;// CONCATENATED MODULE: ./src/js/modules/up.js
if (window.innerWidth > 1024) {
  var up = document.createElement('div');
  up.classList.add('up');
  document.body.appendChild(up);
  var padding = window.getComputedStyle(up).bottom;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      up.classList.add('up_show');
    } else {
      up.classList.remove('up_show');
    }

    // stop before footer
    var scrollTop = window.scrollY + window.innerHeight;
    var footer = document.querySelector('.footer');
    var footerPosition = footer.offsetTop;
    var footerHeight = footer.offsetHeight;
    if (scrollTop >= footerPosition) {
      up.style.position = 'absolute';
      up.style.bottom = "calc(".concat(padding, " + ").concat(footerHeight, "px)");
    } else {
      up.style.position = 'fixed';
      up.style.bottom = padding;
    }
  });
  up.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
;// CONCATENATED MODULE: ./src/js/script.js




/******/ })()
;