// range value
const rangeInput = document.getElementById('range');
const rangeValue = document.querySelector('.form__range-value');

rangeValue.textContent = `${rangeInput.value}%`;

rangeInput.addEventListener('input', function() {
    rangeValue.textContent = `${rangeInput.value}%`;
});
