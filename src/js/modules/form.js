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
				// set valid
				select.classList.add('form__select_valid');
            select.querySelector('.form__input_select').classList.remove('form__input_invalid');
        }
    }
});

// check up/down
function checkUpDown(select) {
    const rect = select.getBoundingClientRect();
    const distanceToBottom = window.innerHeight - rect.bottom;
    select.classList.toggle(selectUpClass, distanceToBottom < 250);
}


/* Validation form */

document.addEventListener('DOMContentLoaded', function () {
	const submitButton = document.querySelector('.button[type="submit"]');
	const form = submitButton.closest('form');
	const requiredFields = document.querySelectorAll('[required]');

	// check on submit
	submitButton.addEventListener('click', function (e) {
		e.preventDefault();

		let allValid = true;

		// check required fields
		requiredFields.forEach(field => {
			if (!field.checkValidity()) {
				field.classList.add('form__input_invalid');
				allValid = false;
			} else {
				field.classList.remove('form__input_invalid');
			}
		});

		// check selects
		const selects = document.querySelectorAll('.form__select');

		selects.forEach(select => {
			const selectInput = select.querySelector('.form__input_select');
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
	requiredFields.forEach(field => {
		field.addEventListener('keyup', function () {
			if (this.checkValidity()) {
				this.classList.remove('form__input_invalid');
			}
		});
	});
});
