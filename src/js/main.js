window.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.accordion__item'); // считываем все элементы аккордеона в массив

	const accordiomFunction = e => {
		e.preventDefault(); // сбрасываем стандартное поведение
		let currentBox = e.target.closest('.accordion__item'); // определяем текущий бокс
		let currentContent = e.target.nextElementSibling; // находим скрытый контент
		currentBox.classList.toggle('active'); // присваиваем ему активный класс
		if (currentBox.classList.contains('active')) {
			// если класс активный ..
			currentContent.style.maxHeight = currentContent.scrollHeight + 'px'; // открываем контент
		} else {
			// в противном случае
			currentContent.style.maxHeight = 0; // скрываем контент}
		}
	};

	accordions.forEach(accordion => {
		accordion.addEventListener('click', accordiomFunction); // при нажатии на бокс вызываем ф-ию boxHanlder
	});
});
