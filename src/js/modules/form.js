// range value
document.querySelectorAll('.form__range').forEach(range => {
	const rangeInput = range.querySelector('.form__range-input');
	const rangeValue = range.querySelector('.form__range-value');

	rangeValue.textContent = `${rangeInput.value}%`;

	rangeInput.addEventListener('input', function () {
		rangeValue.textContent = `${rangeInput.value}%`;
	});
});


// file upload
document.querySelectorAll('.form__file-input').forEach(input => {
	input.addEventListener('change', function () {
		const uploadText = this.closest('.form__file').querySelector('.form__file-text');

		if (this.files.length > 0) {
			uploadText.textContent = this.files[0].name;
		} else {
			uploadText.textContent = 'Прикрепить файл';
		}
	});
});


