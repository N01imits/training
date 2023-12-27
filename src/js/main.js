window.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.accordion__item'); // считываем все элементы аккордеона в массив
	const tabs = document.querySelectorAll('.operations__tab');
	const tabsContainer = document.querySelector('.operations__tab-container');
	const tabsContent = document.querySelectorAll('.operations__content');
	const modal = document.querySelector('.modal');
	const overlay = document.querySelector('.overlay');
	const btnCloseModal = document.querySelector('.btn--close-modal');
	const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

	const openModal = e => {
		e.preventDefault();
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');
	};

	const closeModal = () => {
		modal.classList.add('hidden');
		overlay.classList.add('hidden');
	};

	btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

	btnCloseModal.addEventListener('click', closeModal);
	overlay.addEventListener('click', closeModal);

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
			closeModal();
		}
	});

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
