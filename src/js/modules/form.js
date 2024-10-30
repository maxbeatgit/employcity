/* Range value */

document.querySelectorAll('.form__range').forEach(range => {
	const rangeInput = range.querySelector('.form__range-input');
	const rangeValue = range.querySelector('.form__range-value');

	rangeValue.textContent = `${rangeInput.value}%`;

	rangeInput.addEventListener('input', function () {
		rangeValue.textContent = `${rangeInput.value}%`;
	});
});



/* File upload */

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



/* Select */

const selectOpenClass = 'form__select_open';
const selectUpClass = 'form__select_up';

document.addEventListener('click', function(e) {
    const select = e.target.closest('.form__select');
    
    // close on click anywhere
    document.querySelectorAll(`.${selectOpenClass}`).forEach(openSelect => {
        if (openSelect !== select) openSelect.classList.remove(selectOpenClass);
    });

    if (select) {
        const options = select.querySelector('.form__select-options');
        select.classList.toggle(selectOpenClass);
        checkUpDown(select);
        
        // set selected item
        if (e.target.classList.contains('form__select-item')) {
            select.querySelector('.form__input_select').value = e.target.textContent;
            select.classList.remove(selectOpenClass);
        }
    }
});

// check up/down
function checkUpDown(select) {
    const rect = select.getBoundingClientRect();
    const distanceToBottom = window.innerHeight - rect.bottom;
    select.classList.toggle(selectUpClass, distanceToBottom < 250);
}