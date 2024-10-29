function moveElement() {
	const elements = document.querySelectorAll('[data-move]');

	elements.forEach((element) => {
		// в html блоку который нужно переместить добавляем data-move="900,after,main__text" (или before)
		const [breakpoint, position, targetSelector] = element.dataset.move.split(',');

		// Добавляем точку перед targetSelector, если это класс (если нет #, предполагаем что это класс)
		const target = document.querySelector(
			targetSelector.trim().startsWith('#') ? targetSelector.trim() : `.${targetSelector.trim()}`
		);

		// Проверяем, найден ли целевой элемент
		if (!target) {
			// console.warn(`Target element "${targetSelector}" not found.`);
			return;
		}

		// Сохраняем исходное положение элемента, если оно ещё не сохранено
		if (!element.originalParent) {
			element.originalParent = element.parentNode;
			element.originalNextSibling = element.nextElementSibling || null;
		}

		if (window.innerWidth < parseInt(breakpoint)) {
			// Перемещаем элемент в заданное место
			if (position.trim() === 'after') {
				target.parentNode.insertBefore(element, target.nextSibling);
			} else if (position.trim() === 'before') {
				target.parentNode.insertBefore(element, target);
			}
		} else {
			// Возвращаем элемент на исходное место
			const originalParent = element.originalParent;
			const originalNextSibling = element.originalNextSibling;

			if (originalNextSibling) {
				originalParent.insertBefore(element, originalNextSibling);
			} else {
				originalParent.appendChild(element);
			}
		}
	});
}
window.addEventListener('load', moveElement);
window.addEventListener('resize', moveElement);