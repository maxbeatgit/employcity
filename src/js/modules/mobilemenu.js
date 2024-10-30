document.addEventListener('DOMContentLoaded', function () {
	const html = document.documentElement;
	const burger = document.querySelector('.burger');
	const burgerIcon = burger.querySelector('.burger__icon');
	const menu = document.querySelector('.menu');

	// add burger icon
	if (burger && !burgerIcon) {
		 burger.innerHTML = `
			  <span class="burger__icon">
					<span class="burger__line burger__line_1"></span>
					<span class="burger__line burger__line_2"></span>
					<span class="burger__line burger__line_3"></span>
			  </span>`;
	}

	const toggleClass = (element, className) => element.classList.toggle(className);

	// open/close mobile menu
	const toggleMenu = () => {
		toggleClass(burger.querySelector('.burger__icon'), 'burger__icon_close');
		toggleClass(menu, 'menu_open');
		toggleClass(html, 'scroll-disable');
	};

	// click on burger
	burger.addEventListener('click', toggleMenu);
});
