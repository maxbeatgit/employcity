/* Scrollbar width */

function setScrollbarWidth() {
	// Создаем временный элемент для вычисления ширины полосы прокрутки
	const scrollDiv = document.createElement('div');
	scrollDiv.style.width = '100px';
	scrollDiv.style.height = '100px';
	scrollDiv.style.overflow = 'scroll';
	scrollDiv.style.position = 'absolute';
	scrollDiv.style.top = '-9999px';
	document.body.appendChild(scrollDiv);

	// Вычисляем ширину полосы прокрутки
	const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

	// Удаляем временный элемент
	document.body.removeChild(scrollDiv);

	// Записываем ширину полосы прокрутки в rem
	document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}
setScrollbarWidth();
window.addEventListener('resize', setScrollbarWidth);