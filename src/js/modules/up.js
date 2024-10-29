if (window.innerWidth > 1024) {
	const up = document.createElement('div');
	up.classList.add('up');
	document.body.appendChild(up);
	const padding = window.getComputedStyle(up).bottom;

	window.addEventListener('scroll', () => {
		 if (window.scrollY > 500) {
			  up.classList.add('up_show');
		 } else {
			  up.classList.remove('up_show');
		 }

		 // stop before footer
		 const scrollTop = window.scrollY + window.innerHeight;
		 const footer = document.querySelector('.footer');
		 const footerPosition = footer.offsetTop;
		 const footerHeight = footer.offsetHeight;

		 if (scrollTop >= footerPosition) {
			  up.style.position = 'absolute';
			  up.style.bottom = `calc(${padding} + ${footerHeight}px)`;
		 } else {
			  up.style.position = 'fixed';
			  up.style.bottom = padding;
		 }
	});

	up.addEventListener('click', (e) => {
		 e.preventDefault();
		 window.scrollTo({
			  top: 0,
			  behavior: 'smooth'
		 });
	});
}