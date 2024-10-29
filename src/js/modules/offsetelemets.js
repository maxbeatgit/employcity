// находим элементы выходящие за пределы страницы (чтобы убрать горизонтальный скрол)

var docWidth = window.innerWidth;

[].forEach.call(
	document.querySelectorAll('*'),
	function (el) {
		 var bounding = el.getBoundingClientRect();
		 if (bounding.left + el.offsetWidth > docWidth) {
			  console.log('Element causing horizontal scroll:', el);
		 }
	}
);