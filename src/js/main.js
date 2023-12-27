window.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.accordion__item'); // считываем все элементы аккордеона в массив
	const tabs = document.querySelectorAll('.operations__tab');
	const tabsContainer = document.querySelector('.operations__tab-container');
	const tabsContent = document.querySelectorAll('.operations__content');
	tabsContainer.addEventListener('click', function (e) {
		const clicked = e.target.closest('.operations__tab');

		// Guard clause
		if (!clicked) return;

		// Remove active classes
		tabs.forEach(t => t.classList.remove('operations__tab--active'));
		tabsContent.forEach(c => c.classList.remove('operations__content--active'));

		// Activate tab
		clicked.classList.add('operations__tab--active');

		// Activate content area
		document
			.querySelector(`.operations__content--${clicked.dataset.tab}`)
			.classList.add('operations__content--active');
	});

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
