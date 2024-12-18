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

  // add burger icon
  if (burger && !burgerIcon) {
    burger.innerHTML = "\n\t\t\t  <span class=\"burger__icon\">\n\t\t\t\t\t<span class=\"burger__line burger__line_1\"></span>\n\t\t\t\t\t<span class=\"burger__line burger__line_2\"></span>\n\t\t\t\t\t<span class=\"burger__line burger__line_3\"></span>\n\t\t\t  </span>";
  }
  var toggleClass = function toggleClass(element, className) {
    return element.classList.toggle(className);
  };

  // open/close mobile menu
  var toggleMenu = function toggleMenu() {
    toggleClass(burger.querySelector('.burger__icon'), 'burger__icon_close');
    toggleClass(menu, 'menu_open');
    toggleClass(html, 'scroll-disable');
  };

  // click on burger
  burger.addEventListener('click', toggleMenu);
});
;// CONCATENATED MODULE: ./src/js/modules/form.js
/* Range value */

document.querySelectorAll('.form__range').forEach(function (range) {
  var rangeInput = range.querySelector('.form__range-input');
  var rangeValue = range.querySelector('.form__range-value');
  rangeValue.textContent = "".concat(rangeInput.value, "%");
  rangeInput.addEventListener('input', function () {
    rangeValue.textContent = "".concat(rangeInput.value, "%");
  });
});

/* File upload */

document.querySelectorAll('.form__file-input').forEach(function (input) {
  input.addEventListener('change', function () {
    var uploadText = this.closest('.form__file').querySelector('.form__file-text');
    if (this.files.length > 0) {
      uploadText.textContent = this.files[0].name;
    } else {
      uploadText.textContent = 'Прикрепить файл';
    }
  });
});

/* Select */

var selectOpenClass = 'form__select_open';
var selectUpClass = 'form__select_up';
document.addEventListener('click', function (e) {
  var select = e.target.closest('.form__select');

  // close on click anywhere
  document.querySelectorAll(".".concat(selectOpenClass)).forEach(function (openSelect) {
    if (openSelect !== select) openSelect.classList.remove(selectOpenClass);
  });
  if (select) {
    var options = select.querySelector('.form__select-options');
    select.classList.toggle(selectOpenClass);
    checkUpDown(select);

    // set selected item
    if (e.target.classList.contains('form__select-item')) {
      select.querySelector('.form__input_select').value = e.target.textContent;
      select.classList.remove(selectOpenClass);
      // set valid
      select.classList.add('form__select_valid');
      select.querySelector('.form__input_select').classList.remove('form__input_invalid');
    }
  }
});

// check up/down
function checkUpDown(select) {
  var rect = select.getBoundingClientRect();
  var distanceToBottom = window.innerHeight - rect.bottom;
  select.classList.toggle(selectUpClass, distanceToBottom < 250);
}

/* Validation form */

document.addEventListener('DOMContentLoaded', function () {
  var submitButton = document.querySelector('.button[type="submit"]');
  var form = submitButton.closest('form');
  var requiredFields = document.querySelectorAll('[required]');

  // check on submit
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    var allValid = true;

    // check required fields
    requiredFields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.classList.add('form__input_invalid');
        allValid = false;
      } else {
        field.classList.remove('form__input_invalid');
      }
    });

    // check selects
    var selects = document.querySelectorAll('.form__select');
    selects.forEach(function (select) {
      var selectInput = select.querySelector('.form__input_select');
      if (!select.classList.contains('form__select_valid')) {
        selectInput.classList.add('form__input_invalid');
        allValid = false;
      } else {
        selectInput.classList.remove('form__input_invalid');
      }
    });
    if (allValid) {
      form.submit();
    }
  });

  // check on keyup
  requiredFields.forEach(function (field) {
    field.addEventListener('keyup', function () {
      if (this.checkValidity()) {
        this.classList.remove('form__input_invalid');
      }
    });
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